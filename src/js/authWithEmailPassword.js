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





import { authWithEmailPassword } from './authWithEmailPassword'


const URL = "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/users.json";


const data = {
    name: 'George',
    email: 'some@mail.ru',
    password: 12345,
}
 class Firebase {
     create(data) {
       return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplicatiom/json'
            }
        })
           .then(response => response.json())
           .then(response => {
               data.id = response.name;
               return data;
         })
           
    }
      getUser() {
          return fetch(URL).then(response => response.json())
          .then(response => console.log(response))
        
      }
     fetch(token) {
         if (!token) {
             return Promise.resolve(console.error(error))
         }
         return fetch(`${URL}?auth=${token}`)
             .then(response => response.json())
             .then(data => {
                 if (data && data.error) {
                 return `<p>${data.error}</p>`
                 }
                 return data ? Object.keys(data).map(key => ({
                     ...data[key],
                     id: key
                 })) : []
         })
     }
}
function sentData(data) {
    const user1 = new Firebase();
    const sentDat = user1.create(data);
console.log(sentDat);
}

// sentData(data)

const gettingDate = new Firebase();
// gettingDate.getUser()
const email = 'some@mail.ru';
const password = 123456;
authWithEmailPassword(email, password).then(console.log(data))





