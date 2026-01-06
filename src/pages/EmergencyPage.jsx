import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useLocationContext } from '../context/LocationContext';

// Emergency services data
const emergencyServicesData = {
    vi: {
        title: 'Dịch vụ khẩn cấp',
        subtitle: 'Hỗ trợ nhanh 24/7',
        services: [
            {
                id: 'cuu-ho-xe',
                name: 'Cứu hộ xe',
                icon: '🚗',
                phone: '1800-1234',
                description: 'Cứu hộ ô tô, xe máy 24/7',
                image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=300&fit=crop'
            },
            {
                id: 'cap-cuu',
                name: 'Cấp cứu y tế',
                icon: '🚑',
                phone: '115',
                description: 'Cấp cứu y tế khẩn cấp',
                image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop'
            },
            {
                id: 'chua-chay',
                name: 'Chữa cháy',
                icon: '🚒',
                phone: '114',
                description: 'Dịch vụ chữa cháy, cứu nạn',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
            },
            {
                id: 'cong-an',
                name: 'Công an',
                icon: '👮',
                phone: '113',
                description: 'Hỗ trợ an ninh, trật tự',
                image: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=400&h=300&fit=crop'
            },
            {
                id: 'nha-thuoc-24h',
                name: 'Nhà thuốc 24h',
                icon: '💊',
                phone: '',
                description: 'Nhà thuốc mở cửa 24/7',
                image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop'
            },
            {
                id: 'mo-khoa',
                name: 'Mở khóa cửa',
                icon: '🔑',
                phone: '1900-xxxx',
                description: 'Dịch vụ mở khóa khẩn cấp',
                image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop'
            },
        ]
    },
    en: {
        title: 'Emergency Services',
        subtitle: '24/7 Quick Support',
        services: [
            {
                id: 'cuu-ho-xe',
                name: 'Tow Truck',
                icon: '🚗',
                phone: '1800-1234',
                description: '24/7 Car & Motorbike Rescue',
                image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=300&fit=crop'
            },
            {
                id: 'cap-cuu',
                name: 'Medical Emergency',
                icon: '🚑',
                phone: '115',
                description: 'Emergency Medical Services',
                image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop'
            },
            {
                id: 'chua-chay',
                name: 'Fire Department',
                icon: '🚒',
                phone: '114',
                description: 'Fire & Rescue Services',
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
            },
            {
                id: 'cong-an',
                name: 'Police',
                icon: '👮',
                phone: '113',
                description: 'Security & Order Support',
                image: 'https://images.unsplash.com/photo-1453873531674-2151bcd01707?w=400&h=300&fit=crop'
            },
            {
                id: 'nha-thuoc-24h',
                name: '24h Pharmacy',
                icon: '💊',
                phone: '',
                description: '24/7 Pharmacy',
                image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop'
            },
            {
                id: 'mo-khoa',
                name: 'Locksmith',
                icon: '🔑',
                phone: '1900-xxxx',
                description: 'Emergency Lock Service',
                image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop'
            },
        ]
    }
};

function EmergencyPage() {
    const { language } = useLanguage();
    const { address, hasLocation, setIsLocationModalOpen } = useLocationContext();

    const data = emergencyServicesData[language] || emergencyServicesData.vi;

    const handleCall = (phone) => {
        if (phone) {
            window.location.href = `tel:${phone}`;
        }
    };

    const handleSearch = (serviceName) => {
        const locationQuery = hasLocation
            ? `${serviceName} ${address.district || ''} ${address.city || ''}`.trim()
            : serviceName;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(locationQuery)}`, '_blank');
    };

    return (
        <div className="emergency-page">
            <div className="emergency-page__container">
                <div className="emergency-page__header">
                    <h1 className="emergency-page__title">{data.title}</h1>
                    <p className="emergency-page__subtitle">{data.subtitle}</p>

                    {hasLocation ? (
                        <div className="emergency-page__location">
                            <span>📍</span> {address.full}
                        </div>
                    ) : (
                        <button
                            className="emergency-page__set-location"
                            onClick={() => setIsLocationModalOpen(true)}
                        >
                            📍 {language === 'en' ? 'Set location for nearby services' : 'Chọn vị trí để tìm dịch vụ gần'}
                        </button>
                    )}
                </div>

                <div className="emergency-page__grid">
                    {data.services.map((service) => (
                        <div key={service.id} className="emergency-card">
                            <div className="emergency-card__image">
                                <img src={service.image} alt={service.name} />
                                <div className="emergency-card__icon">{service.icon}</div>
                            </div>
                            <div className="emergency-card__content">
                                <h3 className="emergency-card__name">{service.name}</h3>
                                <p className="emergency-card__desc">{service.description}</p>

                                <div className="emergency-card__actions">
                                    {service.phone && (
                                        <button
                                            className="emergency-card__btn emergency-card__btn--call"
                                            onClick={() => handleCall(service.phone)}
                                        >
                                            📞 {service.phone}
                                        </button>
                                    )}
                                    <button
                                        className="emergency-card__btn emergency-card__btn--search"
                                        onClick={() => handleSearch(service.name)}
                                    >
                                        🔍 {language === 'en' ? 'Find' : 'Tìm kiếm'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EmergencyPage;
