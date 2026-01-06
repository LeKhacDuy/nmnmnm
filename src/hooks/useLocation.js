import { useState } from 'react';

export function useLocation() {
    const [location, setLocation] = useState({
        lat: null,
        lng: null,
        address: {
            ward: '',
            district: '',
            city: '',
            full: ''
        },
        loading: false,
        error: null
    });

    const getLocation = async () => {
        setLocation(prev => ({ ...prev, loading: true, error: null }));
        try {
            const pos = await new Promise((resolve, reject) => {
                if (!navigator.geolocation) return reject('Trình duyệt không hỗ trợ định vị.');
                navigator.geolocation.getCurrentPosition(
                    pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    err => reject(err),
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
                );
            });

            const address = await reverseGeocode(pos.lat, pos.lng);

            setLocation({
                lat: pos.lat,
                lng: pos.lng,
                address: address,
                loading: false,
                error: null
            });
            return { lat: pos.lat, lng: pos.lng, address };
        } catch (err) {
            console.error(err);
            setLocation(prev => ({ ...prev, loading: false, error: 'Không thể lấy vị trí GPS.' }));
            throw err;
        }
    };

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

            return {
                ward,
                district,
                city,
                road,
                full,
                raw: addr
            };
        } catch (e) {
            console.error("Reverse geocode failed", e);
            return { full: 'Không xác định' };
        }
    };

    const buildQueries = (baseKeyword) => {
        const { address, lat, lng } = location;
        const ward = address.ward || '';
        const district = address.district || '';
        const city = address.city || '';
        const road = address.road || '';
        const fullAddress = address.full || '';

        const toTag = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").toLowerCase();
        const tag = toTag(baseKeyword + 'saigon');

        return {
            q_near_me: `${baseKeyword} gần đây`,
            q_road: road ? `${baseKeyword} ${road}` : `${baseKeyword} ${district}`,
            q_ward: ward ? `${baseKeyword} ${ward}` : `${baseKeyword} ${district}`,
            q_district: `${baseKeyword} ${district}`,
            q_ward_district: `${baseKeyword} ${ward} ${district}`,
            q_full: `${baseKeyword} ${road} ${district}`,
            ward: ward,
            district: district,
            city: city,
            fullAddress: fullAddress,
            lat: lat,
            lng: lng,
            tag: tag
        };
    };

    return {
        location,
        getLocation,
        buildQueries,
        setLocationState: setLocation
    };
}
