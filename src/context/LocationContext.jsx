import { createContext, useContext, useState, useCallback } from 'react';

const LocationContext = createContext(null);

// Search mode types
export const SEARCH_MODES = {
    NEAR_ME: 'near_me',      // GPS + 3km default
    NEARBY: 'nearby',         // Manual region selection
    CLOSEST: 'closest',       // Custom radius selection
    OPEN_NOW: 'open_now',     // Filter by open hours
    EMERGENCY: 'emergency'    // Emergency services
};

// Radius options (in km)
export const RADIUS_OPTIONS = [1, 3, 5, 10, 20, 50];

export function LocationProvider({ children }) {
    // GPS State
    const [gpsEnabled, setGpsEnabled] = useState(false);
    const [gpsCoords, setGpsCoords] = useState(null); // { lat, lng }
    const [gpsError, setGpsError] = useState(null);

    // Selected Region (for "Gần Đây" mode)
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    // Address info from GPS or manual selection
    const [address, setAddress] = useState({
        ward: '',
        district: '',
        city: '',
        road: '',
        full: ''
    });

    // Search Settings
    const [radius, setRadius] = useState(3); // km (default: 3)
    const [searchMode, setSearchMode] = useState(SEARCH_MODES.NEAR_ME);
    const [filterOpenNow, setFilterOpenNow] = useState(false);

    // Pending search (to execute after location is set)
    const [pendingSearch, setPendingSearch] = useState(null);

    // UI State
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isRadiusSelectorOpen, setIsRadiusSelectorOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Request GPS location (for "Gần Tôi" mode)
    const requestGPS = async () => {
        setIsLoading(true);
        setGpsError(null);

        try {
            const pos = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    return reject(new Error('Trình duyệt không hỗ trợ định vị.'));
                }
                navigator.geolocation.getCurrentPosition(
                    position => resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }),
                    error => reject(error),
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
                );
            });

            setGpsCoords(pos);
            setGpsEnabled(true);

            // Reverse geocode to get address
            const addr = await reverseGeocode(pos.lat, pos.lng);
            setAddress(addr);

            // Set default 3km radius for GPS mode
            setRadius(3);
            setSearchMode(SEARCH_MODES.NEAR_ME);

            setIsLoading(false);
            return { coords: pos, address: addr };
        } catch (err) {
            console.error('GPS Error:', err);
            setGpsError(err.message || 'Không thể lấy vị trí GPS.');
            setGpsEnabled(false);
            setIsLoading(false);
            throw err;
        }
    };

    // Reverse geocode using OpenStreetMap Nominatim
    const reverseGeocode = async (lat, lng) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
            const res = await fetch(url);
            const data = await res.json();

            const addr = data.address || {};
            const ward = addr.ward || addr.suburb || addr.quarter || '';
            const district = addr.district || addr.city_district || '';
            const city = addr.city || addr.state || '';
            const road = addr.road || '';
            const full = [road, ward, district, city].filter(Boolean).join(', ');

            return { ward, district, city, road, full, raw: addr };
        } catch (e) {
            console.error("Reverse geocode failed", e);
            return { ward: '', district: '', city: '', road: '', full: 'Không xác định' };
        }
    };

    // Set location manually (for "Gần Đây" mode)
    const setManualLocation = (locationData) => {
        setAddress({
            ward: locationData.ward || '',
            district: locationData.district || '',
            city: locationData.city || '',
            road: locationData.road || '',
            full: locationData.full || ''
        });
        setSelectedProvince(locationData.city);
        setSelectedDistrict(locationData.district);
        setSelectedWard(locationData.ward);
        setSearchMode(SEARCH_MODES.NEARBY);
        setGpsEnabled(false);
        setGpsCoords(null);
    };

    // Activate "Gần Tôi" mode - GPS + 3km
    const activateNearMeMode = async () => {
        try {
            await requestGPS();
            setSearchMode(SEARCH_MODES.NEAR_ME);
            setRadius(3);
            return true;
        } catch (err) {
            // GPS failed, open modal
            setIsLocationModalOpen(true);
            return false;
        }
    };

    // Activate "Gần Đây" mode - Manual region
    const activateNearbyMode = () => {
        setSearchMode(SEARCH_MODES.NEARBY);
        setIsLocationModalOpen(true);
    };

    // Activate "Gần Nhất" mode - Custom radius
    const activateClosestMode = () => {
        setSearchMode(SEARCH_MODES.CLOSEST);
        setIsRadiusSelectorOpen(true);
    };

    // Activate "Đang Mở" mode - Open now filter
    const activateOpenNowMode = () => {
        setSearchMode(SEARCH_MODES.OPEN_NOW);
        setFilterOpenNow(true);
    };

    // Activate "Khẩn Cấp" mode - Emergency services
    const activateEmergencyMode = () => {
        setSearchMode(SEARCH_MODES.EMERGENCY);
    };

    // Build search queries based on current location
    const buildQueries = useCallback((keyword) => {
        const ward = address.ward || '';
        const district = address.district || '';
        const city = address.city || '';
        const road = address.road || '';
        const fullAddress = address.full || '';

        const toTag = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();

        return {
            q_near_me: `${keyword} gần đây`,
            q_road: road ? `${keyword} ${road}` : `${keyword} ${district}`,
            q_ward: ward ? `${keyword} ${ward}` : `${keyword} ${district}`,
            q_district: `${keyword} ${district}`,
            q_ward_district: `${keyword} ${ward} ${district}`,
            q_full: `${keyword} ${road} ${district}`,
            ward,
            district,
            city,
            fullAddress,
            lat: gpsCoords?.lat || null,
            lng: gpsCoords?.lng || null,
            tag: toTag(keyword),
            radius,
            searchMode,
            filterOpenNow
        };
    }, [address, gpsCoords, radius, searchMode, filterOpenNow]);

    // Check if location is available
    const hasLocation = gpsEnabled || !!address.full;

    // Get display location text
    const getLocationDisplay = () => {
        if (isLoading) return 'Đang lấy vị trí...';
        if (address.full) return address.full;
        if (gpsError) return 'Chưa xác định vị trí';
        return 'Chọn vị trí';
    };

    // Start a search (will prompt for location if needed)
    const startSearch = (keyword, navigate) => {
        if (!keyword?.trim()) return;

        if (!hasLocation) {
            setPendingSearch(keyword.trim());
            setIsLocationModalOpen(true);
            return false;
        }

        navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
        return true;
    };

    // Clear pending search
    const clearPendingSearch = () => {
        setPendingSearch(null);
    };

    const value = {
        // State
        gpsEnabled,
        gpsCoords,
        gpsError,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        address,
        radius,
        searchMode,
        filterOpenNow,
        isLocationModalOpen,
        isRadiusSelectorOpen,
        isLoading,
        hasLocation,
        pendingSearch,

        // Mode activators
        activateNearMeMode,
        activateNearbyMode,
        activateClosestMode,
        activateOpenNowMode,
        activateEmergencyMode,

        // Actions
        requestGPS,
        setManualLocation,
        buildQueries,
        setRadius,
        setSearchMode,
        setFilterOpenNow,
        setIsLocationModalOpen,
        setIsRadiusSelectorOpen,
        getLocationDisplay,
        startSearch,
        clearPendingSearch,
        setPendingSearch,

        // Direct setters
        setAddress,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocationContext() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocationContext must be used within a LocationProvider');
    }
    return context;
}

export default LocationContext;
