import { useState, useEffect } from 'react';
import { useSearchParams, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useLocationContext } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { useRedirect } from '../context/RedirectContext';
import { useTracking } from '../context/TrackingContext';
import { getPlatformUrl, PLATFORM_GROUPS } from '../utils/platformHelper';

function Search({ searchMode: propSearchMode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { categoryId } = useParams();
    const { t, language } = useLanguage();
    const { showRedirectPopup } = useRedirect();
    const { trackEvent } = useTracking();

    const {
        hasLocation,
        address,
        buildQueries,
        setIsLocationModalOpen,
        searchMode: contextSearchMode,
        radius,
        setRadius
    } = useLocationContext();

    const [keyword, setKeyword] = useState('');
    const [queryObj, setQueryObj] = useState(null);

    // Get search mode from props or context
    const currentSearchMode = propSearchMode || contextSearchMode;

    // Scroll to top when navigating to this page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname, searchParams.get('q')]);

    // Category names in both languages
    const categoryNames = {
        vi: {
            'an-uong': 'Ăn uống',
            'ca-phe': 'Cà phê',
            'lam-dep': 'Làm đẹp',
            'y-te': 'Y tế',
            'khach-san': 'Khách sạn',
            'luu-tru': 'Lưu trú',
            'sua-chua': 'Sửa chữa',
            'cuu-ho': 'Cứu hộ',
            'the-thao': 'Thể thao',
            'giao-duc': 'Giáo dục',
            'gia-dinh': 'Gia đình',
            'di-chuyen': 'Di chuyển'
        },
        en: {
            'an-uong': 'Food & Drink',
            'ca-phe': 'Coffee',
            'lam-dep': 'Beauty',
            'y-te': 'Healthcare',
            'khach-san': 'Hotels',
            'luu-tru': 'Accommodation',
            'sua-chua': 'Repair',
            'cuu-ho': 'Rescue',
            'the-thao': 'Sports',
            'giao-duc': 'Education',
            'gia-dinh': 'Family',
            'di-chuyen': 'Transportation'
        }
    };

    // Platform group names in both languages
    const groupNames = {
        vi: {
            'ai': 'Trợ lý AI',
            'maps': 'Bản đồ & Địa điểm',
            'social': 'Social & Review',
            'shopping': 'Mua sắm',
            'food': 'Đặt đồ ăn',
            'travel': 'Du lịch'
        },
        en: {
            'ai': 'AI Assistants',
            'maps': 'Maps & Places',
            'social': 'Social & Review',
            'shopping': 'Shopping',
            'food': 'Food Delivery',
            'travel': 'Travel'
        }
    };

    // Initialize keyword from URL or category
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) {
            setKeyword(q);
        } else if (categoryId) {
            const names = categoryNames[language] || categoryNames.vi;
            setKeyword(names[categoryId] || categoryId);
        }
    }, [searchParams, categoryId, language]);

    // Build queries when keyword or location changes
    useEffect(() => {
        if (keyword && hasLocation) {
            const queries = buildQueries(keyword);
            setQueryObj(queries);
        }
    }, [keyword, hasLocation, buildQueries]);

    // Handle platform click - Show popup before redirect
    const handlePlatformClick = (platformId, platformName, platformIcon) => {
        if (!queryObj) {
            setIsLocationModalOpen(true);
            return;
        }

        const url = getPlatformUrl(platformId, keyword, queryObj);
        if (url) {
            // Track platform click
            trackEvent('platform_click', {
                platform_id: platformId,
                platform_name: platformName,
                keyword,
                url,
            });
            // Show confirmation popup before redirecting
            showRedirectPopup(platformName, platformIcon, url);
        }
    };

    // Handle search form submit
    const handleSearch = (e) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        if (!hasLocation) {
            setIsLocationModalOpen(true);
            return;
        }
        const queries = buildQueries(keyword);
        setQueryObj(queries);

        // Track search
        trackEvent('search', {
            keyword: keyword.trim(),
            source: 'search_page',
        });
    };

    // Get translated group name
    const getGroupName = (groupId) => {
        const names = groupNames[language] || groupNames.vi;
        return names[groupId] || groupId;
    };

    return (
        <div className="search-page">
            <div className="search-page__container">
                {/* Search Header */}
                <div className="search-page__header">
                    <form className="search-page__form" onSubmit={handleSearch}>
                        <div className="search-page__input-wrapper">
                            <span className="search-page__input-icon">🔍</span>
                            <input
                                type="text"
                                className="search-page__input"
                                placeholder={t('searchPlaceholder') || "Tìm kiếm địa điểm, dịch vụ..."}
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword && (
                                <button
                                    type="button"
                                    className="search-page__clear"
                                    onClick={() => setKeyword('')}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <button type="submit" className="search-page__submit">
                            {t('searchBtn') || 'Tìm kiếm'}
                        </button>
                    </form>

                    {/* Location Info */}
                    {hasLocation ? (
                        <div className="search-page__location">
                            <span className="search-page__location-icon">📍</span>
                            <span className="search-page__location-text">{address.full}</span>
                            {radius > 0 && (
                                <span className="search-page__radius-badge">
                                    🎯 {radius}km
                                </span>
                            )}
                            <button
                                className="search-page__location-change"
                                onClick={() => setIsLocationModalOpen(true)}
                            >
                                {t('changeLocation') || 'Đổi vị trí'}
                            </button>
                        </div>
                    ) : (
                        <div className="search-page__no-location">
                            <button
                                className="search-page__set-location"
                                onClick={() => setIsLocationModalOpen(true)}
                            >
                                📍 {t('selectLocationToSearch') || 'Chọn vị trí để tìm kiếm'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Results */}
                {keyword && (
                    <div className="search-results">
                        {/* Platform Groups as Image Cards */}
                        {PLATFORM_GROUPS.map((group) => (
                            <section key={group.id} className="platform-image-section">
                                <div className="platform-image-section__header">
                                    <h2 className="platform-image-section__title">
                                        {getGroupName(group.id)}
                                    </h2>
                                    <span className="platform-image-section__subtitle">
                                        {t('searchFor') || 'Tìm'} "{keyword}" {t('onPlatforms') || 'trên'} {group.platforms.length} {t('platforms') || 'nền tảng'}
                                    </span>
                                </div>

                                <div className="platform-image-cards">
                                    {group.platforms.map((platform) => (
                                        <div
                                            key={platform.id}
                                            className="platform-image-card"
                                            onClick={() => handlePlatformClick(platform.id, platform.name, platform.icon)}
                                        >
                                            <div className="platform-image-card__image">
                                                <img src={platform.image} alt={platform.name} />
                                                <div className="platform-image-card__overlay">
                                                    <span className="platform-image-card__icon">{platform.icon}</span>
                                                </div>
                                            </div>
                                            <h3 className="platform-image-card__title">{platform.name}</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!keyword && (
                    <div className="search-empty">
                        <div className="search-empty__icon">🔍</div>
                        <h3 className="search-empty__title">{t('startSearch') || 'Bắt đầu tìm kiếm'}</h3>
                        <p className="search-empty__text">
                            {t('searchHint') || 'Nhập từ khóa để tìm kiếm địa điểm, dịch vụ gần bạn'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
