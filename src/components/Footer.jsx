import { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categoriesData';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState(categoriesData[0].id);

    const activeCategory = categoriesData.find(cat => cat.id === activeTab);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get translated category name
    const getCategoryName = (cat) => {
        const categoryTranslations = {
            vi: {
                'an-uong': 'Ăn uống', 'ca-phe': 'Cà phê', 'lam-dep': 'Làm đẹp',
                'y-te': 'Y tế', 'khach-san': 'Khách sạn', 'luu-tru': 'Lưu trú',
                'sua-chua': 'Sửa chữa', 'cuu-ho': 'Cứu hộ', 'the-thao': 'Thể thao',
                'giao-duc': 'Giáo dục', 'gia-dinh': 'Gia đình', 'di-chuyen': 'Di chuyển'
            },
            en: {
                'an-uong': 'Food & Drink', 'ca-phe': 'Coffee', 'lam-dep': 'Beauty',
                'y-te': 'Healthcare', 'khach-san': 'Hotels', 'luu-tru': 'Accommodation',
                'sua-chua': 'Repair', 'cuu-ho': 'Rescue', 'the-thao': 'Sports',
                'giao-duc': 'Education', 'gia-dinh': 'Family', 'di-chuyen': 'Transportation'
            }
        };
        return categoryTranslations[language]?.[cat.id] || cat.name;
    };

    // City translations
    const cities = language === 'en' ? {
        'ho-chi-minh': 'Ho Chi Minh City',
        'ha-noi': 'Hanoi',
        'da-nang': 'Da Nang',
        'hai-phong': 'Hai Phong',
        'can-tho': 'Can Tho',
        'nha-trang': 'Nha Trang',
        'da-lat': 'Da Lat',
        'vung-tau': 'Vung Tau',
        'hue': 'Hue',
        'phu-quoc': 'Phu Quoc'
    } : {
        'ho-chi-minh': 'TP. Hồ Chí Minh',
        'ha-noi': 'Hà Nội',
        'da-nang': 'Đà Nẵng',
        'hai-phong': 'Hải Phòng',
        'can-tho': 'Cần Thơ',
        'nha-trang': 'Nha Trang',
        'da-lat': 'Đà Lạt',
        'vung-tau': 'Vũng Tàu',
        'hue': 'Huế',
        'phu-quoc': 'Phú Quốc'
    };

    const footerText = language === 'en' ? {
        suggestions: 'Suggestions from NearMe',
        nearby: 'nearby',
        inCity: 'in',
        contactUs: 'Contact Us',
        customerCare: 'Customer Care',
        serviceGuarantee: 'Service Guarantee',
        moreInfo: 'More Information',
        aboutNearMe: 'About NearMe',
        news: 'News',
        careers: 'Careers',
        terms: 'Terms & Conditions',
        privacy: 'Privacy Policy',
        introduction: 'About NearMe',
        otherServices: 'Other Services',
        investorRelations: 'Investor Relations',
        rewards: 'NearMe Rewards',
        affiliate: 'Affiliate Program',
        registerService: 'Register Service',
        security: 'Security',
        paymentMethods: 'Payment Methods',
        partners: 'Our Partners',
        copyright: 'Copyright © 2025 NearMe Vietnam. All rights reserved.',
        operator: 'Site operator: NearMe Vietnam Co., Ltd.'
    } : {
        suggestions: 'Gợi ý từ NearMe',
        nearby: 'gần đây',
        inCity: 'ở',
        contactUs: 'Liên Hệ Với Chúng Tôi',
        customerCare: 'Chăm Sóc Khách Hàng',
        serviceGuarantee: 'Bảo Đảm Dịch Vụ',
        moreInfo: 'Xem thêm thông tin dịch vụ',
        aboutNearMe: 'Về NearMe',
        news: 'Tin Tức',
        careers: 'Tuyển dụng',
        terms: 'Điều Khoản & Điều Kiện',
        privacy: 'Tuyên bố quyền riêng tư',
        introduction: 'Giới Thiệu Về NearMe',
        otherServices: 'Các Dịch Vụ Khác',
        investorRelations: 'Quan Hệ Đầu Tư',
        rewards: 'Phần Thưởng NearMe',
        affiliate: 'Chương trình đối tác liên kết',
        registerService: 'Đăng Ký Dịch Vụ',
        security: 'Bảo Mật',
        paymentMethods: 'Phương thức thanh toán',
        partners: 'Đối Tác Của Chúng Tôi',
        copyright: 'Bản quyền © 2025 NearMe Vietnam. Bảo lưu mọi quyền.',
        operator: 'Nhà điều hành trang: NearMe Vietnam Co., Ltd.'
    };

    return (
        <footer className="footer">
            {/* Section 1: Category Links */}
            <div className="footer-categories">
                <div className="footer-categories__container">
                    <h3 className="footer-categories__title">{footerText.suggestions}</h3>

                    {/* Tabs */}
                    <div className="footer-categories__tabs">
                        {categoriesData.map((cat) => (
                            <button
                                key={cat.id}
                                className={`footer-categories__tab ${activeTab === cat.id ? 'footer-categories__tab--active' : ''}`}
                                onClick={() => setActiveTab(cat.id)}
                            >
                                {getCategoryName(cat)}
                            </button>
                        ))}
                    </div>

                    {/* Links Grid */}
                    <div className="footer-categories__grid">
                        {activeCategory?.subcategories.map((sub) => (
                            <Link
                                key={sub.id}
                                to={`/${activeCategory.id}/${sub.id}`}
                                className="footer-categories__link"
                            >
                                {sub.name} {footerText.nearby}
                            </Link>
                        ))}
                        {Object.entries(cities).map(([cityId, cityName]) => (
                            <Link
                                key={cityId}
                                to={`/${activeCategory?.id}/${cityId}`}
                                className="footer-categories__link"
                            >
                                {getCategoryName(activeCategory)} {footerText.inCity} {cityName}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section 2: Company Info */}
            <div className="footer-main">
                <div className="footer-main__container">
                    {/* Links Columns */}
                    <div className="footer-main__columns">
                        {/* Column 1 */}
                        <div className="footer-main__column">
                            <h4 className="footer-main__heading">{footerText.contactUs}</h4>
                            <Link to="/cham-soc-khach-hang" className="footer-main__link">{footerText.customerCare}</Link>
                            <Link to="/bao-dam-dich-vu" className="footer-main__link">{footerText.serviceGuarantee}</Link>
                            <Link to="/thong-tin-dich-vu" className="footer-main__link">{footerText.moreInfo}</Link>
                            <div className="footer-main__social">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-main__social-link">
                                    <span>📘</span>
                                </a>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="footer-main__column">
                            <h4 className="footer-main__heading">{footerText.aboutNearMe}</h4>
                            <Link to="/ve-chung-toi" className="footer-main__link">{footerText.aboutNearMe}</Link>
                            <Link to="/tin-tuc" className="footer-main__link">{footerText.news}</Link>
                            <Link to="/tuyen-dung" className="footer-main__link">{footerText.careers}</Link>
                            <Link to="/dieu-khoan" className="footer-main__link">{footerText.terms}</Link>
                            <Link to="/quyen-rieng-tu" className="footer-main__link">{footerText.privacy}</Link>
                            <Link to="/gioi-thieu" className="footer-main__link">{footerText.introduction}</Link>
                        </div>

                        {/* Column 3 */}
                        <div className="footer-main__column">
                            <h4 className="footer-main__heading">{footerText.otherServices}</h4>
                            <Link to="/hop-tac" className="footer-main__link">{footerText.investorRelations}</Link>
                            <Link to="/phan-thuong" className="footer-main__link">{footerText.rewards}</Link>
                            <Link to="/doi-tac" className="footer-main__link">{footerText.affiliate}</Link>
                            <Link to="/dang-ky-dich-vu" className="footer-main__link">{footerText.registerService}</Link>
                            <Link to="/bao-mat" className="footer-main__link">{footerText.security}</Link>
                        </div>

                        {/* Column 4 - Payment */}
                        <div className="footer-main__column">
                            <h4 className="footer-main__heading">{footerText.paymentMethods}</h4>
                            <div className="footer-main__payments">
                                <span className="footer-main__payment">💳</span>
                                <span className="footer-main__payment">🏧</span>
                                <span className="footer-main__payment">📱</span>
                                <span className="footer-main__payment">💵</span>
                            </div>

                            <h4 className="footer-main__heading" style={{ marginTop: '24px' }}>{footerText.partners}</h4>
                            <div className="footer-main__partners">
                                <span className="footer-main__partner">Google</span>
                                <span className="footer-main__partner">TripAdvisor</span>
                            </div>
                        </div>
                    </div>

                    {/* Awards */}
                    <div className="footer-main__awards">
                        <div className="footer-main__award">
                            <span className="footer-main__award-icon">🏆</span>
                            <span className="footer-main__award-text">GOOD DESIGN AWARD 2024</span>
                        </div>
                        <div className="footer-main__award">
                            <span className="footer-main__award-icon">🎖️</span>
                            <span className="footer-main__award-text">Contact Center of the year 2025</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: Copyright */}
            <div className="footer-copyright">
                <div className="footer-copyright__container">
                    <p className="footer-copyright__text">{footerText.copyright}</p>
                    <p className="footer-copyright__subtext">{footerText.operator}</p>
                </div>
            </div>

            {/* Back to Top Button */}
            <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
                <span>↑</span>
            </button>
        </footer>
    );
}

export default Footer;
