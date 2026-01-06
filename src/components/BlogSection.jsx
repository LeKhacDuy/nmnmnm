import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import blogData from '../data/blogData';

function BlogSection() {
    const { language } = useLanguage();

    // Translations
    const translations = {
        vi: {
            title: 'Bài Viết Hướng Dẫn',
            subtitle: 'Khám phá mẹo hay và kinh nghiệm hữu ích',
            readMore: 'Đọc thêm',
            viewAll: 'Xem tất cả bài viết',
            minRead: 'phút đọc'
        },
        en: {
            title: 'Helpful Guides',
            subtitle: 'Discover useful tips and experiences',
            readMore: 'Read more',
            viewAll: 'View all articles',
            minRead: 'min read'
        }
    };

    const t = translations[language] || translations.vi;

    // Format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        if (language === 'en') {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
        return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
    };

    return (
        <section className="blog-section">
            <div className="blog-section__container">
                <div className="blog-section__header">
                    <h2 className="blog-section__title">{t.title}</h2>
                    <p className="blog-section__subtitle">{t.subtitle}</p>
                </div>

                <div className="blog-section__grid">
                    {blogData.slice(0, 6).map((blog) => (
                        <article key={blog.id} className="blog-card">
                            <div className="blog-card__image-wrapper">
                                <img
                                    src={blog.image}
                                    alt={blog.title[language] || blog.title.vi}
                                    className="blog-card__image"
                                    loading="lazy"
                                />
                                <span className="blog-card__category">
                                    {blog.category[language] || blog.category.vi}
                                </span>
                            </div>
                            <div className="blog-card__content">
                                <div className="blog-card__meta">
                                    <span className="blog-card__date">{formatDate(blog.date)}</span>
                                    <span className="blog-card__read-time">
                                        {blog.readTime} {t.minRead}
                                    </span>
                                </div>
                                <h3 className="blog-card__title">
                                    {blog.title[language] || blog.title.vi}
                                </h3>
                                <p className="blog-card__excerpt">
                                    {blog.excerpt[language] || blog.excerpt.vi}
                                </p>
                                <Link to={`/blog/${blog.slug}`} className="blog-card__link">
                                    {t.readMore} →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="blog-section__footer">
                    <Link to="/blog" className="blog-section__view-all">
                        {t.viewAll} →
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
