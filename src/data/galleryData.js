// Community Gallery data - user-submitted photos
const galleryData = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop',
        userName: 'Minh Anh',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        placeName: { vi: 'Nhà hàng Phố Cổ', en: 'Old Quarter Restaurant' },
        placeCategory: { vi: 'Ăn uống', en: 'Food' },
        likes: 234,
        comments: 18
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop',
        userName: 'Hoàng Long',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        placeName: { vi: 'The Coffee House', en: 'The Coffee House' },
        placeCategory: { vi: 'Cà phê', en: 'Coffee' },
        likes: 189,
        comments: 24
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=750&fit=crop',
        userName: 'Thu Hà',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        placeName: { vi: 'Lavender Spa', en: 'Lavender Spa' },
        placeCategory: { vi: 'Làm đẹp', en: 'Beauty' },
        likes: 312,
        comments: 45
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=700&fit=crop',
        userName: 'Đức Minh',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        placeName: { vi: 'Vinpearl Resort', en: 'Vinpearl Resort' },
        placeCategory: { vi: 'Khách sạn', en: 'Hotels' },
        likes: 567,
        comments: 89
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=600&fit=crop',
        userName: 'Lan Phương',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        placeName: { vi: 'Pizza 4P\'s', en: 'Pizza 4P\'s' },
        placeCategory: { vi: 'Ăn uống', en: 'Food' },
        likes: 421,
        comments: 56
    },
    {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop',
        userName: 'Quốc Bảo',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        placeName: { vi: 'California Fitness', en: 'California Fitness' },
        placeCategory: { vi: 'Thể thao', en: 'Sports' },
        likes: 178,
        comments: 12
    },
    {
        id: 7,
        imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=650&fit=crop',
        userName: 'Mai Chi',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        placeName: { vi: 'Katinat Sài Gòn', en: 'Katinat Saigon' },
        placeCategory: { vi: 'Cà phê', en: 'Coffee' },
        likes: 289,
        comments: 34
    },
    {
        id: 8,
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=750&fit=crop',
        userName: 'Thảo Vy',
        userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
        placeName: { vi: 'Hair Salon Tony', en: 'Hair Salon Tony' },
        placeCategory: { vi: 'Làm đẹp', en: 'Beauty' },
        likes: 156,
        comments: 21
    },
    {
        id: 9,
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=600&fit=crop',
        userName: 'Việt Hoàng',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
        placeName: { vi: 'Quán Bún Chả Hà Nội', en: 'Hanoi Bun Cha' },
        placeCategory: { vi: 'Ăn uống', en: 'Food' },
        likes: 445,
        comments: 67
    },
    {
        id: 10,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=700&fit=crop',
        userName: 'Hạnh Nguyên',
        userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
        placeName: { vi: 'Yoga Luna', en: 'Yoga Luna' },
        placeCategory: { vi: 'Thể thao', en: 'Sports' },
        likes: 267,
        comments: 38
    },
    {
        id: 11,
        imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=800&fit=crop',
        userName: 'Tuấn Anh',
        userAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
        placeName: { vi: 'Mường Thanh Hotel', en: 'Muong Thanh Hotel' },
        placeCategory: { vi: 'Khách sạn', en: 'Hotels' },
        likes: 334,
        comments: 29
    },
    {
        id: 12,
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=650&fit=crop',
        userName: 'Ngọc Trâm',
        userAvatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
        placeName: { vi: 'Wrap & Roll', en: 'Wrap & Roll' },
        placeCategory: { vi: 'Ăn uống', en: 'Food' },
        likes: 198,
        comments: 15
    }
];

export default galleryData;
