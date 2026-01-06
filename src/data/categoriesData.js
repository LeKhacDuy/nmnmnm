// All categories with their subcategories
const categoriesData = [
    {
        id: 'an-uong',
        name: 'Ăn uống',
        title: 'Tìm địa điểm ăn uống theo sở thích',
        subtitle: 'Chúng tôi có mọi trải nghiệm bạn yêu thích',
        subcategories: [
            { id: 'nha-hang', name: 'Nhà hàng', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop' },
            { id: 'quan-an', name: 'Quán ăn', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=500&fit=crop' },
            { id: 'an-vat', name: 'Ăn vặt', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop' },
            { id: 'buffet', name: 'Buffet', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'ca-phe',
        name: 'Cà phê',
        title: 'Khám phá các quán cà phê tuyệt vời',
        subtitle: 'Từ không gian làm việc đến hẹn hò lãng mạn',
        subcategories: [
            { id: 'cafe-view', name: 'Café view đẹp', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=500&fit=crop' },
            { id: 'cafe-lam-viec', name: 'Café làm việc', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=500&fit=crop' },
            { id: 'cafe-san-vuon', name: 'Café sân vườn', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=500&fit=crop' },
            { id: 'cafe-acoustic', name: 'Café acoustic', image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'lam-dep',
        name: 'Làm đẹp',
        title: 'Dịch vụ làm đẹp hàng đầu',
        subtitle: 'Chăm sóc bản thân từ A đến Z',
        subcategories: [
            { id: 'spa', name: 'Spa', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop' },
            { id: 'salon-toc', name: 'Salon tóc', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop' },
            { id: 'nail', name: 'Nail', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop' },
            { id: 'massage', name: 'Massage', image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'y-te',
        name: 'Y tế',
        title: 'Dịch vụ y tế & sức khỏe',
        subtitle: 'Chăm sóc sức khỏe toàn diện',
        subcategories: [
            { id: 'benh-vien', name: 'Bệnh viện', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=500&fit=crop' },
            { id: 'phong-kham', name: 'Phòng khám', image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=500&fit=crop' },
            { id: 'nha-khoa', name: 'Nha khoa', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=500&fit=crop' },
            { id: 'nha-thuoc', name: 'Nhà thuốc', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'khach-san',
        name: 'Khách sạn',
        title: 'Nghỉ dưỡng sang trọng',
        subtitle: 'Trải nghiệm lưu trú đẳng cấp',
        subcategories: [
            { id: 'khach-san-5-sao', name: '5 sao', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=500&fit=crop' },
            { id: 'khach-san-4-sao', name: '4 sao', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=500&fit=crop' },
            { id: 'resort', name: 'Resort', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=500&fit=crop' },
            { id: 'boutique', name: 'Boutique', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'luu-tru',
        name: 'Lưu trú',
        title: 'Nơi ở tiện nghi',
        subtitle: 'Đa dạng lựa chọn phù hợp ngân sách',
        subcategories: [
            { id: 'homestay', name: 'Homestay', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=500&fit=crop' },
            { id: 'can-ho', name: 'Căn hộ', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=500&fit=crop' },
            { id: 'nha-nghi', name: 'Nhà nghỉ', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=500&fit=crop' },
            { id: 'hostel', name: 'Hostel', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'sua-chua',
        name: 'Sửa chữa',
        title: 'Dịch vụ sửa chữa chuyên nghiệp',
        subtitle: 'Nhanh chóng, uy tín, giá hợp lý',
        subcategories: [
            { id: 'dien-tu', name: 'Điện tử', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&h=500&fit=crop' },
            { id: 'o-to', name: 'Ô tô', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=500&fit=crop' },
            { id: 'xe-may', name: 'Xe máy', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop' },
            { id: 'dien-lanh', name: 'Điện lạnh', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'cuu-ho',
        name: 'Cứu hộ',
        title: 'Dịch vụ cứu hộ 24/7',
        subtitle: 'Hỗ trợ khẩn cấp mọi lúc mọi nơi',
        subcategories: [
            { id: 'cuu-ho-xe', name: 'Cứu hộ xe', image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=500&fit=crop' },
            { id: 'cap-cuu', name: 'Cấp cứu', image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=500&fit=crop' },
            { id: 'chua-chay', name: 'Chữa cháy', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop' },
            { id: 'khoa-cua', name: 'Mở khóa', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'the-thao',
        name: 'Thể thao',
        title: 'Thể thao & Fitness',
        subtitle: 'Rèn luyện sức khỏe mỗi ngày',
        subcategories: [
            { id: 'gym', name: 'Phòng gym', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=500&fit=crop' },
            { id: 'yoga', name: 'Yoga', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=500&fit=crop' },
            { id: 'boi-loi', name: 'Bơi lội', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=500&fit=crop' },
            { id: 'tennis', name: 'Tennis', image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'giao-duc',
        name: 'Giáo dục',
        title: 'Giáo dục & Đào tạo',
        subtitle: 'Nâng cao kiến thức, phát triển bản thân',
        subcategories: [
            { id: 'ngoai-ngu', name: 'Ngoại ngữ', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=500&fit=crop' },
            { id: 'ky-nang', name: 'Kỹ năng', image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop' },
            { id: 'am-nhac', name: 'Âm nhạc', image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=500&fit=crop' },
            { id: 'hoi-hoa', name: 'Hội họa', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'gia-dinh',
        name: 'Gia đình',
        title: 'Dịch vụ gia đình',
        subtitle: 'Chăm sóc tổ ấm của bạn',
        subcategories: [
            { id: 'giup-viec', name: 'Giúp việc', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop' },
            { id: 'trong-tre', name: 'Trông trẻ', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=500&fit=crop' },
            { id: 'cham-soc-nguoi-gia', name: 'Chăm sóc người già', image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&h=500&fit=crop' },
            { id: 'thu-cung', name: 'Thú cưng', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=500&fit=crop' },
        ]
    },
    {
        id: 'di-chuyen',
        name: 'Di chuyển',
        title: 'Dịch vụ di chuyển',
        subtitle: 'Đi lại tiện lợi, an toàn',
        subcategories: [
            { id: 'taxi', name: 'Taxi', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=500&fit=crop' },
            { id: 'thue-xe', name: 'Thuê xe', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=500&fit=crop' },
            { id: 'xe-khach', name: 'Xe khách', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=500&fit=crop' },
            { id: 'giao-hang', name: 'Giao hàng', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=500&fit=crop' },
        ]
    },
];

export default categoriesData;
