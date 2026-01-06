import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Category data with images and translations
const categoriesData = [
    {
        id: 'an-uong',
        nameVi: 'Ăn uống',
        nameEn: 'Food & Drink',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop'
    },
    {
        id: 'ca-phe',
        nameVi: 'Cà phê',
        nameEn: 'Coffee',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop'
    },
    {
        id: 'lam-dep',
        nameVi: 'Làm đẹp',
        nameEn: 'Beauty',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop'
    },
    {
        id: 'y-te',
        nameVi: 'Y tế',
        nameEn: 'Healthcare',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop'
    },
    {
        id: 'khach-san',
        nameVi: 'Khách sạn',
        nameEn: 'Hotels',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop'
    },
    {
        id: 'luu-tru',
        nameVi: 'Lưu trú',
        nameEn: 'Accommodation',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop'
    },
    {
        id: 'sua-chua',
        nameVi: 'Sửa chữa',
        nameEn: 'Repair',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=300&h=200&fit=crop'
    },
    {
        id: 'cuu-ho',
        nameVi: 'Cứu hộ',
        nameEn: 'Rescue',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=300&h=200&fit=crop'
    },
    {
        id: 'the-thao',
        nameVi: 'Thể thao',
        nameEn: 'Sports',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop'
    },
    {
        id: 'giao-duc',
        nameVi: 'Giáo dục',
        nameEn: 'Education',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop'
    },
    {
        id: 'gia-dinh',
        nameVi: 'Gia đình',
        nameEn: 'Family',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'
    },
    {
        id: 'di-chuyen',
        nameVi: 'Di chuyển',
        nameEn: 'Transportation',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop'
    },
];

function CategoryGrid() {
    const { language } = useLanguage();
    const navigate = useNavigate();

    const getName = (cat) => {
        return language === 'en' ? cat.nameEn : cat.nameVi;
    };

    // Handle click - navigate to category page
    const handleCategoryClick = (cat) => {
        navigate(`/danh-muc/${cat.id}`);
    };

    return (
        <section className="category-grid">
            <div className="category-grid__container">
                <div className="category-grid__items">
                    {categoriesData.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            onClick={() => handleCategoryClick(cat)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={cat.image}
                                alt={getName(cat)}
                                className="category-card__image"
                            />
                            <div className="category-card__content">
                                <span className="category-card__name">{getName(cat)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoryGrid;
