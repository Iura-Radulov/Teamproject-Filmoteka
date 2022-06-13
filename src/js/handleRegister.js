import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function handleRegister(email, password) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                console.log(user);              
                email: user.email;
                id: user.uid;
                token: user.accessToken;               
            })
            .catch(console.error)
}
    
// handleRegister(email, password)