import React, { useContext, useState, useEffect } from 'react'
import { auth, firestore, storage } from '../firebase'
import firebase from 'firebase/app'

const AuthContext = React.createContext()

function calculateAge(birthday) {
  // birthday is a date
  if (birthday) {
    var today = new Date()
    //var birthDate = new Date(birthday.toDate());
    var age = today.getFullYear() - birthday.getFullYear()
    var m = today.getMonth() - birthday.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--
    }

    return age
  }
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [userData, setUserData] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [friendsLoading, setFriendsLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [loadPercent, setLoadPercent] = useState(0)
  const [friendsProfiles, setFreindsProfiles] = useState(null)
  const [messages, setMessages] = useState(null)

  function signup(email, password, userDetails) {
    const signupDate = firebase.firestore.Timestamp.now()
    const userAge = calculateAge(userDetails.birthday)
    let userId = ''

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userId = userCredential.user.uid
        firestore.collection('users').doc(`${userId}`).set({
          userId,
          likedUsers: [],
          firstname: userDetails.firstname,
          gender: userDetails.gender,
          city: userDetails.city,
          age: userAge,
        })
      })
      .then(() => {
        firestore
          .collection('users')
          .doc(`${userId}`)
          .collection('private')
          .add({
            signupDate,
            birthday: userDetails.birthday,
            lastname: userDetails.lastname,
            email,
          })
      })
      .catch((err) => console.error(err))
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
    return firestore
      .collection('users')
      .doc(`${currentUser.uid}`)
      .update(userDetails)
      .catch((err) => console.error(err))
  }

  function getAllUsers(user) {
    return firestore
      .collection('users')
      .get()
      .then((data) => {
        let users = []
        data.forEach((doc) => {
          if (user.uid !== doc.id) {
            users.push({
              ...doc.data(),
            })
          }
        })
        setAllUsers(users)
      })
      .catch((err) => console.error(err))
  }

  function updateUserProfileImg(file) {
    const imageExtension = file.name.split('.')[file.name.split('.').length - 1]
    const storageRef = storage.ref(
      `userProfiles/${currentUser.uid}-1.${imageExtension}`,
    )

    storageRef.put(file).on(
      'state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setLoadPercent(percentage)
        console.log('Upload is ' + percentage + '% done')
      },
      (err) => {
        console.error(err)
      },
      async () => {
        const url = await storageRef.getDownloadURL()
        writeUserData({ profileImgUrl: url })
      },
    )
  }

  function sendPrivateMessage(message, toUserId) {
    const sentAt = firebase.firestore.Timestamp.now()

    return firestore
      .collection('users')
      .doc(`${currentUser.uid}`)
      .collection('messages')
      .add({
        sentAt,
        message,
        toUserId,
      })
      .then((result) => {
        firestore
          .collection('users')
          .doc(`${toUserId}`)
          .collection('messages')
          .add({
            sentAt,
            message,
            fromUserId: currentUser.uid,
          })
      })
      .then((result) => {
        firestore
          .collection('users')
          .doc(`${currentUser.uid}`)
          .collection('friends')
          .doc(`${toUserId}`)
          .update({
            lastMessage: sentAt,
          })
      })
      .then((result) => {
        firestore
          .collection('users')
          .doc(`${toUserId}`)
          .collection('friends')
          .doc(`${currentUser.uid}`)
          .update({
            lastMessage: sentAt,
          })
      })
      .catch((err) => console.error(err))
  }

  function likeUser(user) {
    if (!userData.likedUsers.includes(user.userId)) {
      firestore
        .collection('users')
        .doc(`${currentUser.uid}`)
        .update({
          likedUsers: firebase.firestore.FieldValue.arrayUnion(user.userId),
        })
        .then((result) => {
          if (user.likedUsers.includes(currentUser.uid)) {
            const dbTime = firebase.firestore.Timestamp.now()
            firestore
              .collection('users')
              .doc(`${currentUser.uid}`)
              .collection('friends')
              .doc(`${user.userId}`)
              .set({
                userId: user.userId,
                addedOn: dbTime,
                lastMessage: dbTime,
              })
            firestore
              .collection('users')
              .doc(`${user.userId}`)
              .collection('friends')
              .doc(`${currentUser.uid}`)
              .set({
                userId: currentUser.uid,
                addedOn: dbTime,
                lastMessage: dbTime,
              })
          }
        })
        .catch((err) => console.error(err))
    }
  }

  function getFriendData(doc) {
    let idArray = []
    let addedOnArray = []
    doc.forEach((profile) => {
      idArray.push(profile.data().userId)
      addedOnArray.push(profile.data().addedOn)
    })

    if (idArray.length > 0) {
      firestore
        .collection('users')
        .where('userId', 'in', idArray)
        .get()
        .then((snap) => {
          let dataArray = []
          snap.forEach((data) => {
            dataArray.push(data.data())
          })
          let sortedData = []
          idArray.forEach((uid, index) => {
            sortedData.push({
              ...dataArray.find((value) => {
                return value.userId === uid
              }),
              addedOn: addedOnArray[index],
            })
          })
          setFreindsProfiles(sortedData)
          setFriendsLoading(false)
        })
        .catch((err) => console.error(err))
    }
  }

  function getInterestsData() {
    return firestore
      .collection('interests')
      .get()
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setCurrentUser(user)
        if (user) {
          getAllUsers(user)
          //getFriends(user.uid)
        }
        setLoading(false)
      },
      (err) => console.error(err),
    )

    return unsubscribe
  }, [])

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore
        .collection('users')
        .doc(`${currentUser.uid}`)
        .onSnapshot(
          (doc) => {
            if (doc.exists) {
              console.log('user snapshot fired')
              setUserData(doc.data())
            }
          },
          (err) => console.error(err),
        )

      return unsubscribe
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore
        .collection('users')
        .doc(`${currentUser.uid}`)
        .collection('friends')
        .orderBy('lastMessage', 'desc')
        .onSnapshot(
          (doc) => {
            if (!doc.empty) {
              console.log('friends snapshot fired')
              getFriendData(doc)
            }
          },
          (err) => console.error(err),
        )

      return unsubscribe
    }
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = firestore
        .collection('users')
        .doc(`${currentUser.uid}`)
        .collection('messages')
        .orderBy('sentAt', 'desc')
        .onSnapshot(
          (doc) => {
            if (!doc.empty) {
              console.log('messages snapshot fired')
              let messageData = []
              doc.forEach((msg) => {
                messageData.push(msg.data())
              })

              if (messageData.length > 0) {
                messageData.reverse()
                setMessages(messageData)
                setMessagesLoading(false)
              }
            }
          },
          (err) => console.error(err),
        )

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
    messages,
    messagesLoading,
    writeUserData,
    updateUserProfileImg,
    signup,
    login,
    logout,
    likeUser,
    sendPrivateMessage,
    getInterestsData,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
