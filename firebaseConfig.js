// import your route components too

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const queryDatabase = async (username, timeControl) => {
    /* database should be queried. If the database returns a value, then it should update userChain and return from the function */
    const dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, `${timeControl}/${username}`))
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return false;
    }
}

export {
    app,
    queryDatabase
}