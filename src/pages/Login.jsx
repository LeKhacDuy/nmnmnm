import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const navigate = useNavigate();
    const { currentUser, loginWithGoogle, loginWithEmail, registerWithEmail, logout } = useAuth();
    const { language, t } = useLanguage();

    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const text = language === 'en' ? {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        continueWithGoogle: 'Continue with Google',
        or: 'or',
        backToHome: 'Back to Home',
        logout: 'Logout',
        processing: 'Processing...',
        fillAllFields: 'Please fill in all fields',
        passwordMismatch: 'Passwords do not match',
        passwordTooShort: 'Password must be at least 6 characters',
        googleFailed: 'Google login failed. Please try again.',
        userNotFound: 'Email not found',
        wrongPassword: 'Wrong password',
        emailInUse: 'Email already in use',
        invalidEmail: 'Invalid email',
        errorOccurred: 'An error occurred. Please try again.',
        welcomeBack: 'Welcome back',
        user: 'User'
    } : {
        login: 'Đăng nhập',
        register: 'Đăng ký',
        email: 'Email',
        password: 'Mật khẩu',
        confirmPassword: 'Xác nhận mật khẩu',
        continueWithGoogle: 'Tiếp tục với Google',
        or: 'hoặc',
        backToHome: 'Quay lại trang chủ',
        logout: 'Đăng xuất',
        processing: 'Đang xử lý...',
        fillAllFields: 'Vui lòng điền đầy đủ thông tin',
        passwordMismatch: 'Mật khẩu xác nhận không khớp',
        passwordTooShort: 'Mật khẩu phải có ít nhất 6 ký tự',
        googleFailed: 'Đăng nhập Google thất bại. Vui lòng thử lại.',
        userNotFound: 'Email không tồn tại',
        wrongPassword: 'Mật khẩu không đúng',
        emailInUse: 'Email đã được sử dụng',
        invalidEmail: 'Email không hợp lệ',
        errorOccurred: 'Đã xảy ra lỗi. Vui lòng thử lại.',
        welcomeBack: 'Chào mừng trở lại',
        user: 'Người dùng'
    };

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            setError('');
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError(text.googleFailed);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError(text.fillAllFields);
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError(text.passwordMismatch);
            return;
        }

        if (password.length < 6) {
            setError(text.passwordTooShort);
            return;
        }

        try {
            setLoading(true);
            setError('');

            if (isLogin) {
                await loginWithEmail(email, password);
            } else {
                await registerWithEmail(email, password);
            }

            navigate('/');
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError(text.userNotFound);
            } else if (err.code === 'auth/wrong-password') {
                setError(text.wrongPassword);
            } else if (err.code === 'auth/email-already-in-use') {
                setError(text.emailInUse);
            } else if (err.code === 'auth/invalid-email') {
                setError(text.invalidEmail);
            } else {
                setError(text.errorOccurred);
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    // If already logged in, show profile
    if (currentUser) {
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="login-profile">
                        <img
                            src={currentUser.photoURL || 'https://via.placeholder.com/80'}
                            alt="Avatar"
                            className="login-profile__avatar"
                        />
                        <h2 className="login-profile__name">
                            {currentUser.displayName || text.user}
                        </h2>
                        <p className="login-profile__email">{currentUser.email}</p>
                    </div>

                    <div className="login-buttons">
                        <button onClick={() => navigate('/')} className="login-btn login-btn--primary">
                            🏠 {text.backToHome}
                        </button>
                        <button onClick={handleLogout} className="login-btn login-btn--secondary">
                            🚪 {text.logout}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-card">
                {/* Logo */}
                <div className="login-logo">
                    <span className="login-logo__icon">🦉</span>
                    <h1 className="login-logo__text">NearMe</h1>
                </div>

                {/* Tabs */}
                <div className="login-tabs">
                    <button
                        className={`login-tab ${isLogin ? 'login-tab--active' : ''}`}
                        onClick={() => { setIsLogin(true); setError(''); }}
                    >
                        {text.login}
                    </button>
                    <button
                        className={`login-tab ${!isLogin ? 'login-tab--active' : ''}`}
                        onClick={() => { setIsLogin(false); setError(''); }}
                    >
                        {text.register}
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="login-error">
                        ⚠️ {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleEmailSubmit} className="login-form">
                    <div className="login-field">
                        <label>📧 {text.email}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div className="login-field">
                        <label>🔒 {text.password}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {!isLogin && (
                        <div className="login-field">
                            <label>🔒 {text.confirmPassword}</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-btn login-btn--primary"
                        disabled={loading}
                    >
                        {loading ? text.processing : (isLogin ? text.login : text.register)}
                    </button>
                </form>

                {/* Divider */}
                <div className="login-divider">
                    <span>{text.or}</span>
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    className="login-btn login-btn--google"
                    disabled={loading}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {text.continueWithGoogle}
                </button>

                {/* Back */}
                <button onClick={() => navigate('/')} className="login-btn login-btn--back">
                    ← {text.backToHome}
                </button>
            </div>
        </div>
    );
}
