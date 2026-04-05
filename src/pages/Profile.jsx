import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './Profile.css';

const DIETARY_OPTIONS = [
    { id: 'vegetarian', label: 'Ăn chay' },
    { id: 'no_seafood', label: 'Không hải sản' },
    { id: 'no_spicy', label: 'Không ăn cay' },
    { id: 'no_beef', label: 'Không thịt bò' },
    { id: 'no_raw_food', label: 'Không đồ sống' }
];

function Profile() {
    const navigate = useNavigate();
    const { currentUser, userProfile, updateBehaviorProfile, updateDisplayName, updatePhone, loading } = useAuth();
    const { t, language } = useLanguage();

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });
    
    // Form state
    const [formData, setFormData] = useState({
        displayName: '',
        phone: '',
        defaultVehicle: 'motorbike',
        budgetPreference: 2,
        dietaryRestrictions: []
    });

    useEffect(() => {
        if (!loading && !currentUser) {
            navigate('/login');
        }
    }, [currentUser, loading, navigate]);

    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.displayName || '',
                phone: userProfile.phone || '',
                defaultVehicle: userProfile.defaultVehicle || 'motorbike',
                budgetPreference: userProfile.budgetPreference || 2,
                dietaryRestrictions: userProfile.dietaryRestrictions || []
            });
        }
    }, [userProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDietaryChange = (dietId) => {
        setFormData(prev => {
            const current = [...prev.dietaryRestrictions];
            if (current.includes(dietId)) {
                return { ...prev, dietaryRestrictions: current.filter(id => id !== dietId) };
            } else {
                return { ...prev, dietaryRestrictions: [...current, dietId] };
            }
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveMessage({ text: '', type: '' });

        try {
            let success = true;
            
            // Save basic info
            if (formData.displayName !== userProfile.displayName) {
                const res = await updateDisplayName(formData.displayName);
                if (!res) success = false;
            }
            if (formData.phone !== userProfile.phone) {
                const res = await updatePhone(formData.phone);
                if (!res) success = false;
            }

            // Save behavior info
            const behaviorRes = await updateBehaviorProfile({
                defaultVehicle: formData.defaultVehicle,
                budgetPreference: Number(formData.budgetPreference),
                dietaryRestrictions: formData.dietaryRestrictions
            });

            if (!behaviorRes) success = false;

            if (success) {
                setSaveMessage({ text: language === 'vi' ? 'Cập nhật thành công!' : 'Profile updated successfully!', type: 'success' });
            } else {
                setSaveMessage({ text: language === 'vi' ? 'Có lỗi xảy ra, vui lòng thử lại.' : 'An error occurred, please try again.', type: 'error' });
            }
        } catch (error) {
            setSaveMessage({ text: language === 'vi' ? 'Lỗi hệ thống.' : 'System error.', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
        }
    };

    if (loading || !currentUser) {
        return <div className="profile-loading">Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h2>{language === 'vi' ? 'Hồ Sơ Của Tôi' : 'My Profile'}</h2>
                    <p className="profile-subtitle">
                        {language === 'vi' 
                            ? 'Thông tin này giúp Near Me đưa ra các gợi ý chính xác nhất dành riêng cho bạn.'
                            : 'This information helps Near Me provide the most accurate suggestions just for you.'}
                    </p>
                </div>

                {saveMessage.text && (
                    <div className={`profile-message profile-message--${saveMessage.type}`}>
                        {saveMessage.text}
                    </div>
                )}

                <form className="profile-form" onSubmit={handleSave}>
                    
                    {/* Basic Info Section */}
                    <div className="profile-section">
                        <h3 className="section-title">
                            <span className="section-icon">👤</span> 
                            {language === 'vi' ? 'Thông tin cơ bản' : 'Basic Info'}
                        </h3>
                        <div className="form-group">
                            <label>{language === 'vi' ? 'Email (Không thể đổi)' : 'Email (Cannot change)'}</label>
                            <input type="email" value={currentUser.email} disabled className="input-disabled" />
                        </div>
                        <div className="form-group form-row">
                            <div className="form-col">
                                <label>{language === 'vi' ? 'Tên hiển thị' : 'Display Name'}</label>
                                <input 
                                    type="text" 
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleInputChange}
                                    placeholder={language === 'vi' ? 'Tên của bạn' : 'Your name'} 
                                />
                            </div>
                            <div className="form-col">
                                <label>{language === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="09..." 
                                />
                            </div>
                        </div>
                    </div>

                    {/* AI Behavior Context Section */}
                    <div className="profile-section">
                        <h3 className="section-title section-title--highlight">
                            <span className="section-icon">🧠</span> 
                            {language === 'vi' ? 'Hồ Sơ Hành Vi' : 'Behavior Profile'}
                        </h3>
                        <p className="section-desc">
                            {language === 'vi' 
                                ? 'Trả lời để Decision Engine có thể đề xuất chỗ đi phù hợp với ngữ cảnh thực tế của bạn nhất.'
                                : 'Answer these so the Decision Engine can propose places that fit your real context.'}
                        </p>

                        <div className="form-group">
                            <label>{language === 'vi' ? '🚗 Phương tiện thường vòng quanh' : '🚗 Default vehicle'}</label>
                            <div className="radio-group">
                                <label className={`radio-label ${formData.defaultVehicle === 'walk' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="defaultVehicle" 
                                        value="walk"
                                        checked={formData.defaultVehicle === 'walk'}
                                        onChange={handleInputChange}
                                    />
                                    🚶‍♂️ {language === 'vi' ? 'Đi bộ' : 'Walk'}
                                </label>
                                <label className={`radio-label ${formData.defaultVehicle === 'motorbike' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="defaultVehicle" 
                                        value="motorbike"
                                        checked={formData.defaultVehicle === 'motorbike'}
                                        onChange={handleInputChange}
                                    />
                                    🛵 {language === 'vi' ? 'Xe máy' : 'Motorbike'}
                                </label>
                                <label className={`radio-label ${formData.defaultVehicle === 'car' ? 'active' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="defaultVehicle" 
                                        value="car"
                                        checked={formData.defaultVehicle === 'car'}
                                        onChange={handleInputChange}
                                    />
                                    🚙 {language === 'vi' ? 'Ô tô' : 'Car'}
                                </label>
                            </div>
                            <small className="form-hint">
                                {language === 'vi' 
                                    ? '* Nếu chọn Ô tô, ưu tiên lọc quán có bãi đậu xe riêng lớn.'
                                    : '* If Car is selected, we prioritize places with parking.'}
                            </small>
                        </div>

                        <div className="form-group">
                            <label>{language === 'vi' ? '💳 Mức chi tiêu trung bình ưu tiên' : '💳 Typical budget preference'}</label>
                            <div className="budget-group">
                                {[1, 2, 3].map(level => (
                                    <label key={level} className={`budget-btn ${Number(formData.budgetPreference) === level ? 'active' : ''}`}>
                                        <input 
                                            type="radio" 
                                            name="budgetPreference" 
                                            value={level}
                                            checked={Number(formData.budgetPreference) === level}
                                            onChange={handleInputChange}
                                        />
                                        {'$'.repeat(level)}
                                    </label>
                                ))}
                            </div>
                            <div className="budget-labels">
                                <span>{language === 'vi' ? 'Sinh viên' : 'Budget'}</span>
                                <span>{language === 'vi' ? 'Cao cấp' : 'Premium'}</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{language === 'vi' ? '🥗 Không thể ăn (Dietary Restrictions)' : '🥗 Dietary Restrictions'}</label>
                            <div className="checkbox-grid">
                                {DIETARY_OPTIONS.map(diet => (
                                    <label key={diet.id} className="checkbox-item">
                                        <input 
                                            type="checkbox"
                                            checked={formData.dietaryRestrictions.includes(diet.id)}
                                            onChange={() => handleDietaryChange(diet.id)}
                                        />
                                        <span className="checkmark"></span>
                                        {language === 'vi' ? diet.label : diet.id.replace('_', ' ')}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button type="submit" className="save-btn" disabled={isSaving}>
                            {isSaving 
                                ? (language === 'vi' ? 'Đang lưu...' : 'Saving...') 
                                : (language === 'vi' ? 'Lưu thay đổi' : 'Save changes')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
