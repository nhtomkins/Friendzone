import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore, storage } from '../firebase'
import firebase from "firebase/app"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [userData, setUserData] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [friendsLoading, setFriendsLoading] = useState(true)
  const [loadPercent, setLoadPercent] = useState(0)
  const [friendsProfiles, setFreindsProfiles] = useState(null)

  function signup(email, password, userDetails) {
    return (
      auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        firestore.collection('users').doc(`${userCredential.user.uid}`).set({
          email,
          userId: userCredential.user.uid,
          likedUsers: [],
          friends: [],
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

  /*
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
  */

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
    })
  }

  function sendPrivateMessage(document) {
    firestore.collection('users').doc(`${currentUser.uid}`).collection('messages').add({
      sentAt: firebase.firestore.Timestamp.now(),
      ...document
    })
    .then(result => {
      return result
    })
    .catch(err => console.error(err))
  }

  function likeUser(user) {
    firestore.collection('users').doc(`${currentUser.uid}`).update({
      likedUsers: firebase.firestore.FieldValue.arrayUnion(user.userId)
    })
    .then(result => {
      if(user.likedUsers.includes(currentUser.uid)) {
        firestore.collection('users').doc(`${currentUser.uid}`)
          .collection('friends').doc(`${user.userId}`).set({
            userId: user.userId,
            firstname: user.firstname,
            profileImgUrl: user.profileImgUrl,
            lastMessage: firebase.firestore.Timestamp.now()
        }, { merge: true })
        firestore.collection('users').doc(`${user.userId}`)
        .collection('friends').doc(`${currentUser.uid}`).set({
            userId: currentUser.uid,
            firstname: userData.firstname,
            profileImgUrl: userData.profileImgUrl,
            lastMessage: firebase.firestore.Timestamp.now()
        }, { merge: true })
      }
    })
    .catch(err => console.error(err))
  }

  function getFriendDataQuick(doc) {
    let idArray = []                    
    doc.forEach((profile) => {
      idArray.push(profile.data().userId)
    })

    firestore.collection('users').where("userId", "in", idArray).get()
      .then((snap) => {
        //console.log(snap)
        let dataArray = []
        snap.forEach((data) => {
          console.log(data.data())
          dataArray.push(data.data())
        })
        console.log(dataArray)
        setFreindsProfiles(dataArray)
        setFriendsLoading(false)
      })     
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      if(user) {
        getAllUsers(user)
        //getFriends(user.uid)
      }
      setLoading(false)      
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    if(currentUser) {
      const unsubscribe = firestore.collection('users').doc(`${currentUser.uid}`)
      .onSnapshot((doc) => {
        if(doc.exists) {
          console.log("user snapshot fired")
          setUserData(doc.data())     
        }
      })

      return unsubscribe
    }
  }, [currentUser])

  useEffect(() => {
    if(currentUser) {
      const unsubscribe = firestore.collection('users').doc(`${currentUser.uid}`).collection('friends')
      .orderBy('lastMessage', 'desc')
      .onSnapshot((doc) => {
        if(doc) {
          console.log("friends snapshot fired")
          let friendsArray = []                    
          doc.forEach((friend) => {
            friendsArray.push(friend.data())
          })
          setFreindsProfiles(friendsArray)
          setFriendsLoading(false)
        }
      })

      return unsubscribe
    }
  }, [currentUser])
  

  const value = {
    currentUser,
    userData,
    allUsers,
    loadPercent,
    friendsProfiles,
    friendsLoading,
    writeUserData,
    updateUserProfileImg,
    signup,
    login,
    logout,
    likeUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

