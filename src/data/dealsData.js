// Deals & Promotions data
const dealsData = [
    {
        id: 1,
        title: {
            vi: 'Giảm 50% Buffet Hải Sản',
            en: '50% Off Seafood Buffet'
        },
        description: {
            vi: 'Áp dụng cho tất cả các ngày trong tuần',
            en: 'Valid for all days of the week'
        },
        discount: 50,
        originalPrice: 599000,
        salePrice: 299000,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
        category: { vi: 'Ăn uống', en: 'Food' },
        validUntil: '2026-01-31',
        partnerName: 'Ocean Palace',
        partnerLogo: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=100&h=100&fit=crop'
    },
    {
        id: 2,
        title: {
            vi: 'Spa Trọn Gói 399K',
            en: 'Full Spa Package 399K'
        },
        description: {
            vi: 'Massage + Xông hơi + Đắp mặt nạ',
            en: 'Massage + Sauna + Face mask'
        },
        discount: 40,
        originalPrice: 650000,
        salePrice: 399000,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop',
        category: { vi: 'Làm đẹp', en: 'Beauty' },
        validUntil: '2026-02-14',
        partnerName: 'Zen Spa',
        partnerLogo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100&h=100&fit=crop'
    },
    {
        id: 3,
        title: {
            vi: 'Khách Sạn 5* Chỉ 999K/Đêm',
            en: '5* Hotel Only 999K/Night'
        },
        description: {
            vi: 'Bao gồm ăn sáng cho 2 người',
            en: 'Breakfast included for 2'
        },
        discount: 35,
        originalPrice: 1500000,
        salePrice: 999000,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        category: { vi: 'Khách sạn', en: 'Hotels' },
        validUntil: '2026-01-20',
        partnerName: 'Grand Hotel',
        partnerLogo: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=100&h=100&fit=crop'
    },
    {
        id: 4,
        title: {
            vi: 'Gym 1 Tháng Free',
            en: '1 Month Gym Free'
        },
        description: {
            vi: 'Đăng ký gói 6 tháng tặng thêm 1 tháng',
            en: 'Sign up 6 months, get 1 month free'
        },
        discount: 15,
        originalPrice: 2100000,
        salePrice: 1800000,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
        category: { vi: 'Thể thao', en: 'Sports' },
        validUntil: '2026-02-28',
        partnerName: 'FitLife Gym',
        partnerLogo: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=100&h=100&fit=crop'
    },
    {
        id: 5,
        title: {
            vi: 'Cà Phê Mua 1 Tặng 1',
            en: 'Coffee Buy 1 Get 1'
        },
        description: {
            vi: 'Áp dụng mọi size, mọi loại đồ uống',
            en: 'All sizes, all drinks'
        },
        discount: 50,
        originalPrice: 90000,
        salePrice: 45000,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
        category: { vi: 'Cà phê', en: 'Coffee' },
        validUntil: '2026-01-15',
        partnerName: 'Bean & Leaf',
        partnerLogo: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=100&h=100&fit=crop'
    },
    {
        id: 6,
        title: {
            vi: 'Rửa Xe + Đánh Bóng 99K',
            en: 'Car Wash + Polish 99K'
        },
        description: {
            vi: 'Giá gốc 250K, tiết kiệm 60%',
            en: 'Original 250K, save 60%'
        },
        discount: 60,
        originalPrice: 250000,
        salePrice: 99000,
        image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&h=400&fit=crop',
        category: { vi: 'Sửa chữa', en: 'Repair' },
        validUntil: '2026-01-25',
        partnerName: 'AutoCare Pro',
        partnerLogo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=100&fit=crop'
    },
    {
        id: 7,
        title: {
            vi: 'Học Tiếng Anh 50% Off',
            en: 'Learn English 50% Off'
        },
        description: {
            vi: 'Gói 3 tháng kèm giáo viên bản ngữ',
            en: '3-month package with native teachers'
        },
        discount: 50,
        originalPrice: 6000000,
        salePrice: 3000000,
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
        category: { vi: 'Giáo dục', en: 'Education' },
        validUntil: '2026-02-10',
        partnerName: 'English Hub',
        partnerLogo: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=100&h=100&fit=crop'
    },
    {
        id: 8,
        title: {
            vi: 'Khám Nha Khoa Miễn Phí',
            en: 'Free Dental Checkup'
        },
        description: {
            vi: 'Tặng vé khám khi đặt lịch online',
            en: 'Free checkup when booking online'
        },
        discount: 100,
        originalPrice: 200000,
        salePrice: 0,
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
        category: { vi: 'Y tế', en: 'Healthcare' },
        validUntil: '2026-01-31',
        partnerName: 'Smile Dental',
        partnerLogo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=100&h=100&fit=crop'
    }
];

export default dealsData;
