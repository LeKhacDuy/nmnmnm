import { Link, useNavigate } from 'react-router-dom';
import categoriesData from '../data/categoriesData';
import { useLanguage } from '../context/LanguageContext';
import BlogSection from './BlogSection';
import DealsSection from './DealsSection';
import CommunityGallery from './CommunityGallery';

// Translations for category data
const categoryTranslations = {
    en: {
        // Categories
        'an-uong': { name: 'Food & Drink', title: 'Find dining places by preference', subtitle: 'We have every experience you love' },
        'ca-phe': { name: 'Coffee', title: 'Discover amazing coffee shops', subtitle: 'From workspaces to romantic dates' },
        'lam-dep': { name: 'Beauty', title: 'Top beauty services', subtitle: 'Self-care from A to Z' },
        'y-te': { name: 'Healthcare', title: 'Healthcare & Wellness', subtitle: 'Comprehensive health care' },
        'khach-san': { name: 'Hotels', title: 'Luxury stays', subtitle: 'Premium accommodation experiences' },
        'luu-tru': { name: 'Accommodation', title: 'Convenient stays', subtitle: 'Diverse options for every budget' },
        'sua-chua': { name: 'Repair', title: 'Professional repair services', subtitle: 'Fast, reliable, affordable' },
        'cuu-ho': { name: 'Rescue', title: '24/7 rescue services', subtitle: 'Emergency support anytime, anywhere' },
        'the-thao': { name: 'Sports', title: 'Sports & Fitness', subtitle: 'Train your health every day' },
        'giao-duc': { name: 'Education', title: 'Education & Training', subtitle: 'Enhance knowledge, grow yourself' },
        'gia-dinh': { name: 'Family', title: 'Family services', subtitle: 'Take care of your home' },
        'di-chuyen': { name: 'Transportation', title: 'Transportation services', subtitle: 'Safe and convenient travel' },
        // Subcategories
        'nha-hang': 'Restaurants', 'quan-an': 'Eateries', 'an-vat': 'Street food', 'buffet': 'Buffet',
        'cafe-view': 'Scenic Café', 'cafe-lam-viec': 'Work Café', 'cafe-san-vuon': 'Garden Café', 'cafe-acoustic': 'Acoustic Café',
        'spa': 'Spa', 'salon-toc': 'Hair salon', 'nail': 'Nail', 'massage': 'Massage',
        'benh-vien': 'Hospital', 'phong-kham': 'Clinic', 'nha-khoa': 'Dentist', 'nha-thuoc': 'Pharmacy',
        'khach-san-5-sao': '5 Star', 'khach-san-4-sao': '4 Star', 'resort': 'Resort', 'boutique': 'Boutique',
        'homestay': 'Homestay', 'can-ho': 'Apartment', 'nha-nghi': 'Guesthouse', 'hostel': 'Hostel',
        'dien-tu': 'Electronics', 'o-to': 'Car', 'xe-may': 'Motorbike', 'dien-lanh': 'AC & Appliances',
        'cuu-ho-xe': 'Tow truck', 'cap-cuu': 'Emergency', 'chua-chay': 'Fire', 'khoa-cua': 'Locksmith',
        'gym': 'Gym', 'yoga': 'Yoga', 'boi-loi': 'Swimming', 'tennis': 'Tennis',
        'ngoai-ngu': 'Languages', 'ky-nang': 'Skills', 'am-nhac': 'Music', 'hoi-hoa': 'Art',
        'giup-viec': 'Housekeeping', 'trong-tre': 'Babysitter', 'cham-soc-nguoi-gia': 'Elder care', 'thu-cung': 'Pets',
        'taxi': 'Taxi', 'thue-xe': 'Car rental', 'xe-khach': 'Bus', 'giao-hang': 'Delivery',
    }
};

function SubcategorySection({ category }) {
    const { language } = useLanguage();
    const navigate = useNavigate();

    // Get translated category info
    const getCategoryTitle = () => {
        if (language === 'en' && categoryTranslations.en[category.id]) {
            return categoryTranslations.en[category.id].title;
        }
        return category.title;
    };

    const getCategorySubtitle = () => {
        if (language === 'en' && categoryTranslations.en[category.id]) {
            return categoryTranslations.en[category.id].subtitle;
        }
        return category.subtitle;
    };

    const getSubcategoryName = (sub) => {
        if (language === 'en' && categoryTranslations.en[sub.id]) {
            return categoryTranslations.en[sub.id];
        }
        return sub.name;
    };

    // Handle click - navigate to search with subcategory name
    const handleSubcategoryClick = (sub) => {
        const searchKeyword = getSubcategoryName(sub);
        navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
    };

    return (
        <section className="subcategory-section">
            <div className="subcategory-section__container">
                <h2 className="subcategory-section__title">
                    {getCategoryTitle()}
                </h2>
                <p className="subcategory-section__subtitle">
                    {getCategorySubtitle()}
                </p>

                <div className="subcategory-section__grid">
                    {category.subcategories.map((sub) => (
                        <div
                            key={sub.id}
                            className="subcategory-card"
                            onClick={() => handleSubcategoryClick(sub)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={sub.image}
                                alt={getSubcategoryName(sub)}
                                className="subcategory-card__image"
                            />
                            <div className="subcategory-card__content">
                                <span className="subcategory-card__name">{getSubcategoryName(sub)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Section insertion indices (0-indexed)
const BLOG_INSERT_AFTER_INDEX = 3;   // After Y tế (4th category)
const DEALS_INSERT_AFTER_INDEX = 5;  // After Lưu trú (6th category)
const GALLERY_INSERT_AFTER_INDEX = 8; // After Thể thao (9th category)

function AllSubcategorySections() {
    return (
        <>
            {categoriesData.map((category, index) => (
                <div key={category.id}>
                    <SubcategorySection category={category} />
                    {index === BLOG_INSERT_AFTER_INDEX && <BlogSection />}
                    {index === DEALS_INSERT_AFTER_INDEX && <DealsSection />}
                    {index === GALLERY_INSERT_AFTER_INDEX && <CommunityGallery />}
                </div>
            ))}
        </>
    );
}

export { SubcategorySection, AllSubcategorySections };
export default AllSubcategorySections;
