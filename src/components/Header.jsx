import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLocationContext, SEARCH_MODES } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        hasLocation,
        getLocationDisplay,
        setIsLocationModalOpen,
        setIsRadiusSelectorOpen,
        searchMode,
        setSearchMode,
        radius,
        filterOpenNow,
        setFilterOpenNow,
        activateNearMeMode,
        activateNearbyMode,
        activateClosestMode,
        activateOpenNowMode,
        activateEmergencyMode,
        isLoading
    } = useLocationContext();

    const { language, toggleLanguage, t } = useLanguage();
    const { currentUser } = useAuth();

    const [isScrolled, setIsScrolled] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const ticking = useRef(false);

    const updateScrollState = useCallback(() => {
        const heroSection = document.querySelector('.hero-section');
        const heroHeight = heroSection ? heroSection.offsetHeight : 400;
        const scrollY = window.scrollY;

        if (!isScrolled && scrollY > heroHeight - 50) {
            setIsScrolled(true);
        } else if (isScrolled && scrollY < heroHeight - 100) {
            setIsScrolled(false);
        }

        ticking.current = false;
    }, [isScrolled]);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(updateScrollState);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScrollState]);

    // Get active tab based on current route
    const getActiveTab = () => {
        const path = location.pathname;
        if (path === '/gan-toi') return 'near_me';
        if (path === '/gan-day') return 'nearby';
        if (path === '/gan-nhat') return 'closest';
        if (path === '/dang-mo') return 'open_now';
        if (path === '/khan-cap') return 'emergency';
        return null;
    };

    const activeTab = getActiveTab();

    // Handle "Gần Tôi" click - GPS + 3km default
    const handleNearMeClick = async (e) => {
        e.preventDefault();
        const success = await activateNearMeMode();
        if (success) {
            navigate('/gan-toi');
        }
    };

    // Handle "Gần Đây" click - Manual region selection
    const handleNearbyClick = (e) => {
        e.preventDefault();
        activateNearbyMode();
        // Will navigate after location is selected in modal
    };

    // Handle "Gần Nhất" click - Radius selection
    const handleClosestClick = (e) => {
        e.preventDefault();
        activateClosestMode();
        navigate('/gan-nhat');
    };

    // Handle "Đang Mở" click - Open now filter
    const handleOpenNowClick = (e) => {
        e.preventDefault();
        activateOpenNowMode();
        navigate('/dang-mo');
    };

    // Handle "Khẩn Cấp" click - Emergency services
    const handleEmergencyClick = (e) => {
        e.preventDefault();
        activateEmergencyMode();
        navigate('/khan-cap');
    };

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchKeyword.trim())}`);
        }
    };

    return (
        <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
            <div className="header__container">
                {/* Logo */}
                <Link to="/" className="header__logo">
                    <span className="header__logo-icon">🦉</span>
                    <span className="header__logo-text">NearMe</span>
                </Link>

                {/* Inline Search - only visible when scrolled */}
                <form className="header__search header__search--inline" onSubmit={handleSearch}>
                    <span className="header__search-icon">🔍</span>
                    <input
                        type="text"
                        className="header__search-input"
                        placeholder={t('search')}
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </form>

                {/* Navigation - Center */}
                <nav className="header__nav">
                    <a
                        href="/gan-toi"
                        className={`header__nav-link ${activeTab === 'near_me' ? 'header__nav-link--active' : ''}`}
                        onClick={handleNearMeClick}
                        title={language === 'en' ? 'GPS location + 3km radius' : 'Vị trí GPS + bán kính 3km'}
                    >
                        {t('nearMe')}
                    </a>
                    <a
                        href="/gan-day"
                        className={`header__nav-link ${activeTab === 'nearby' ? 'header__nav-link--active' : ''}`}
                        onClick={handleNearbyClick}
                        title={language === 'en' ? 'Select region manually' : 'Chọn khu vực thủ công'}
                    >
                        {t('nearby')}
                    </a>
                    <a
                        href="/gan-nhat"
                        className={`header__nav-link ${activeTab === 'closest' ? 'header__nav-link--active' : ''}`}
                        onClick={handleClosestClick}
                        title={language === 'en' ? `Current radius: ${radius}km` : `Bán kính hiện tại: ${radius}km`}
                    >
                        {t('closest')}
                        {searchMode === SEARCH_MODES.CLOSEST && (
                            <span className="header__nav-badge">{radius}km</span>
                        )}
                    </a>
                    <a
                        href="/dang-mo"
                        className={`header__nav-link ${activeTab === 'open_now' ? 'header__nav-link--active' : ''}`}
                        onClick={handleOpenNowClick}
                        title={language === 'en' ? 'Filter by open hours' : 'Lọc theo giờ mở cửa'}
                    >
                        {t('openNow')}
                        {filterOpenNow && <span className="header__nav-dot"></span>}
                    </a>
                    <a
                        href="/khan-cap"
                        className={`header__nav-link header__nav-link--emergency ${activeTab === 'emergency' ? 'header__nav-link--active' : ''}`}
                        onClick={handleEmergencyClick}
                        title={language === 'en' ? 'Emergency services' : 'Dịch vụ khẩn cấp'}
                    >
                        {t('emergency')}
                    </a>
                    <Link to="/categories" className="header__nav-link">{t('services')}</Link>
                    <button
                        className="header__nav-link header__nav-link--location"
                        onClick={() => setIsLocationModalOpen(true)}
                    >
                        {t('region')}
                    </button>
                </nav>

                {/* Actions */}
                <div className="header__actions">
                    {/* Location Button with Status */}
                    <button
                        className="header__action-btn header__action-btn--location"
                        onClick={() => setIsLocationModalOpen(true)}
                        title={getLocationDisplay()}
                    >
                        {isLoading ? (
                            <span className="header__loading-spinner">⏳</span>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        )}
                        {hasLocation && <span className="header__location-dot"></span>}
                    </button>

                    {/* Language Toggle Button */}
                    <button
                        className="header__action-btn header__action-btn--lang"
                        onClick={toggleLanguage}
                        title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
                    >
                        <span>{language.toUpperCase()}</span>
                    </button>

                    <button
                        className="header__action-btn header__action-btn--bookmark"
                        onClick={() => navigate(currentUser ? '/yeu-thich' : '/login')}
                        title={language === 'vi' ? 'Địa điểm yêu thích' : 'Favorite places'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={currentUser ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                    </button>
                    <button
                        className="header__login-btn"
                        onClick={() => navigate('/login')}
                    >
                        {t('login')}
                    </button>
                </div>
            </div>

            {/* Location Bar - Shows below header when location is set */}
            {hasLocation && (
                <div className="header__location-bar">
                    <span className="header__location-icon">📍</span>
                    <span className="header__location-text">{getLocationDisplay()}</span>
                    <button
                        className="header__location-change"
                        onClick={() => setIsLocationModalOpen(true)}
                    >
                        {t('change')}
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
