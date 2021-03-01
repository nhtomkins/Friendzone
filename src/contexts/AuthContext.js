import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [userData, setUserData] = useState({})
  const [allUsers, setAllUsers] = useState([])
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

  function getUserData(user) {
    firestore.collection('users').doc(`${user.uid}`).get()
      .then(docSnapshot => {
        if(docSnapshot.exists) {
          setUserData(docSnapshot.data())
        }
      })
      .catch(err => console.error(err))
  }

  function getAllUsers(user) {
    firestore.collection('users').get()
      .then(data => {
        let users = [];
        data.forEach((doc) => {
          if(user.uid !== doc.id) {
            users.push({
              ...doc.data()
            });
          };        
        });
        setAllUsers(users)
      })
      .catch(err => console.error(err));
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if(user) {
        getUserData(user)
        getAllUsers(user)
      }

      setLoading(false)      
    })

    return unsubscribe
  }, [])
  

  const value = {
    currentUser,
    userData,
    allUsers,
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

