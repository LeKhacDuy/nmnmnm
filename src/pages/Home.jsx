import HeroSection from '../components/HeroSection';
import StickyTags from '../components/StickyTags';
import CategoryGrid from '../components/CategoryGrid';
import BannerCarousel from '../components/BannerCarousel';
import AllSubcategorySections from '../components/SubcategorySection';

function Home() {
    return (
        <main className="home">
            <HeroSection />
            <StickyTags />
            <CategoryGrid />
            <BannerCarousel />
            <AllSubcategorySections />
        </main>
    );
}

export default Home;

