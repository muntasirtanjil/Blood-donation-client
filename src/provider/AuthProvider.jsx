
import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create User + Send Verification Email
    const CreateUser = async (email, password) => {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await sendEmailVerification(result.user);

        // Unverified user will not be treated as logged-in user
        setUser(null);

        return result;
    };

    // Login User + Check Email Verification
    const LoginUser = async (email, password) => {
        const result = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Check email verification
        await result.user.reload();

        if (!auth.currentUser?.emailVerified) {
            await signOut(auth);
            setUser(null);

            throw new Error(
                "Please verify your email before logging in."
            );
        }

        setUser(auth.currentUser);

        return result;
    };

    // Logout User
    const LogOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    // Check Authentication State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    await currentUser.reload();

                    const latestUser = auth.currentUser;

                    if (latestUser?.emailVerified) {
                        setUser(latestUser);
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth state error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
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
