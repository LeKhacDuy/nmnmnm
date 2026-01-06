// Hệ khu vực địa lý - Location Data
export const provinces = [
    { id: 'hanoi', name: 'Hà Nội' },
    { id: 'hcm', name: 'TP. Hồ Chí Minh' },
    { id: 'danang', name: 'Đà Nẵng' },
    { id: 'haiphong', name: 'Hải Phòng' },
    { id: 'cantho', name: 'Cần Thơ' },
    { id: 'bienhoa', name: 'Biên Hòa' },
    { id: 'nhatrang', name: 'Nha Trang' },
    { id: 'dalat', name: 'Đà Lạt' },
    { id: 'vungtau', name: 'Vũng Tàu' },
    { id: 'hue', name: 'Huế' }
];

export const districts = {
    hanoi: [
        { id: 'hoankiem', name: 'Quận Hoàn Kiếm' },
        { id: 'badinh', name: 'Quận Ba Đình' },
        { id: 'dongda', name: 'Quận Đống Đa' },
        { id: 'haibatrung', name: 'Quận Hai Bà Trưng' },
        { id: 'caugiay', name: 'Quận Cầu Giấy' },
        { id: 'thanxuan', name: 'Quận Thanh Xuân' },
        { id: 'longbien', name: 'Quận Long Biên' },
        { id: 'tayho', name: 'Quận Tây Hồ' }
    ],
    hcm: [
        { id: 'quan1', name: 'Quận 1' },
        { id: 'quan2', name: 'Quận 2' },
        { id: 'quan3', name: 'Quận 3' },
        { id: 'quan4', name: 'Quận 4' },
        { id: 'quan5', name: 'Quận 5' },
        { id: 'quan7', name: 'Quận 7' },
        { id: 'binhtan', name: 'Quận Bình Tân' },
        { id: 'binhthanh', name: 'Quận Bình Thạnh' },
        { id: 'govap', name: 'Quận Gò Vấp' },
        { id: 'tanbinh', name: 'Quận Tân Bình' },
        { id: 'phunhuan', name: 'Quận Phú Nhuận' },
        { id: 'thuduc', name: 'TP. Thủ Đức' }
    ],
    danang: [
        { id: 'haichau', name: 'Quận Hải Châu' },
        { id: 'thanhkhe', name: 'Quận Thanh Khê' },
        { id: 'sontra', name: 'Quận Sơn Trà' },
        { id: 'nguhanhson', name: 'Quận Ngũ Hành Sơn' },
        { id: 'lienchieu', name: 'Quận Liên Chiểu' },
        { id: 'camle', name: 'Quận Cẩm Lệ' }
    ],
    haiphong: [
        { id: 'hongbang', name: 'Quận Hồng Bàng' },
        { id: 'ngoquyen', name: 'Quận Ngô Quyền' },
        { id: 'lechan', name: 'Quận Lê Chân' },
        { id: 'kienan', name: 'Quận Kiến An' }
    ],
    cantho: [
        { id: 'ninhkieu', name: 'Quận Ninh Kiều' },
        { id: 'binhthuy', name: 'Quận Bình Thủy' },
        { id: 'cainang', name: 'Quận Cái Răng' },
        { id: 'omon', name: 'Quận Ô Môn' }
    ]
};

export const wards = {
    hoankiem: [
        { id: 'hangbac', name: 'Phường Hàng Bạc' },
        { id: 'hangbo', name: 'Phường Hàng Bồ' },
        { id: 'hangbuom', name: 'Phường Hàng Buồm' },
        { id: 'hangdao', name: 'Phường Hàng Đào' },
        { id: 'hanggai', name: 'Phường Hàng Gai' }
    ],
    quan1: [
        { id: 'bennieng', name: 'Phường Bến Nghé' },
        { id: 'benthanh', name: 'Phường Bến Thành' },
        { id: 'codgiang', name: 'Phường Cô Giang' },
        { id: 'daninhchieu', name: 'Phường Đa Kao' },
        { id: 'nguyencukieng', name: 'Phường Nguyễn Cư Trinh' }
    ]
};

// Bán kính tìm kiếm
export const radiusOptions = [
    { value: 1, label: '1 km' },
    { value: 3, label: '3 km' },
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' }
];
