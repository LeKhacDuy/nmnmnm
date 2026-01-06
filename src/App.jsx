import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { RedirectProvider } from './context/RedirectContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import EmergencyPage from './pages/EmergencyPage';
import Login from './pages/Login';
import Favorites from './pages/Favorites';
import LocationModal from './components/LocationModal';
import RadiusSelector from './components/RadiusSelector';
import { useLocationContext } from './context/LocationContext';

function AppContent() {
    const {
        isLocationModalOpen,
        setIsLocationModalOpen,
        isRadiusSelectorOpen,
        setIsRadiusSelectorOpen
    } = useLocationContext();

    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:categoryId" element={<CategoryPage />} />
                    <Route path="/danh-muc/:categoryId" element={<CategoryPage />} />

                    {/* Navigation mode routes */}
                    <Route path="/gan-toi" element={<Search searchMode="near_me" />} />
                    <Route path="/gan-day" element={<Search searchMode="nearby" />} />
                    <Route path="/gan-nhat" element={<Search searchMode="closest" />} />
                    <Route path="/dang-mo" element={<Search searchMode="open_now" />} />
                    <Route path="/khan-cap" element={<EmergencyPage />} />

                    {/* Auth routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/dang-nhap" element={<Login />} />

                    {/* User routes */}
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/yeu-thich" element={<Favorites />} />
                </Routes>
            </main>
            <Footer />

            {/* Modals */}
            <LocationModal
                isOpen={isLocationModalOpen}
                onClose={() => setIsLocationModalOpen(false)}
            />
            <RadiusSelector
                isOpen={isRadiusSelectorOpen}
                onClose={() => setIsRadiusSelectorOpen(false)}
            />
        </>
    );
}

function App() {
    return (
        <Router>
            <LanguageProvider>
                <AuthProvider>
                    <LocationProvider>
                        <RedirectProvider>
                            <AppContent />
                        </RedirectProvider>
                    </LocationProvider>
                </AuthProvider>
            </LanguageProvider>
        </Router>
    );
}

export default App;
