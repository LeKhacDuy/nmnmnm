import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocationContext } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';

function HeroSection() {
    const navigate = useNavigate();
    const { hasLocation, setIsLocationModalOpen, setPendingSearch } = useLocationContext();
    const { t } = useLanguage();

    const [activeCategory, setActiveCategory] = useState('all');
    const [searchKeyword, setSearchKeyword] = useState('');

    const categories = [
        { id: 'all', labelKey: 'searchAll', icon: '🔍' },
        { id: 'hotel', labelKey: 'hotel', icon: '🏨' },
        { id: 'activity', labelKey: 'activity', icon: '📸' },
        { id: 'restaurant', labelKey: 'restaurant', icon: '🍽️' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();

        const keyword = searchKeyword.trim();
        if (!keyword) {
            return;
        }

        // If no location, open modal and save pending search
        if (!hasLocation) {
            setPendingSearch(keyword);
            setIsLocationModalOpen(true);
            return;
        }

        // Navigate to search page with keyword
        navigate(`/search?q=${encodeURIComponent(keyword)}`);
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);

        // If clicking a category other than "all", search for it
        if (categoryId !== 'all') {
            const category = categories.find(c => c.id === categoryId);
            if (category) {
                const label = t(category.labelKey);
                if (!hasLocation) {
                    setPendingSearch(label);
                    setIsLocationModalOpen(true);
                } else {
                    navigate(`/search?q=${encodeURIComponent(label)}`);
                }
            }
        }
    };

    return (
        <section className="hero-section">
            <h1 className="hero-section__title">{t('heroTitle')}</h1>

            {/* Categories */}
            <div className="hero-section__categories">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`hero-section__category ${activeCategory === cat.id ? 'hero-section__category--active' : ''}`}
                        onClick={() => handleCategoryClick(cat.id)}
                    >
                        <span className="hero-section__category-icon">{cat.icon}</span>
                        <span>{t(cat.labelKey)}</span>
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <form className="hero-section__search" onSubmit={handleSearch}>
                <span className="hero-section__search-icon">🔍</span>
                <input
                    type="text"
                    className="hero-section__search-input"
                    placeholder={t('searchPlaceholder')}
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button type="submit" className="hero-section__search-btn">
                    {t('searchBtn')}
                </button>
            </form>
        </section>
    );
}

export default HeroSection;
