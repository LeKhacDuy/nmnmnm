import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationContext } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';

export default function LocationModal({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const {
        requestGPS,
        setManualLocation,
        isLoading,
        pendingSearch,
        clearPendingSearch
    } = useLocationContext();

    const [mode, setMode] = useState('choice'); // 'choice' | 'manual'
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [road, setRoad] = useState('');

    const [isGettingGPS, setIsGettingGPS] = useState(false);

    // Reset mode when modal opens
    useEffect(() => {
        if (isOpen) {
            setMode('choice');
        }
    }, [isOpen]);

    // Fetch cities when entering manual mode
    useEffect(() => {
        if (mode === 'manual' && cities.length === 0) {
            fetch('https://provinces.open-api.vn/api/?depth=1')
                .then(res => res.json())
                .then(data => setCities(data))
                .catch(err => console.error(err));
        }
    }, [mode, cities.length]);

    const handleCityChange = (e) => {
        const code = e.target.value;
        setSelectedCity(code);
        setSelectedDistrict('');
        setSelectedWard('');
        setWards([]);
        if (code) {
            fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
                .then(res => res.json())
                .then(data => setDistricts(data.districts || []));
        } else {
            setDistricts([]);
        }
    };

    const handleDistrictChange = (e) => {
        const code = e.target.value;
        setSelectedDistrict(code);
        setSelectedWard('');
        if (code) {
            fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`)
                .then(res => res.json())
                .then(data => setWards(data.wards || []));
        } else {
            setWards([]);
        }
    };

    const handleConfirm = () => {
        const city = cities.find(c => c.code == selectedCity)?.name;
        const district = districts.find(d => d.code == selectedDistrict)?.name;
        const ward = wards.find(w => w.code == selectedWard)?.name;

        if (!city || !district) {
            alert(t('selectProvinceDistrictRequired') || "Vui lòng chọn ít nhất Tỉnh/Thành và Quận/Huyện");
            return;
        }

        setManualLocation({
            city,
            district,
            ward,
            road,
            full: [road, ward, district, city].filter(Boolean).join(', ')
        });

        onClose();

        // Execute pending search if any
        setTimeout(() => {
            if (pendingSearch) {
                navigate(`/search?q=${encodeURIComponent(pendingSearch)}`);
                clearPendingSearch();
            }
        }, 100);
    };

    const handleUseGPS = async () => {
        setIsGettingGPS(true);
        try {
            await requestGPS();
            onClose();

            // Execute pending search if any
            setTimeout(() => {
                if (pendingSearch) {
                    navigate(`/search?q=${encodeURIComponent(pendingSearch)}`);
                    clearPendingSearch();
                }
            }, 100);
        } catch (error) {
            alert(t('gpsError') || "Không thể lấy vị trí GPS. Vui lòng thử nhập tay.");
            setMode('manual');
        } finally {
            setIsGettingGPS(false);
        }
    };

    const handleClose = () => {
        clearPendingSearch();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="location-modal-overlay" onClick={handleClose}>
            <div className="location-modal" onClick={e => e.stopPropagation()}>
                {mode === 'choice' ? (
                    <>
                        {/* Choice Mode */}
                        <button className="location-modal__close" onClick={handleClose}>
                            ✕
                        </button>
                        <div className="location-modal__content location-modal__content--center">
                            <div className="location-modal__icon">
                                📍
                            </div>
                            <h2 className="location-modal__title">{t('whereAreYou') || 'Bạn đang ở đâu?'}</h2>
                            <p className="location-modal__subtitle">
                                {t('allowLocation') || 'Cho phép NearMe biết vị trí của bạn'}<br />
                                {t('forBetterResults') || 'để tìm kiếm chính xác hơn'}
                            </p>
                            {pendingSearch && (
                                <p className="location-modal__pending">
                                    🔍 {t('searching') || 'Đang tìm'}: <strong>"{pendingSearch}"</strong>
                                </p>
                            )}
                            <div className="location-modal__buttons">
                                <button
                                    className="location-modal__btn location-modal__btn--primary"
                                    onClick={handleUseGPS}
                                    disabled={isGettingGPS || isLoading}
                                >
                                    {isGettingGPS
                                        ? (t('gettingLocation') || '⏳ Đang lấy vị trí...')
                                        : (t('useGPS') || '📡 Sử dụng GPS')}
                                </button>
                                <button
                                    className="location-modal__btn location-modal__btn--secondary"
                                    onClick={() => setMode('manual')}
                                >
                                    {t('enterManually') || '✏️ Nhập địa chỉ thủ công'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Manual Mode */}
                        <div className="location-modal__header">
                            <button
                                className="location-modal__back"
                                onClick={() => setMode('choice')}
                            >
                                ← {t('back') || 'Quay lại'}
                            </button>
                            <h3 className="location-modal__header-title">{t('enterAddress') || 'Nhập địa chỉ'}</h3>
                            <button className="location-modal__close" onClick={handleClose}>
                                ✕
                            </button>
                        </div>
                        <div className="location-modal__content">
                            {pendingSearch && (
                                <p className="location-modal__pending" style={{ marginBottom: '16px' }}>
                                    🔍 {t('searching') || 'Đang tìm'}: <strong>"{pendingSearch}"</strong>
                                </p>
                            )}

                            <div className="location-modal__form-group">
                                <label className="location-modal__label">
                                    🏙️ {t('province') || 'Tỉnh / Thành phố'}
                                </label>
                                <select
                                    className="location-modal__select"
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                >
                                    <option value="">-- {t('selectProvince') || 'Chọn Tỉnh/Thành'} --</option>
                                    {cities.map(c => (
                                        <option key={c.code} value={c.code}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="location-modal__form-group">
                                <label className="location-modal__label">
                                    🏘️ {t('district') || 'Quận / Huyện'}
                                </label>
                                <select
                                    className="location-modal__select"
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    disabled={!selectedCity}
                                >
                                    <option value="">-- {t('selectDistrict') || 'Chọn Quận/Huyện'} --</option>
                                    {districts.map(d => (
                                        <option key={d.code} value={d.code}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="location-modal__form-group">
                                <label className="location-modal__label">
                                    🏠 {t('ward') || 'Phường / Xã'}
                                </label>
                                <select
                                    className="location-modal__select"
                                    value={selectedWard}
                                    onChange={e => setSelectedWard(e.target.value)}
                                    disabled={!selectedDistrict}
                                >
                                    <option value="">-- {t('selectWard') || 'Chọn Phường/Xã'} --</option>
                                    {wards.map(w => (
                                        <option key={w.code} value={w.code}>{w.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="location-modal__form-group">
                                <label className="location-modal__label">
                                    🛣️ {t('road') || 'Số nhà, tên đường'} <span style={{ opacity: 0.6 }}>({t('optional') || 'Tùy chọn'})</span>
                                </label>
                                <input
                                    type="text"
                                    className="location-modal__input"
                                    placeholder={t('roadExample') || "Ví dụ: 123 Nguyễn Huệ"}
                                    value={road}
                                    onChange={e => setRoad(e.target.value)}
                                />
                            </div>

                            <button
                                className="location-modal__btn location-modal__btn--primary location-modal__btn--full"
                                onClick={handleConfirm}
                            >
                                ✓ {t('confirm') || 'Xác nhận vị trí'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
