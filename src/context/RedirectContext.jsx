import { createContext, useContext, useState, useCallback } from 'react';
import { useLanguage } from './LanguageContext';

const RedirectContext = createContext(null);

export function useRedirect() {
    const context = useContext(RedirectContext);
    if (!context) {
        throw new Error('useRedirect must be used within a RedirectProvider');
    }
    return context;
}

export function RedirectProvider({ children }) {
    const { language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [platform, setPlatform] = useState({ name: '', icon: '', url: '' });
    const [countdown, setCountdown] = useState(3);
    const [intervalId, setIntervalId] = useState(null);

    const text = language === 'en' ? {
        thankyou: 'Thank you for using NearMe!',
        redirecting: 'You are being redirected to',
        autoRedirect: 'Auto-redirect in',
        seconds: 'seconds',
        goNow: 'Go Now',
        cancel: 'Cancel',
        tip: '💡 Tip: Come back to NearMe to discover more!'
    } : {
        thankyou: 'Cảm ơn bạn đã sử dụng NearMe!',
        redirecting: 'Bạn đang được chuyển đến',
        autoRedirect: 'Tự động chuyển trong',
        seconds: 'giây',
        goNow: 'Đi ngay',
        cancel: 'Hủy',
        tip: '💡 Tip: Quay lại NearMe để khám phá thêm nhiều điều!'
    };

    const showRedirectPopup = useCallback((name, icon, url) => {
        setPlatform({ name, icon, url });
        setIsOpen(true);
        setCountdown(3);

        // Clear any existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Start countdown
        const id = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(id);
                    // Auto-redirect after countdown
                    setTimeout(() => {
                        window.open(url, '_blank');
                        setIsOpen(false);
                    }, 500);
                }
                return prev - 1;
            });
        }, 1000);

        setIntervalId(id);
    }, [intervalId]);

    const handleGo = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        window.open(platform.url, '_blank');
        setIsOpen(false);
    }, [platform.url, intervalId]);

    const handleCancel = useCallback(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIsOpen(false);
    }, [intervalId]);

    const value = {
        showRedirectPopup
    };

    return (
        <RedirectContext.Provider value={value}>
            {children}

            {/* Popup Component */}
            {isOpen && (
                <div className="redirect-popup-overlay">
                    <div className="redirect-popup">
                        {/* Header */}
                        <div className="redirect-popup__header">
                            <div className="redirect-popup__checkmark">✓</div>
                            <h2 className="redirect-popup__title">{text.thankyou}</h2>
                        </div>

                        {/* Platform info */}
                        <div className="redirect-popup__platform">
                            <span className="redirect-popup__platform-icon">{platform.icon}</span>
                            <div className="redirect-popup__platform-info">
                                <p className="redirect-popup__subtitle">{text.redirecting}</p>
                                <p className="redirect-popup__name">{platform.name}</p>
                            </div>
                        </div>

                        {/* Countdown */}
                        {countdown > 0 && (
                            <div className="redirect-popup__countdown">
                                <div className="redirect-popup__countdown-circle">
                                    <span>{countdown}</span>
                                </div>
                                <p>{text.autoRedirect} {countdown} {text.seconds}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="redirect-popup__actions">
                            <button
                                className="redirect-popup__btn redirect-popup__btn--primary"
                                onClick={handleGo}
                            >
                                {text.goNow} →
                            </button>
                            <button
                                className="redirect-popup__btn redirect-popup__btn--secondary"
                                onClick={handleCancel}
                            >
                                {text.cancel}
                            </button>
                        </div>

                        {/* Tip */}
                        <p className="redirect-popup__tip">{text.tip}</p>
                    </div>
                </div>
            )}
        </RedirectContext.Provider>
    );
}

export default RedirectContext;
