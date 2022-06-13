import { initializeApp } from "firebase/app";
import {
   getAuth,
   onAuthStateChanged,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   connectAuthEmulator,
   AuthErrorCodes,
   signOut,
} from 'firebase/auth';
import refs from "./refs";
import authWithEmailPassword from "./authWithEmailPassword";
import handleLogin from "./handleLogin";
import handleRegister from "./handleRegister";


const URL = "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/users.json";

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
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Create new account using email/password

export async function createAccount() {  
   const email = refs.txtEmailRegister.value;
   const password = refs.txtPasswordRegister.value;

   try {
       await createUserWithEmailAndPassword(auth, email, password);
       ({user}) => {
                console.log(user);              
                email: user.email;
                id: user.uid;
                token: user.accessToken;               
            }
  
   } catch (error) {
      console.log(`There was an error: ${error}`);
    //   showLoginError(error);
   }
};

// Login using email/password

export async function loginEmailPassword () {
   const email = refs.txtEmailLogin.value;
   const password = refs.txtPasswordLogin.value;
   try {
       await signInWithEmailAndPassword(auth, email, password);
      ({user}) => {                
                email: user.email;
                id: user.uid;
                token: user.accessToken;              
            }
      
   } catch (error) {
      console.log(error);
      
   }
};














// const data = {
//     name: 'Mike',
//     email: 'some@mail.ru',
//     password: 12345,
// }
class Firebase {
    constructor() {
        this.URL = "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/users.json"; 
    }
    


    create(data) {
         
       return fetch(this.URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applicatiom/json'
            }
        })
           .then(response => response.json())
           .then(response => {
               data.id = response.name;
               return data;
         })
           
    }
      getUser() {
          return fetch(this.URL).then(response => response.json())
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
const email = 'some1@mail.ru';
const password = '123467';

// handleLogin(email, password)

// authWithEmailPassword(email, password).then(token => gettingDate.fetch(token)).then(console.log)


