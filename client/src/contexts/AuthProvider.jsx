// import React, { createContext, useEffect, useState } from "react";
// import app from "../firebase/firebase.config";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginwithgoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   // const signUpWithGmail = () => {
//   //   return signInWithGmail
//   // }

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       console.log(currentUser);
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     user,
//     createUser,
//     loginwithgoogle,
//     loading,
//     login,
//     logout,
//   };
//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;
