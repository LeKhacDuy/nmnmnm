import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import dealsData from '../data/dealsData';

function DealsSection() {
    const { language } = useLanguage();
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const translations = {
        vi: {
            title: 'Ưu Đãi Hot',
            subtitle: 'Khuyến mãi độc quyền từ đối tác',
            viewAll: 'Xem tất cả ưu đãi',
            validUntil: 'HSD',
            free: 'Miễn phí',
            off: 'Giảm'
        },
        en: {
            title: 'Hot Deals',
            subtitle: 'Exclusive promotions from partners',
            viewAll: 'View all deals',
            validUntil: 'Valid',
            free: 'Free',
            off: 'Off'
        }
    };

    const t = translations[language] || translations.vi;

    const formatPrice = (price) => {
        if (price === 0) return t.free;
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const scrollEl = scrollRef.current;
        if (scrollEl) {
            scrollEl.addEventListener('scroll', checkScrollButtons);
            return () => scrollEl.removeEventListener('scroll', checkScrollButtons);
        }
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 340;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="deals-section">
            <div className="deals-section__container">
                <div className="deals-section__header">
                    <div className="deals-section__title-group">
                        <h2 className="deals-section__title">
                            🔥 {t.title}
                        </h2>
                        <p className="deals-section__subtitle">{t.subtitle}</p>
                    </div>
                    <div className="deals-section__nav">
                        <button
                            className={`deals-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Previous"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            className={`deals-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Next"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="deals-section__carousel" ref={scrollRef}>
                    {dealsData.map((deal) => (
                        <div key={deal.id} className="deal-card">
                            <div className="deal-card__image-wrapper">
                                <img
                                    src={deal.image}
                                    alt={deal.title[language] || deal.title.vi}
                                    className="deal-card__image"
                                />
                                <div className="deal-card__badge">
                                    {deal.discount === 100 ? t.free : `-${deal.discount}%`}
                                </div>
                                <div className="deal-card__category">
                                    {deal.category[language] || deal.category.vi}
                                </div>
                            </div>
                            <div className="deal-card__content">
                                <div className="deal-card__partner">
                                    <img
                                        src={deal.partnerLogo}
                                        alt={deal.partnerName}
                                        className="deal-card__partner-logo"
                                    />
                                    <span className="deal-card__partner-name">{deal.partnerName}</span>
                                </div>
                                <h3 className="deal-card__title">
                                    {deal.title[language] || deal.title.vi}
                                </h3>
                                <p className="deal-card__description">
                                    {deal.description[language] || deal.description.vi}
                                </p>
                                <div className="deal-card__pricing">
                                    <span className="deal-card__original-price">
                                        {formatPrice(deal.originalPrice)}
                                    </span>
                                    <span className="deal-card__sale-price">
                                        {formatPrice(deal.salePrice)}
                                    </span>
                                </div>
                                <div className="deal-card__validity">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    {t.validUntil}: {formatDate(deal.validUntil)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="deals-section__footer">
                    <button className="deals-section__view-all">
                        {t.viewAll}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DealsSection;
