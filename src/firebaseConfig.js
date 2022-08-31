// import your route components too

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { doc, getFirestore, updateDoc, increment } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics'

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
const realtimeRef = ref(getDatabase(app));
const firestoreRef = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);


const authenticateUser = async () => {
    try {
        await signInAnonymously(auth);
        return true;
    } catch (error) {
        console.log(error.code, error.message);
        return false;
    }
}

const docRef = doc(firestoreRef, "website-analytics", "pathsCalculated");
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
    const snapshot = await get(child(realtimeRef, `${timeControl}/${username}`))
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return false;
    }
}

const incrementPathsCount = async (attempts) => {
    if (attempts === 0) {
        console.error("count could not be incremented: most likely due to high traffic");
        return false;
    }
    if (!checkUserSignedIn()) {
        return false;
    }
    try {
        await updateDoc(docRef, {
            numberOfPathsCalculated: increment(1)
        });
    } catch {
        setTimeout(incrementPathsCount, 5000 / attempts, attempts - 1);
    }
}

const writePathToDatabase = async (player, count, timeControl) => {
    const docRef = doc(firestoreRef, "paths", timeControl);
    if (!checkUserSignedIn()) {
        return false;
    }
    await updateDoc(docRef, {
            [player.toLowerCase()]: count
    });
}


export {
    app,
    queryDatabase,
    incrementPathsCount,
    docRef,
    authenticateUser,
    auth,
    checkUserSignedIn,
    writePathToDatabase,
    analytics
}