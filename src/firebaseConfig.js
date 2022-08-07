// import your route components too

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const realtimeRef = ref(getDatabase(app));
const firestoreRef = getFirestore(app);

const docRef = doc(firestoreRef, "website-analytics", "SA1AXeSFSRW40GbAxFlg");

const queryDatabase = async (username, timeControl) => {
    /* database should be queried. If the database returns a value, then it should update userChain and return from the function */
    const snapshot = await get(child(realtimeRef, `${timeControl}/${username}`))
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return false;
    }
}

const incrementPathsCount = async () => {
    const currentCount = await getTotalPathsCount();
    if (currentCount !== false) {
        await updateDoc(docRef, {
            numberOfPathsCalculated: currentCount + 1
        });
    } else {
        console.error("document was not found");
    }
}

const getTotalPathsCount = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data().numberOfPathsCalculated;

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return false;
    }
}


export {
    app,
    queryDatabase,
    incrementPathsCount,
    getTotalPathsCount,
    docRef
}