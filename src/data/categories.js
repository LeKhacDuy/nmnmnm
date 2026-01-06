// Danh mục ngành dịch vụ - Categories Data
// Cấu trúc: 12 nhóm ngành chính với nhóm ngành con và ngành con chi tiết

export const categories = [
    {
        id: 'an-uong',
        name: 'Ăn uống',
        icon: '🍜',
        groups: ['Quán ăn', 'Nhà hàng', 'Đồ ăn nhanh', 'Quán nhậu', 'Quán chay', 'Quán hải sản'],
        subcategories: ['Quán cơm', 'Quán phở', 'Bún – miến', 'Cơm tấm', 'Bánh mì', 'Lẩu – nướng', 'Hải sản tươi sống', 'Quán ăn gia đình']
    },
    {
        id: 'ca-phe',
        name: 'Cà phê',
        icon: '☕',
        groups: ['Cà phê', 'Trà sữa', 'Đồ uống'],
        subcategories: ['Quán cà phê', 'Cà phê máy', 'Cà phê take away', 'Trà sữa', 'Trà trái cây']
    },
    {
        id: 'lam-dep',
        name: 'Làm đẹp',
        icon: '💇',
        groups: ['Spa', 'Salon tóc', 'Nail – mi'],
        subcategories: ['Spa chăm sóc da', 'Spa massage', 'Cắt tóc nam', 'Làm tóc nữ', 'Nail', 'Nối mi', 'Phun xăm thẩm mỹ']
    },
    {
        id: 'y-te',
        name: 'Y tế',
        icon: '🏥',
        groups: ['Nha khoa', 'Phòng khám', 'Y tế tư nhân'],
        subcategories: ['Nha khoa tổng quát', 'Nha khoa thẩm mỹ', 'Phòng khám đa khoa', 'Phòng khám nhi', 'Phòng khám sản', 'Nhà thuốc']
    },
    {
        id: 'khach-san',
        name: 'Khách sạn',
        icon: '🏨',
        groups: ['Khách sạn', 'Nhà nghỉ'],
        subcategories: ['Khách sạn 1–5 sao', 'Nhà nghỉ bình dân', 'Khách sạn mini']
    },
    {
        id: 'luu-tru',
        name: 'Lưu trú',
        icon: '🏠',
        groups: ['Homestay', 'Căn hộ'],
        subcategories: ['Homestay', 'Căn hộ dịch vụ', 'Cho thuê ngắn ngày']
    },
    {
        id: 'sua-chua',
        name: 'Sửa chữa',
        icon: '🔧',
        groups: ['Điện nước', 'Điện lạnh', 'Sửa đồ gia dụng'],
        subcategories: ['Sửa điện nước', 'Sửa máy lạnh', 'Sửa tủ lạnh', 'Sửa máy giặt', 'Sửa thiết bị gia đình']
    },
    {
        id: 'cuu-ho',
        name: 'Cứu hộ',
        icon: '🚨',
        groups: ['Cứu hộ xe', 'Cứu hộ khẩn cấp'],
        subcategories: ['Cứu hộ xe máy', 'Cứu hộ ô tô', 'Vá xe lưu động', 'Kéo xe']
    },
    {
        id: 'the-thao',
        name: 'Thể thao',
        icon: '🏋️',
        groups: ['Gym', 'Yoga', 'Thể hình'],
        subcategories: ['Phòng gym', 'Yoga', 'Fitness', 'Boxing']
    },
    {
        id: 'giao-duc',
        name: 'Giáo dục',
        icon: '🎓',
        groups: ['Trung tâm học tập', 'Đào tạo kỹ năng'],
        subcategories: ['Trung tâm ngoại ngữ', 'Trung tâm tin học', 'Lớp học thêm', 'Trung tâm kỹ năng mềm']
    },
    {
        id: 'gia-dinh',
        name: 'Gia đình',
        icon: '🏡',
        groups: ['Dịch vụ nhà cửa', 'Dịch vụ cá nhân'],
        subcategories: ['Giặt ủi', 'Giúp việc', 'Dọn nhà', 'Sửa nhà nhỏ']
    },
    {
        id: 'di-chuyen',
        name: 'Di chuyển',
        icon: '🚗',
        groups: ['Thuê xe', 'Vận chuyển'],
        subcategories: ['Thuê xe máy', 'Thuê ô tô', 'Taxi', 'Xe công nghệ']
    }
];

// Dịch vụ mẫu - Sample Services
export const sampleServices = [
    {
        id: 1,
        name: 'Phở Thìn Bờ Hồ',
        category: 'Ăn uống',
        categoryId: 'an-uong',
        address: '13 Lò Đúc, Hai Bà Trưng, Hà Nội',
        distance: 0.5,
        rating: 4.8,
        reviewCount: 256,
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
        isOpen: true,
        phone: '024 3821 2529'
    },
    {
        id: 2,
        name: 'The Coffee House',
        category: 'Cà phê',
        categoryId: 'ca-phe',
        address: '86-88 Cao Thắng, Quận 3, TP.HCM',
        distance: 1.2,
        rating: 4.5,
        reviewCount: 189,
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400',
        isOpen: true,
        phone: '1800 6936'
    },
    {
        id: 3,
        name: '30Shine - Cắt tóc nam',
        category: 'Làm đẹp',
        categoryId: 'lam-dep',
        address: '125 Nguyễn Thái Học, Ba Đình, Hà Nội',
        distance: 0.8,
        rating: 4.6,
        reviewCount: 412,
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
        isOpen: true,
        phone: '1900 27 27 30'
    },
    {
        id: 4,
        name: 'California Fitness',
        category: 'Thể thao',
        categoryId: 'the-thao',
        address: '2 Hải Triều, Bến Nghé, Quận 1, TP.HCM',
        distance: 2.1,
        rating: 4.4,
        reviewCount: 567,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
        isOpen: true,
        phone: '028 3821 9889'
    },
    {
        id: 5,
        name: 'Vinmec Times City',
        category: 'Y tế',
        categoryId: 'y-te',
        address: '458 Minh Khai, Hai Bà Trưng, Hà Nội',
        distance: 3.5,
        rating: 4.7,
        reviewCount: 892,
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
        isOpen: true,
        phone: '024 3974 3556'
    },
    {
        id: 6,
        name: 'Cứu hộ xe 24/7',
        category: 'Cứu hộ',
        categoryId: 'cuu-ho',
        address: 'Toàn thành phố Hà Nội',
        distance: 0,
        rating: 4.9,
        reviewCount: 324,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        isOpen: true,
        phone: '0901 234 567'
    }
];
