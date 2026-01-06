import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Hot tags in both languages
const hotTagsData = {
    vi: [
        { icon: '🔥', label: 'Phở Hà Nội' },
        { icon: '☕', label: 'Café view đẹp' },
        { icon: '🍜', label: 'Bún chả' },
        { icon: '🏨', label: 'Khách sạn 5 sao' },
        { icon: '💆', label: 'Spa gần đây' },
        { icon: '🍻', label: 'Quán nhậu' },
        { icon: '🎬', label: 'Rạp chiếu phim' },
        { icon: '🏋️', label: 'Phòng gym' },
        { icon: '🍰', label: 'Tiệm bánh ngọt' },
        { icon: '🍣', label: 'Sushi Nhật Bản' },
    ],
    en: [
        { icon: '🔥', label: 'Pho Hanoi' },
        { icon: '☕', label: 'Scenic Café' },
        { icon: '🍜', label: 'Bun Cha' },
        { icon: '🏨', label: '5-star Hotels' },
        { icon: '💆', label: 'Nearby Spa' },
        { icon: '🍻', label: 'Bars & Pubs' },
        { icon: '🎬', label: 'Movie Theaters' },
        { icon: '🏋️', label: 'Gyms' },
        { icon: '🍰', label: 'Bakeries' },
        { icon: '🍣', label: 'Japanese Sushi' },
    ]
};

function StickyTags() {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const hotTags = hotTagsData[language] || hotTagsData.vi;

    // Handle tag click - navigate to search with tag label
    const handleTagClick = (tag) => {
        navigate(`/search?q=${encodeURIComponent(tag.label)}`);
    };

    return (
        <div className="sticky-tags">
            <div className="sticky-tags__container">
                <div className="sticky-tags__track">
                    {hotTags.map((tag, index) => (
                        <button
                            key={index}
                            className="sticky-tags__tag"
                            onClick={() => handleTagClick(tag)}
                        >
                            <span className="sticky-tags__tag-icon">{tag.icon}</span>
                            <span>{tag.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StickyTags;
