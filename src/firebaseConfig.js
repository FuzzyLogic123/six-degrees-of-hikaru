// import your route components too

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { doc, getDoc, getFirestore, updateDoc, increment, writeBatch, collection, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNc10Vn-xhqZo6CZj0Bab16joT6QcSGY8",
    authDomain: "six-degrees-of-hikaru-cf099.firebaseapp.com",
    projectId: "six-degrees-of-hikaru-cf099",
    storageBucket: "six-degrees-of-hikaru-cf099.appspot.com",
    messagingSenderId: "949551459463",
    appId: "1:949551459463:web:c66c01a3bb9a51d9bddc22",
    measurementId: "G-SPG3W4WQ2Q"
};

import { getAuth, signInAnonymously } from "firebase/auth";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realtime = ref(getDatabase(app));
const firestore = getFirestore(app);
const auth = getAuth();


const authenticateUser = async () => {
    try {
        await signInAnonymously(auth);
        console.log("User succesfully authenticated");
        return true;
    } catch (error) {
        console.log(error.code, error.message);
        return false;
    }
}

const docRef = doc(firestore, "website-analytics", "SA1AXeSFSRW40GbAxFlg");
const checkUserSignedIn = () => {
    const user = auth.currentUser;
    if (user) {
        return true;
    } else {
        return false;
    }
}


const queryDatabase = async (username, timeControl) => {
    if (!checkUserSignedIn()) {
        return false;
    }
    /* database should be queried. If the database returns a value, then it should update userChain and return from the function */
    const snapshot = await get(child(realtime, `${timeControl}/${username}`))
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return false;
    }
}

const incrementPathsCount = async () => {
    const num_shards = 3
    if (!checkUserSignedIn()) {
        return false;
    }
    const shardID = Math.floor(Math.random() * num_shards).toString();
    const docRef = doc(firestore, "website-analytics", "counter", "shards", shardID);
    await updateDoc(docRef, {
        count: increment(1)
    });
}

const getTotalPathsCount = async () => {
    let totalCount = 0;
    const docRef = doc(firestore, "website-analytics", "counter");
    const querySnapshot = await getDocs(collection(docRef, "shards"));
    querySnapshot.forEach((doc) => {
        totalCount += doc.data().count;
    })
    return totalCount;
}



export {
    app,
    queryDatabase,
    incrementPathsCount,
    getTotalPathsCount,
    docRef,
    authenticateUser,
    auth,
    checkUserSignedIn
}