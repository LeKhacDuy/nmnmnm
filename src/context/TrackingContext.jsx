import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const TrackingContext = createContext(null);

// =============================================
// Generate a unique session ID per browser tab
// =============================================
function getSessionId() {
    let sid = sessionStorage.getItem('nm_session_id');
    if (!sid) {
        sid = crypto.randomUUID ? crypto.randomUUID() : (
            'xxxx-xxxx-xxxx'.replace(/x/g, () =>
                Math.floor(Math.random() * 16).toString(16)
            )
        );
        sessionStorage.setItem('nm_session_id', sid);
    }
    return sid;
}

// =============================================
// Hook for consuming tracking context
// =============================================
export function useTracking() {
    const context = useContext(TrackingContext);
    if (!context) {
        throw new Error('useTracking must be used within a TrackingProvider');
    }
    return context;
}

// =============================================
// Constants
// =============================================
const FLUSH_INTERVAL_MS = 10_000;  // Flush every 10 seconds
const MAX_BUFFER_SIZE = 20;        // Flush when buffer hits 20 events
const API_ENDPOINT = '/v1/tracking/events';

// =============================================
// TrackingProvider
// =============================================
export function TrackingProvider({ children }) {
    const location = useLocation();
    const bufferRef = useRef([]);
    const flushTimerRef = useRef(null);
    const sessionId = useRef(getSessionId());
    const deviceType = isMobile ? 'mobile' : 'desktop';

    // ------------------------------------------
    // Flush buffer to backend
    // ------------------------------------------
    const flushEvents = useCallback(() => {
        const events = bufferRef.current;
        if (events.length === 0) return;

        // Swap buffer immediately so new events go to a clean array
        bufferRef.current = [];

        const payload = JSON.stringify({ events });

        // Try fetch first, fallback silently on error
        fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
        }).catch(() => {
            // On network error, put events back into buffer for retry
            bufferRef.current = [...events, ...bufferRef.current];
        });
    }, []);

    // ------------------------------------------
    // Core tracking function
    // ------------------------------------------
    const trackEvent = useCallback((eventType, eventData = {}) => {
        const event = {
            session_id: sessionId.current,
            event_type: eventType,
            event_data: eventData,
            page_path: window.location.pathname + window.location.search,
            device_type: deviceType,
            timestamp: new Date().toISOString(),
        };

        bufferRef.current.push(event);

        // Flush if buffer is full
        if (bufferRef.current.length >= MAX_BUFFER_SIZE) {
            flushEvents();
        }
    }, [deviceType, flushEvents]);

    // ------------------------------------------
    // Auto-flush on interval
    // ------------------------------------------
    useEffect(() => {
        flushTimerRef.current = setInterval(flushEvents, FLUSH_INTERVAL_MS);
        return () => {
            clearInterval(flushTimerRef.current);
            // Flush remaining events on unmount
            flushEvents();
        };
    }, [flushEvents]);

    // ------------------------------------------
    // sendBeacon on page unload (last chance)
    // ------------------------------------------
    useEffect(() => {
        const handleUnload = () => {
            const events = bufferRef.current;
            if (events.length === 0) return;

            const payload = JSON.stringify({ events });

            // sendBeacon is reliable during page unload
            if (navigator.sendBeacon) {
                const blob = new Blob([payload], { type: 'application/json' });
                navigator.sendBeacon(API_ENDPOINT, blob);
            }
        };

        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, []);

    // ------------------------------------------
    // Auto-track page views on route change
    // ------------------------------------------
    useEffect(() => {
        trackEvent('page_view', {
            path: location.pathname,
            search: location.search,
            referrer: document.referrer || null,
        });
    }, [location.pathname, location.search, trackEvent]);

    // ------------------------------------------
    // Provide trackEvent to the entire app
    // ------------------------------------------
    const value = { trackEvent };

    return (
        <TrackingContext.Provider value={value}>
            {children}
        </TrackingContext.Provider>
    );
}

export default TrackingContext;
