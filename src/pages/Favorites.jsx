import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Favorites.css';

function Favorites() {
    const navigate = useNavigate();
    const { currentUser, favorites, removeFavorite } = useAuth();
    const { t, language } = useLanguage();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null;
    }

    const handleRemoveFavorite = async (itemId) => {
        await removeFavorite(itemId);
    };

    const handleOpenInMaps = (item) => {
        const query = encodeURIComponent(item.name || item.keyword || '');
        window.open(`https://www.google.com/maps/search/${query}`, '_blank');
    };

    return (
        <div className="favorites-page">
            <div className="favorites-page__container">
                <div className="favorites-page__header">
                    <h1 className="favorites-page__title">
                        <span className="favorites-page__icon">❤️</span>
                        {language === 'vi' ? 'Địa điểm yêu thích' : 'Favorite Places'}
                    </h1>
                    <p className="favorites-page__subtitle">
                        {language === 'vi'
                            ? 'Danh sách các địa điểm bạn đã lưu'
                            : 'Your saved places list'}
                    </p>
                </div>

                {favorites.length === 0 ? (
                    <div className="favorites-page__empty">
                        <div className="favorites-page__empty-icon">📍</div>
                        <h2 className="favorites-page__empty-title">
                            {language === 'vi'
                                ? 'Chưa có địa điểm yêu thích'
                                : 'No favorite places yet'}
                        </h2>
                        <p className="favorites-page__empty-text">
                            {language === 'vi'
                                ? 'Hãy tìm kiếm và lưu các địa điểm bạn yêu thích!'
                                : 'Search and save your favorite places!'}
                        </p>
                        <button
                            className="favorites-page__search-btn"
                            onClick={() => navigate('/')}
                        >
                            {language === 'vi' ? 'Bắt đầu tìm kiếm' : 'Start searching'}
                        </button>
                    </div>
                ) : (
                    <div className="favorites-page__grid">
                        {favorites.map((item) => (
                            <div key={item.id} className="favorites-card">
                                <div className="favorites-card__content">
                                    <h3 className="favorites-card__name">
                                        {item.name || item.keyword || 'Địa điểm'}
                                    </h3>
                                    {item.category && (
                                        <span className="favorites-card__category">
                                            {item.category}
                                        </span>
                                    )}
                                    {item.address && (
                                        <p className="favorites-card__address">
                                            📍 {item.address}
                                        </p>
                                    )}
                                    <p className="favorites-card__date">
                                        {language === 'vi' ? 'Đã lưu: ' : 'Saved: '}
                                        {new Date(item.savedAt).toLocaleDateString(
                                            language === 'vi' ? 'vi-VN' : 'en-US'
                                        )}
                                    </p>
                                </div>
                                <div className="favorites-card__actions">
                                    <button
                                        className="favorites-card__btn favorites-card__btn--map"
                                        onClick={() => handleOpenInMaps(item)}
                                        title={language === 'vi' ? 'Mở trong Google Maps' : 'Open in Google Maps'}
                                    >
                                        🗺️
                                    </button>
                                    <button
                                        className="favorites-card__btn favorites-card__btn--remove"
                                        onClick={() => handleRemoveFavorite(item.id)}
                                        title={language === 'vi' ? 'Xóa khỏi yêu thích' : 'Remove from favorites'}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;
