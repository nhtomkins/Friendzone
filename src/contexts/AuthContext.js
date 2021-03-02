import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore, storage } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [userData, setUserData] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [profileImgUrl, setProfileImgUrl] = useState()
  const [loadPercent, setLoadPercent] = useState(0)

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
          setProfileImgUrl(docSnapshot.data().profileImgUrl)
        }
      })
      .catch(err => console.error(err))
  }

  function writeUserData(userDetails) {
    firestore.collection('users').doc(`${currentUser.uid}`).update(userDetails)
    .then(result => {
      return result
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

  function updateUserProfileImg(file) {

    const imageExtension = file.name.split('.')[file.name.split('.').length - 1];
    const storageRef = storage.ref(`userProfiles/${currentUser.uid}-1.${imageExtension}`)
    
    storageRef.put(file).on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setLoadPercent(percentage)
      console.log('Upload is ' + percentage + '% done')
    }, (err) => {
      console.error(err)
    }, async () => {
      const url = await storageRef.getDownloadURL();
      writeUserData({ "profileImgUrl": url })
      setProfileImgUrl(url)
    })
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
    loadPercent,
    profileImgUrl,
    writeUserData,
    updateUserProfileImg,
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

