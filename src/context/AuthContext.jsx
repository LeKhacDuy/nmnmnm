import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../firebase";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile as firebaseUpdateProfile,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [userProfile, setUserProfile] = useState({
        phone: '',
        address: '',
        displayName: '',
        photoURL: ''
    });

    // Login with Google
    async function loginWithGoogle() {
        const result = await signInWithPopup(auth, googleProvider);
        await initUserData(result.user);
        return result;
    }

    // Register with Email/Password
    async function registerWithEmail(email, password) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await initUserData(result.user);
        return result;
    }

    // Login with Email/Password
    async function loginWithEmail(email, password) {
        const result = await signInWithEmailAndPassword(auth, email, password);
        await loadUserData(result.user.uid);
        return result;
    }

    // Logout
    function logout() {
        setFavorites([]);
        setSearchHistory([]);
        setUserProfile({ phone: '', address: '', displayName: '', photoURL: '' });
        return signOut(auth);
    }

    // Initialize user data in Firestore
    async function initUserData(user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email: user.email,
                displayName: user.displayName || '',
                photoURL: user.photoURL || '',
                phone: '',
                address: '',
                favorites: [],
                searchHistory: [],
                createdAt: new Date().toISOString()
            });
            setFavorites([]);
            setSearchHistory([]);
            setUserProfile({
                phone: '',
                address: '',
                displayName: user.displayName || '',
                photoURL: user.photoURL || ''
            });
        } else {
            const data = userSnap.data();
            setFavorites(data.favorites || []);
            setSearchHistory(data.searchHistory || []);
            setUserProfile({
                phone: data.phone || '',
                address: data.address || '',
                displayName: data.displayName || user.displayName || '',
                photoURL: data.photoURL || user.photoURL || ''
            });
        }
    }

    // Load user data from Firestore
    async function loadUserData(uid) {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                setFavorites(data.favorites || []);
                setSearchHistory(data.searchHistory || []);
                setUserProfile({
                    phone: data.phone || '',
                    address: data.address || '',
                    displayName: data.displayName || '',
                    photoURL: data.photoURL || ''
                });
            }
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    }

    // Add to favorites
    async function addFavorite(item) {
        if (!currentUser) return false;

        const newItem = {
            ...item,
            id: Date.now().toString(),
            savedAt: new Date().toISOString()
        };

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await setDoc(userRef, {
                favorites: arrayUnion(newItem)
            }, { merge: true });
            setFavorites(prev => [...prev, newItem]);
            return true;
        } catch (error) {
            console.error("Error adding favorite:", error);
            return false;
        }
    }

    // Remove from favorites
    async function removeFavorite(itemId) {
        if (!currentUser) return false;

        const itemToRemove = favorites.find(f => f.id === itemId);
        if (!itemToRemove) return false;

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                favorites: arrayRemove(itemToRemove)
            });
            setFavorites(prev => prev.filter(f => f.id !== itemId));
            return true;
        } catch (error) {
            console.error("Error removing favorite:", error);
            return false;
        }
    }

    // Add to search history
    async function addToHistory(keyword, platform) {
        if (!currentUser) return;

        const historyItem = {
            keyword,
            platform,
            searchedAt: new Date().toISOString()
        };

        try {
            const userRef = doc(db, "users", currentUser.uid);
            const newHistory = [historyItem, ...searchHistory.slice(0, 49)];
            await updateDoc(userRef, { searchHistory: newHistory });
            setSearchHistory(newHistory);
        } catch (error) {
            console.error("Error adding to history:", error);
        }
    }

    // Clear search history
    async function clearHistory() {
        if (!currentUser) return;

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { searchHistory: [] });
            setSearchHistory([]);
        } catch (error) {
            console.error("Error clearing history:", error);
        }
    }

    // Update display name
    async function updateDisplayName(newName) {
        if (!currentUser) return false;

        try {
            await firebaseUpdateProfile(currentUser, { displayName: newName });
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { displayName: newName });
            setUserProfile(prev => ({ ...prev, displayName: newName }));
            return true;
        } catch (error) {
            console.error("Error updating display name:", error);
            return false;
        }
    }

    // Update phone
    async function updatePhone(newPhone) {
        if (!currentUser) return false;

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { phone: newPhone });
            setUserProfile(prev => ({ ...prev, phone: newPhone }));
            return true;
        } catch (error) {
            console.error("Error updating phone:", error);
            return false;
        }
    }

    // Update address
    async function updateAddress(newAddress) {
        if (!currentUser) return false;

        try {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, { address: newAddress });
            setUserProfile(prev => ({ ...prev, address: newAddress }));
            return true;
        } catch (error) {
            console.error("Error updating address:", error);
            return false;
        }
    }

    // Change password
    async function changePassword(currentPassword, newPassword) {
        if (!currentUser || !currentUser.email) {
            return { success: false, error: 'No user' };
        }

        try {
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);
            await updatePassword(currentUser, newPassword);
            return { success: true };
        } catch (error) {
            console.error("Error changing password:", error);
            if (error.code === 'auth/wrong-password') {
                return { success: false, error: 'Mật khẩu hiện tại không đúng' };
            }
            return { success: false, error: 'Đã xảy ra lỗi. Vui lòng thử lại.' };
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await loadUserData(user.uid);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userProfile,
        favorites,
        searchHistory,
        loading,
        loginWithGoogle,
        registerWithEmail,
        loginWithEmail,
        logout,
        addFavorite,
        removeFavorite,
        addToHistory,
        clearHistory,
        updateDisplayName,
        updatePhone,
        updateAddress,
        changePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
