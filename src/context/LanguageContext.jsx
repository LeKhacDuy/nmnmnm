import { createContext, useContext, useState, useCallback } from 'react';

// Translations for the app
const translations = {
    vi: {
        // Header
        nearMe: 'Gần tôi',
        nearby: 'Gần đây',
        closest: 'Gần nhất',
        openNow: 'Đang mở',
        emergency: 'Khẩn cấp',
        services: 'Dịch vụ',
        region: 'Khu vực',
        login: 'Đăng nhập',
        search: 'Tìm kiếm',
        change: 'Thay đổi',

        // Hero
        heroTitle: 'Đi đâu?',
        searchPlaceholder: 'Địa điểm tham quan, hoạt động giải trí, khách sạn...',
        searchBtn: 'Tìm kiếm',

        // Categories
        searchAll: 'Tìm kiếm tất cả',
        hotel: 'Khách sạn',
        activity: 'Hoạt động giải trí',
        restaurant: 'Nhà hàng',

        // Location Modal
        whereAreYou: 'Bạn đang ở đâu?',
        allowLocation: 'Cho phép NearMe biết vị trí của bạn',
        forBetterResults: 'để tìm kiếm chính xác hơn',
        searching: 'Đang tìm',
        useGPS: '📡 Sử dụng GPS',
        gettingLocation: '⏳ Đang lấy vị trí...',
        enterManually: '✏️ Nhập địa chỉ thủ công',
        enterAddress: 'Nhập địa chỉ',
        back: 'Quay lại',
        province: 'Tỉnh / Thành phố',
        district: 'Quận / Huyện',
        ward: 'Phường / Xã',
        road: 'Số nhà, tên đường',
        optional: 'Tùy chọn',
        roadExample: 'Ví dụ: 123 Nguyễn Huệ',
        selectProvince: 'Chọn Tỉnh/Thành',
        selectDistrict: 'Chọn Quận/Huyện',
        selectWard: 'Chọn Phường/Xã',
        confirm: 'Xác nhận vị trí',
        gpsError: 'Không thể lấy vị trí GPS. Vui lòng thử nhập tay.',
        selectProvinceDistrictRequired: 'Vui lòng chọn ít nhất Tỉnh/Thành và Quận/Huyện',

        // Search Page
        searchResults: 'Kết quả tìm kiếm',
        searchFor: 'Tìm',
        onPlatforms: 'trên',
        platforms: 'nền tảng',
        changeLocation: 'Đổi vị trí',
        selectLocationToSearch: 'Chọn vị trí để tìm kiếm',
        startSearch: 'Bắt đầu tìm kiếm',
        searchHint: 'Nhập từ khóa để tìm kiếm địa điểm, dịch vụ gần bạn',

        // Platform Groups
        aiAssistant: 'Trợ lý AI',
        mapsPlaces: 'Bản đồ & Địa điểm',
        socialReview: 'Social & Review',
        shopping: 'Mua sắm',
        foodDelivery: 'Đặt đồ ăn',
        travel: 'Du lịch',

        // Footer
        aboutUs: 'Về chúng tôi',
        contact: 'Liên hệ',
        privacy: 'Chính sách bảo mật',
        terms: 'Điều khoản sử dụng',

        // Categories
        food: 'Ăn uống',
        coffee: 'Cà phê',
        beauty: 'Làm đẹp',
        healthcare: 'Y tế',
        accommodation: 'Lưu trú',
        repair: 'Sửa chữa',
        rescue: 'Cứu hộ',
        sports: 'Thể thao',
        education: 'Giáo dục',
        family: 'Gia đình',
        transportation: 'Di chuyển',
    },
    en: {
        // Header
        nearMe: 'Near Me',
        nearby: 'Nearby',
        closest: 'Closest',
        openNow: 'Open Now',
        emergency: 'Emergency',
        services: 'Services',
        region: 'Region',
        login: 'Login',
        search: 'Search',
        change: 'Change',

        // Hero
        heroTitle: 'Where to?',
        searchPlaceholder: 'Attractions, activities, hotels...',
        searchBtn: 'Search',

        // Categories
        searchAll: 'Search all',
        hotel: 'Hotels',
        activity: 'Activities',
        restaurant: 'Restaurants',

        // Location Modal
        whereAreYou: 'Where are you?',
        allowLocation: 'Allow NearMe to know your location',
        forBetterResults: 'for better search results',
        searching: 'Searching',
        useGPS: '📡 Use GPS',
        gettingLocation: '⏳ Getting location...',
        enterManually: '✏️ Enter address manually',
        enterAddress: 'Enter address',
        back: 'Back',
        province: 'Province / City',
        district: 'District',
        ward: 'Ward',
        road: 'Street address',
        optional: 'Optional',
        roadExample: 'Example: 123 Main Street',
        selectProvince: 'Select Province/City',
        selectDistrict: 'Select District',
        selectWard: 'Select Ward',
        confirm: 'Confirm location',
        gpsError: 'Could not get GPS location. Please try entering manually.',
        selectProvinceDistrictRequired: 'Please select at least Province and District',

        // Search Page
        searchResults: 'Search Results',
        searchFor: 'Search',
        onPlatforms: 'on',
        platforms: 'platforms',
        changeLocation: 'Change location',
        selectLocationToSearch: 'Select location to search',
        startSearch: 'Start searching',
        searchHint: 'Enter keywords to find places and services near you',

        // Platform Groups
        aiAssistant: 'AI Assistants',
        mapsPlaces: 'Maps & Places',
        socialReview: 'Social & Review',
        shopping: 'Shopping',
        foodDelivery: 'Food Delivery',
        travel: 'Travel',

        // Footer
        aboutUs: 'About Us',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',

        // Categories
        food: 'Food & Drink',
        coffee: 'Coffee',
        beauty: 'Beauty',
        healthcare: 'Healthcare',
        accommodation: 'Accommodation',
        repair: 'Repair',
        rescue: 'Rescue',
        sports: 'Sports',
        education: 'Education',
        family: 'Family',
        transportation: 'Transportation',
    }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Try to get saved language from localStorage
        const saved = localStorage.getItem('nearme_language');
        return saved || 'vi';
    });

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => {
            const newLang = prev === 'vi' ? 'en' : 'vi';
            localStorage.setItem('nearme_language', newLang);
            return newLang;
        });
    }, []);

    const setLang = useCallback((lang) => {
        if (translations[lang]) {
            setLanguage(lang);
            localStorage.setItem('nearme_language', lang);
        }
    }, []);

    const t = useCallback((key) => {
        return translations[language]?.[key] || translations['vi']?.[key] || key;
    }, [language]);

    const value = {
        language,
        toggleLanguage,
        setLanguage: setLang,
        t,
        isVietnamese: language === 'vi',
        isEnglish: language === 'en'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
