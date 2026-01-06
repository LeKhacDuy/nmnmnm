import { useRef } from 'react';

const destinations = [
    {
        id: 'anywhere',
        name: 'Bất cứ đâu',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop',
        badge: null,
        featured: true
    },
    {
        id: 'bangkok',
        name: 'Băng Cốc',
        image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=300&h=200&fit=crop',
        badge: 'Chặng ngắn'
    },
    {
        id: 'bali',
        name: 'Bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop',
        badge: 'Chặng trung bình'
    },
    {
        id: 'moscow',
        name: 'Mát-xcơ-va',
        image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=300&h=200&fit=crop',
        badge: 'Chặng dài'
    },
    {
        id: 'manila',
        name: 'Manila',
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=300&h=200&fit=crop',
        badge: 'Chặng ngắn'
    },
    {
        id: 'tokyo',
        name: 'Tokyo',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=200&fit=crop',
        badge: 'Chặng trung bình'
    },
];

function DestinationCarousel() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="destination-carousel">
            <div className="destination-carousel__container">
                <h2 className="destination-carousel__title">
                    Tìm cảm hứng cho chuyến đi tiếp theo của bạn
                </h2>

                <div className="destination-carousel__wrapper">
                    <button
                        className="destination-carousel__nav destination-carousel__nav--left"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        ‹
                    </button>

                    <div className="destination-carousel__track" ref={scrollRef}>
                        {destinations.map((dest) => (
                            <a
                                href={`/destination/${dest.id}`}
                                key={dest.id}
                                className={`destination-card ${dest.featured ? 'destination-card--featured' : ''}`}
                            >
                                {!dest.featured && (
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="destination-card__image"
                                    />
                                )}
                                {dest.featured && (
                                    <div className="destination-card__globe">
                                        <img
                                            src={dest.image}
                                            alt={dest.name}
                                            className="destination-card__image"
                                        />
                                    </div>
                                )}
                                <div className="destination-card__content">
                                    {dest.badge && (
                                        <span className="destination-card__badge">{dest.badge}</span>
                                    )}
                                    <span className="destination-card__name">{dest.name}</span>
                                </div>
                            </a>
                        ))}
                    </div>

                    <button
                        className="destination-carousel__nav destination-carousel__nav--right"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DestinationCarousel;
