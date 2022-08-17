import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from './Loader';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {db} from '../firebase';
import { doc, collection, addDoc} from "firebase/firestore";
import { onSnapshot } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { orderByChild, ref } from "firebase/database";
import Contact from './Chats/Contact';
import {contacts} from './Chats/ContactsData';


const Chat = () => {
  
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();
  const [value , setValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joke, setJoke] = useState('');

  // const [messages, loading] = useCollectionData(
  //   collection(firestore, 'messages')
  //   //.orderBy(firebase,'createdAt')
  // );
//   useEffect(() => {
//     const q = query(collection(db, 'messages'))
//     onSnapshot(q, (querySnapshot) => {
//       const messages = []
//       querySnapshot.forEach((doc) => {
//         messages.push({ uid: user.uid, data: doc.data() })
//       })

//       setMessages(messages)
//     })
// }, [])

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, '/chat' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }



  // const docRef = await addDoc(collection(db, "cities"), {
  //   name: "Tokyo",
  //   country: "Japan"
  // });
  
  const dbRef = collection(db, "messages");
  const dbJoke = collection(db, "joke");
  const dbContacts = collection(db, "contacts");
  const data = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    text: value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  const jokeData = {
    uid: user.uid,
    joke: joke,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }
  const contactsData = {
    uid: user.uid,
    contacts: contacts,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }
  
 
  const onClick = () => {
    addDoc(dbRef, data);
    setValue('');
    addDoc(dbJoke, jokeData);
    
  }
  useEffect(() => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then(response => response.json())
      .then(data => {
        setJoke(data.value);
        setLoading(false);
      }
      )
  } , [])

  useEffect(() => {
    const q = query(dbRef)
    const q2 = query(dbJoke)
    onSnapshot(q, q2, (querySnapshot) => {
      const messages = []
      const joke = []
      querySnapshot.forEach((doc) => {
        messages.push({ uid: user.uid, name: user.displayName, photoURL: user.photoURL,text: value, data: doc.data() })
        joke.push({ uid: user.uid, name:"Chuck", joke: joke, data: doc.data() })
      }

      )
      setMessages(messages)
      setJoke(joke)
    }
    )
  } , [])

  // create useEffect to fetch data from https://api.chucknorris.io/jokes/random
   
  


 

  // if (loading) {
  //   return <Loader />
  // }

console.log("joke",joke);
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.data.text}</div>
          <div>{message.data.name}</div>
          <div>{message.data.email}</div>
          <img src={message.data.photoUrl} alt="user-avatar"/>
          
        </div>
      ))}
      <input type="text" value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={onClick}>Send</button>
      {contacts.map((contact, index) => (
        <Contact key={index} name={contact.name}  />
      ))}

    </div>
  )
}

export default Chat