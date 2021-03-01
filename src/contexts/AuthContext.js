import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState()

  function signup(email, password, userDetails) {

    return (
      auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        firestore.collection('users').doc(`${userCredential.user.uid}`).set({
          email,
          userId: userCredential.user.uid,
          ...userDetails
        })
      })
    )
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)      
    })

    return unsubscribe
  }, [])
  

  const value = {
    currentUser,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

