
import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(user)
    // Create user
    const CreateUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // Login
    const LoginUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout
    const LogOut = () => {
        return signOut(auth);
    };

    // Observe login status
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        setUser,
        loading,
        CreateUser,
        LogOut,
        LoginUser,
        auth,
    };

    return (
        <AuthContext.Provider value={authData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
