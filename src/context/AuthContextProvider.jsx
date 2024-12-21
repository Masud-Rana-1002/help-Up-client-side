import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../utils/firebaseConfig';
export const AuthContext = createContext(null);
const AuthContextProvider = ({children}) => {
const [user, setUser] = useState(null);

  // Create a new user with email and password
  const createUserByEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

// sign in with email and password
const signInByEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}
// Sign in with Google
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // setLoader(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createUserByEmailAndPassword,
    signInByEmailAndPassword,
    user,
    signInWithGoogle
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;