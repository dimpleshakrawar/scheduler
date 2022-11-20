import { useState, useEffect, createContext } from "react"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged
} from '../firebase';

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const authentication = getAuth();
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(authentication, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(authentication, email, password)
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(authentication, email)
  }
  const logout = () => {
    return signOut(authentication)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe
  }, [authentication])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
