import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Category data with images and translations
const categoriesData = [
    {
        id: 'an-uong',
        nameVi: 'Ăn uống',
        nameEn: 'Food & Drink',
        icon: '🍜',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop',
        groups: ['Quán ăn', 'Nhà hàng', 'Đồ ăn nhanh', 'Quán nhậu', 'Quán chay', 'Quán hải sản'],
        subcategories: ['Quán cơm', 'Quán phở', 'Bún – miến', 'Cơm tấm', 'Bánh mì', 'Lẩu – nướng', 'Hải sản tươi sống', 'Quán ăn gia đình']
    },
    {
        id: 'ca-phe',
        nameVi: 'Cà phê',
        nameEn: 'Coffee',
        icon: '☕',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=400&fit=crop',
        groups: ['Cà phê', 'Trà sữa', 'Đồ uống'],
        subcategories: ['Quán cà phê', 'Cà phê máy', 'Cà phê take away', 'Trà sữa', 'Trà trái cây']
    },
    {
        id: 'lam-dep',
        nameVi: 'Làm đẹp',
        nameEn: 'Beauty',
        icon: '💇',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=400&fit=crop',
        groups: ['Spa', 'Salon tóc', 'Nail – mi'],
        subcategories: ['Spa chăm sóc da', 'Spa massage', 'Cắt tóc nam', 'Làm tóc nữ', 'Nail', 'Nối mi', 'Phun xăm thẩm mỹ']
    },
    {
        id: 'y-te',
        nameVi: 'Y tế',
        nameEn: 'Healthcare',
        icon: '🏥',
        image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=400&fit=crop',
        groups: ['Nha khoa', 'Phòng khám', 'Y tế tư nhân'],
        subcategories: ['Nha khoa tổng quát', 'Nha khoa thẩm mỹ', 'Phòng khám đa khoa', 'Phòng khám nhi', 'Phòng khám sản', 'Nhà thuốc']
    },
    {
        id: 'khach-san',
        nameVi: 'Khách sạn',
        nameEn: 'Hotels',
        icon: '🏨',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=400&fit=crop',
        groups: ['Khách sạn', 'Nhà nghỉ'],
        subcategories: ['Khách sạn 1–5 sao', 'Nhà nghỉ bình dân', 'Khách sạn mini']
    },
    {
        id: 'luu-tru',
        nameVi: 'Lưu trú',
        nameEn: 'Accommodation',
        icon: '🏠',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=400&fit=crop',
        groups: ['Homestay', 'Căn hộ'],
        subcategories: ['Homestay', 'Căn hộ dịch vụ', 'Cho thuê ngắn ngày']
    },
    {
        id: 'sua-chua',
        nameVi: 'Sửa chữa',
        nameEn: 'Repair',
        icon: '🔧',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop',
        groups: ['Điện nước', 'Điện lạnh', 'Sửa đồ gia dụng'],
        subcategories: ['Sửa điện nước', 'Sửa máy lạnh', 'Sửa tủ lạnh', 'Sửa máy giặt', 'Sửa thiết bị gia đình']
    },
    {
        id: 'cuu-ho',
        nameVi: 'Cứu hộ',
        nameEn: 'Rescue',
        icon: '🚨',
        image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=800&h=400&fit=crop',
        groups: ['Cứu hộ xe', 'Cứu hộ khẩn cấp'],
        subcategories: ['Cứu hộ xe máy', 'Cứu hộ ô tô', 'Vá xe lưu động', 'Kéo xe']
    },
    {
        id: 'the-thao',
        nameVi: 'Thể thao',
        nameEn: 'Sports',
        icon: '🏋️',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
        groups: ['Gym', 'Yoga', 'Thể hình'],
        subcategories: ['Phòng gym', 'Yoga', 'Fitness', 'Boxing']
    },
    {
        id: 'giao-duc',
        nameVi: 'Giáo dục',
        nameEn: 'Education',
        icon: '🎓',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
        groups: ['Trung tâm học tập', 'Đào tạo kỹ năng'],
        subcategories: ['Trung tâm ngoại ngữ', 'Trung tâm tin học', 'Lớp học thêm', 'Trung tâm kỹ năng mềm']
    },
    {
        id: 'gia-dinh',
        nameVi: 'Gia đình',
        nameEn: 'Family',
        icon: '🏡',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop',
        groups: ['Dịch vụ nhà cửa', 'Dịch vụ cá nhân'],
        subcategories: ['Giặt ủi', 'Giúp việc', 'Dọn nhà', 'Sửa nhà nhỏ']
    },
    {
        id: 'di-chuyen',
        nameVi: 'Di chuyển',
        nameEn: 'Transportation',
        icon: '🚗',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop',
        groups: ['Thuê xe', 'Vận chuyển'],
        subcategories: ['Thuê xe máy', 'Thuê ô tô', 'Taxi', 'Xe công nghệ']
    },
];

