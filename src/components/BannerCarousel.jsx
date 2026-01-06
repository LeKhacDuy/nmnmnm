import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const bannersData = {
    vi: [
        {
            id: 1,
            title: 'Giảm 50% Khách sạn',
            subtitle: 'Đặt ngay hôm nay',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
            cta: 'Khám phá ngay',
            link: '/khuyen-mai/khach-san'
        },
        {
            id: 2,
            title: 'Ẩm thực đường phố',
            subtitle: 'Khám phá hương vị địa phương',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
            cta: 'Khám phá ngay',
            link: '/khuyen-mai/am-thuc'
        },
        {
            id: 3,
            title: 'Spa & Wellness',
            subtitle: 'Thư giãn cuối tuần',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop',
            cta: 'Khám phá ngay',
            link: '/khuyen-mai/spa'
        },
        {
            id: 4,
            title: 'Tour du lịch Hot',
            subtitle: 'Giá tốt nhất trong năm',
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop',
            cta: 'Khám phá ngay',
            link: '/khuyen-mai/tour'
        },
    ],
    en: [
        {
            id: 1,
            title: '50% Off Hotels',
            subtitle: 'Book today',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
            cta: 'Explore now',
            link: '/khuyen-mai/khach-san'
        },
        {
            id: 2,
            title: 'Street Food',
            subtitle: 'Discover local flavors',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
            cta: 'Explore now',
            link: '/khuyen-mai/am-thuc'
        },
        {
            id: 3,
            title: 'Spa & Wellness',
            subtitle: 'Weekend relaxation',
            image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop',
            cta: 'Explore now',
            link: '/khuyen-mai/spa'
        },
        {
            id: 4,
            title: 'Hot Travel Tours',
            subtitle: 'Best prices of the year',
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=400&fit=crop',
            cta: 'Explore now',
            link: '/khuyen-mai/tour'
        },
    ]
};

function BannerCarousel() {
    const { language } = useLanguage();
    const banners = bannersData[language] || bannersData.vi;

    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);

    // Auto-slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [banners.length]);

    useEffect(() => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="banner-carousel">
            <div className="banner-carousel__container">
                <div className="banner-carousel__track" ref={scrollRef}>
                    {banners.map((banner) => (
                        <a
                            href={banner.link}
                            key={banner.id}
                            className="banner-card"
                        >
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="banner-card__image"
                            />
                            <div className="banner-card__overlay">
                                <div className="banner-card__content">
                                    <span className="banner-card__subtitle">{banner.subtitle}</span>
                                    <h3 className="banner-card__title">{banner.title}</h3>
                                    <button className="banner-card__btn">{banner.cta}</button>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Dots indicator */}
                <div className="banner-carousel__dots">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            className={`banner-carousel__dot ${index === currentIndex ? 'banner-carousel__dot--active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BannerCarousel;
