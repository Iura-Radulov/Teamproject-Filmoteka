import { initializeApp } from "firebase/app";
const API_KEY = "AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw"

export default function authWithEmailPassword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true,
        }),
        headers: {
                'Content-Type': 'aplicatiom/json'
            }
        
    })
        .then(response => response.json())
        .then(data => data.idToken)
        .catch(error => console.log(error))
}



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw",
  authDomain: "filmoteka-goit-6e05f.firebaseapp.com",
  databaseURL: "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com",
  projectId: "filmoteka-goit-6e05f",
  storageBucket: "filmoteka-goit-6e05f.appspot.com",
  messagingSenderId: "281727023613",
  appId: "1:281727023613:web:ae072f932b4bc661d88194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);