function CategoryPage() {
    const { categoryId } = useParams();
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Find the category
    const category = categoriesData.find(cat => cat.id === categoryId);

    if (!category) {
        return (
            <div className="category-page category-page--not-found">
                <div className="category-page__container">
                    <h1>Không tìm thấy danh mục</h1>
                    <button onClick={() => navigate('/')}>Về trang chủ</button>
                </div>
            </div>
        );
    }

    const getName = () => language === 'en' ? category.nameEn : category.nameVi;

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(getName())}`);
        }
    };

    // Handle subcategory click - navigate to search
    const handleSubcategoryClick = (subcategory) => {
        navigate(`/search?q=${encodeURIComponent(subcategory)}`);
    };

    // Handle group click
    const handleGroupClick = (group) => {
        navigate(`/search?q=${encodeURIComponent(group)}`);
    };

    return (
        <div className="category-page">
            {/* Hero Banner */}
            <div className="category-page__hero" style={{ backgroundImage: `url(${category.image})` }}>
                <div className="category-page__hero-overlay">
                    <div className="category-page__hero-content">
                        <span className="category-page__icon">{category.icon}</span>
                        <h1 className="category-page__title">{getName()}</h1>
                        <p className="category-page__subtitle">
                            {language === 'en'
                                ? `Discover ${category.subcategories.length}+ services near you`
                                : `Khám phá ${category.subcategories.length}+ dịch vụ gần bạn`
                            }
                        </p>

                        {/* Search Bar */}
                        <form className="category-page__search" onSubmit={handleSearch}>
                            <span className="category-page__search-icon">🔍</span>
                            <input
                                type="text"
                                className="category-page__search-input"
                                placeholder={language === 'en'
                                    ? `Search in ${getName()}...`
                                    : `Tìm kiếm trong ${getName()}...`
                                }
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="category-page__search-submit">
                                {language === 'en' ? 'Search' : 'Tìm kiếm'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="category-page__container">
                {/* Groups Section */}
                <section className="category-page__section">
                    <h2 className="category-page__section-title">
                        {language === 'en' ? 'Categories' : 'Nhóm ngành'}
                    </h2>
                    <div className="category-page__groups">
                        {category.groups.map((group, index) => (
                            <button
                                key={index}
                                className="category-page__group-btn"
                                onClick={() => handleGroupClick(group)}
                            >
                                {group}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Subcategories Section */}
                <section className="category-page__section">
                    <h2 className="category-page__section-title">
                        {language === 'en' ? 'Services' : 'Dịch vụ chi tiết'}
                    </h2>
                    <div className="category-page__subcategories">
                        {category.subcategories.map((sub, index) => (
                            <div
                                key={index}
                                className="category-page__subcategory-card"
                                onClick={() => handleSubcategoryClick(sub)}
                            >
                                <span className="category-page__subcategory-name">{sub}</span>
                                <span className="category-page__subcategory-arrow">→</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Search CTA */}
                <section className="category-page__cta">
                    <button
                        className="category-page__search-btn"
                        onClick={() => navigate(`/search?q=${encodeURIComponent(getName())}`)}
                    >
                        {language === 'en'
                            ? `Search all ${getName()} near me`
                            : `Tìm tất cả ${getName()} gần tôi`
                        }
                    </button>
                </section>
            </div>
        </div>
    );
}

export default CategoryPage;
