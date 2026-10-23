import React, { createContext } from 'react';
import { app } from '../firebase/firebase.config';
import { getAuth } from "firebase/auth";

export const AuthContext = createContext();
const Auth = getAuth(app)


const AuthProvider = () => {
  
  
  
    return (
        <div>
            
        </div>
    );
};

export default AuthProvider;