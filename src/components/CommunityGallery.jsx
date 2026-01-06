import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import galleryData from '../data/galleryData';

function CommunityGallery() {
    const { language } = useLanguage();
    const [selectedImage, setSelectedImage] = useState(null);

    const translations = {
        vi: {
            title: 'Ảnh Từ Cộng Đồng',
            subtitle: 'Khám phá địa điểm qua góc nhìn người dùng',
            viewMore: 'Xem thêm ảnh',
            likes: 'lượt thích',
            comments: 'bình luận',
            close: 'Đóng'
        },
        en: {
            title: 'Community Gallery',
            subtitle: 'Explore places through user perspectives',
            viewMore: 'View more photos',
            likes: 'likes',
            comments: 'comments',
            close: 'Close'
        }
    };

    const t = translations[language] || translations.vi;

    const formatNumber = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const openLightbox = (image) => {
        setSelectedImage(image);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section className="community-gallery">
            <div className="community-gallery__container">
                <div className="community-gallery__header">
                    <h2 className="community-gallery__title">
                        📸 {t.title}
                    </h2>
                    <p className="community-gallery__subtitle">{t.subtitle}</p>
                </div>

                <div className="community-gallery__grid">
                    {galleryData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`gallery-item gallery-item--${index % 3 === 0 ? 'tall' : index % 4 === 0 ? 'wide' : 'normal'}`}
                            onClick={() => openLightbox(item)}
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.placeName[language] || item.placeName.vi}
                                className="gallery-item__image"
                            />
                            <div className="gallery-item__overlay">
                                <div className="gallery-item__user">
                                    <img
                                        src={item.userAvatar}
                                        alt={item.userName}
                                        className="gallery-item__avatar"
                                    />
                                    <span className="gallery-item__username">{item.userName}</span>
                                </div>
                                <div className="gallery-item__place">
                                    <span className="gallery-item__place-name">
                                        {item.placeName[language] || item.placeName.vi}
                                    </span>
                                    <span className="gallery-item__place-category">
                                        {item.placeCategory[language] || item.placeCategory.vi}
                                    </span>
                                </div>
                                <div className="gallery-item__stats">
                                    <span className="gallery-item__stat">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        {formatNumber(item.likes)}
                                    </span>
                                    <span className="gallery-item__stat">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
                                        </svg>
                                        {formatNumber(item.comments)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="community-gallery__footer">
                    <button className="community-gallery__view-more">
                        {t.viewMore}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="gallery-lightbox" onClick={closeLightbox}>
                    <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <button className="gallery-lightbox__close" onClick={closeLightbox}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage.imageUrl}
                            alt={selectedImage.placeName[language] || selectedImage.placeName.vi}
                            className="gallery-lightbox__image"
                        />
                        <div className="gallery-lightbox__info">
                            <div className="gallery-lightbox__user">
                                <img
                                    src={selectedImage.userAvatar}
                                    alt={selectedImage.userName}
                                    className="gallery-lightbox__avatar"
                                />
                                <div>
                                    <span className="gallery-lightbox__username">{selectedImage.userName}</span>
                                    <span className="gallery-lightbox__place">
                                        {selectedImage.placeName[language] || selectedImage.placeName.vi}
                                    </span>
                                </div>
                            </div>
                            <div className="gallery-lightbox__stats">
                                <span>❤️ {selectedImage.likes} {t.likes}</span>
                                <span>💬 {selectedImage.comments} {t.comments}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CommunityGallery;
