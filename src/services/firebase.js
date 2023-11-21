import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
   // GoogleAuthProvider,
   // signInWithPopup,
   getAuth,
   // signInAnonymously,
} from "firebase/auth";
import {
   getFirestore,
   collection,
   addDoc,
   serverTimestamp,
   onSnapshot,
   query,
   orderBy,
   where,
   Timestamp,
   getDoc,
   doc,
   getDocs,
   // updateDoc,
   setDoc,
} from "firebase/firestore";
// import { ref } from "firebase/database";
import moment from "moment/moment";
import { firebaseCollections } from "src/data/constants";

// Add your Firebase configuration here

let firebaseConfig;

if (process.env.NODE_ENV === "development") {
   firebaseConfig = {
      apiKey: "AIzaSyC4U8Gzon6DmsDP_U8v-WfZ9v29zpwgr54",
      authDomain: "dmd-chat.firebaseapp.com",
      projectId: "dmd-chat",
      storageBucket: "dmd-chat.appspot.com",
      messagingSenderId: "356101460314",
      appId: "1:356101460314:web:9f6d5d5f231d640b6de363",
      measurementId: "G-WCV381YD6R",
   };
} else {
   firebaseConfig = {
      apiKey: "AIzaSyC4U8Gzon6DmsDP_U8v-WfZ9v29zpwgr54",
      authDomain: "dmd-chat.firebaseapp.com",
      projectId: "dmd-chat",
      storageBucket: "dmd-chat.appspot.com",
      messagingSenderId: "356101460314",
      appId: "1:356101460314:web:9f6d5d5f231d640b6de363",
      measurementId: "G-WCV381YD6R",
   };
}

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();

async function sendMessageInHeadToHead(data, message) {
   try {
      await addDoc(collection(db, firebaseCollections.HEADTOHEAD), {
         ...data,
         message: message.trim(),
         timestamp: serverTimestamp(),
      });
   } catch (error) {
      console.error(error);
   }
}

function getHeadToHeadMessages(chatId, callback) {
   return onSnapshot(
      query(
         collection(db, firebaseCollections.HEADTOHEAD),
         where("chatId", "==", chatId),
         orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
         const messages = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
         }));

         callback(messages);
      }
   );
}

function getConversationList(callback, userId) {
   const userRef = doc(db, `user/${userId}`);

   return onSnapshot(
      query(collection(db, "chats"), where("users", "array-contains", userRef)),
      async (querySnapshot) => {
         const conversationList = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
         }));

         let tempArray = [];

         for (const conversationItem of conversationList) {
            let user = [];
            for (const item of conversationItem.users) {
               if (item.id !== userId) {
                  user = await getUserById(item.id);
                  user = { id: item.id, ...user };
               }
            }
            tempArray.push({
               id: conversationItem.id,
               user: user,
               unSeenMessages: false,
            });
         }

         // console.log("snap:getConversationList", tempArray);

         callback(tempArray, true);
      }
   );
}

export async function getUserById(id) {
   const docRef = doc(db, firebaseCollections.USER, id);
   const docSnap = await getDoc(docRef);

   return docSnap.data() || null;
}

function getUsers(callback) {
   return onSnapshot(
      query(collection(db, "user"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
         const users = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
         }));

         callback(users);
      }
   );
}

const getMessagesSnapshot = (conversationId, callback) => {
   return onSnapshot(
      query(
         collection(db, "message"),
         where("chatId", "==", conversationId),
         orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
         const messages = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
            timestamp: moment(new Date(x.data().timestamp.toDate())).format(
               "LT"
            ),
         }));

         callback(messages);
      }
   );
};

const getAllMessagesSnapshot = (conversationIds, callback, userId) => {
   return onSnapshot(
      query(
         collection(db, firebaseCollections.MESSAGE),
         where("chatId", "in", conversationIds),
         orderBy("timestamp", "asc")
      ),
      (querySnapshot) => {
         const messages = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
            timestamp: new Date(x.data().timestamp.toDate()).toString(),
         }));

         // console.log("snap:getAllMessagesSnapshot", messages);

         callback(messages, userId);
      }
   );
};

const getUserSnapshotByEmail = (email, callback) => {
   return onSnapshot(
      query(
         collection(db, firebaseCollections.USER),
         where("email", "==", email)
      ),
      (querySnapshot) => {
         const users = querySnapshot.docs.map((x) => ({
            id: x.id,
            ...x.data(),
            timestamp: moment(new Date(x.data()?.timestamp?.toDate())).format(
               "LLL"
            ),
         }));

         if (users[0] && callback)
            callback({
               userId: users[0].id,
               username: users[0].username,
               avatar: users[0].avatar,
            });
      }
   );
};

const sendMessageOneToOne = async (userId, chatId, message) => {
   //Add message to messages collection with chatId
   return await addDoc(collection(db, "message"), {
      userId,
      timestamp: Timestamp.now(),
      chatId,
      message,
      seen: false,
   });
};

const createUser = async (email, username, appId, avatar = 99) => {
   try {
      await addDoc(collection(db, "user"), {
         email,
         username,
         appId,
         avatar,
         timestamp: Timestamp.now(),
      });
   } catch (e) {
      console.log(e);
      return e;
   }
};

export async function updateUser(id, data) {
   return await setDoc(
      doc(db, firebaseCollections.USER, id),
      {
         ...data,
         // username: data.username,
         // email: data.email,
      },
      { merge: true }
   );
}

export async function updateMessagesSeenStatus(messageId, userId, chatId) {
   return await setDoc(
      doc(db, firebaseCollections.MESSAGE, messageId),
      {
         seen: true,
      },
      { merge: true }
   );
}

// FIXME:
export async function getUserByEmail(email) {
   // const q = query(collection(db, "user"), where("email", "==", userEmail));
   // const querySnapshot = await getDocs(q);
   // let user;
   // querySnapshot.forEach((doc) => {
   //    user = { id: doc.id, ...doc.data() };
   // });
   // return user;

   const collectionRef = collection(db, firebaseCollections.USER);
   let q = query(collectionRef, where("email", "==", email));
   const userDocs = await getDocs(q);

   let users = [];
   for (const item of userDocs.docs) {
      users.push({ id: item.id, ...item.data() });
   }

   return users[0];
}

export async function getUserByUsername(userName) {
   const q = query(collection(db, "user"), where("username", "==", userName));
   const querySnapshot = await getDocs(q);
   let user;
   querySnapshot.forEach((doc) => {
      user = doc.data();
   });
   return user;
}

export async function searchUserByUsername(username) {
   const collectionRef = collection(db, firebaseCollections.USER);
   let q = query(collectionRef, where("username", "==", username));
   const userDocs = await getDocs(q);

   let users = [];
   for (const item of userDocs.docs) {
      users.push({ id: item.id, ...item.data() });
   }

   return users;
}

const createChat = async (users) => {
   const userRefs = [doc(db, `user/${users[0]}`), doc(db, `user/${users[1]}`)];

   try {
      await addDoc(collection(db, "chats"), {
         timestamp: Timestamp.now(),
         users: userRefs,
      });
   } catch (e) {
      console.log(e);
      return e;
   }
};

export {
   sendMessageInHeadToHead,
   getHeadToHeadMessages,
   getConversationList,
   getMessagesSnapshot,
   sendMessageOneToOne,
   createUser,
   getUsers,
   createChat,
   getUserSnapshotByEmail,
   getAllMessagesSnapshot,
};
