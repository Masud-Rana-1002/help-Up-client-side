import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../utils/firebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import { axiosInstance } from '../utils/hooks/useAxiosSecure';
export const AuthContext = createContext(null);
const AuthContextProvider = ({children}) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(null);

  // Create a new user with email and password
  const createUserByEmailAndPassword = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

// sign in with email and password
const signInByEmailAndPassword = (email, password) => {
  setLoading(true)
  return signInWithEmailAndPassword(auth, email, password)
}
// Sign in with Google
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {
  setLoading(true)
  return signInWithPopup(auth, provider)
}
// user logOut 
const userLogout =()=>{
return  signOut(auth)
}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser?.email){
     
        const user ={email : currentUser.email}
        axiosInstance.post('/jwt', user,{
          withCredentials: true
        })
        .then(res => console.log(res.data))
      }else{
        axiosInstance.post('/logout',{},{
          withCredentials: true
        })
        .then(res => console.log('logout',res.data))
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = {
    createUserByEmailAndPassword,
    signInByEmailAndPassword,
    user,
    signInWithGoogle,
    toast,
    loading, setLoading,
    userLogout
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;