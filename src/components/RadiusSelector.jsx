import { useLanguage } from '../context/LanguageContext';
import { useLocationContext, RADIUS_OPTIONS } from '../context/LocationContext';

function RadiusSelector({ isOpen, onClose }) {
    const { t, language } = useLanguage();
    const { radius, setRadius, setIsRadiusSelectorOpen } = useLocationContext();

    if (!isOpen) return null;

    const handleSelect = (value) => {
        setRadius(value);
        setIsRadiusSelectorOpen(false);
        onClose?.();
    };

    const radiusText = language === 'en' ? {
        title: 'Select Radius',
        subtitle: 'Choose search distance',
        km: 'km'
    } : {
        title: 'Chọn bán kính',
        subtitle: 'Chọn khoảng cách tìm kiếm',
        km: 'km'
    };

    return (
        <div className="radius-selector-overlay" onClick={onClose}>
            <div className="radius-selector" onClick={e => e.stopPropagation()}>
                <button className="radius-selector__close" onClick={onClose}>✕</button>

                <div className="radius-selector__header">
                    <div className="radius-selector__icon">📍</div>
                    <h2 className="radius-selector__title">{radiusText.title}</h2>
                    <p className="radius-selector__subtitle">{radiusText.subtitle}</p>
                </div>

                <div className="radius-selector__options">
                    {RADIUS_OPTIONS.map((value) => (
                        <button
                            key={value}
                            className={`radius-selector__option ${radius === value ? 'radius-selector__option--active' : ''}`}
                            onClick={() => handleSelect(value)}
                        >
                            <span className="radius-selector__value">{value}</span>
                            <span className="radius-selector__unit">{radiusText.km}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RadiusSelector;
