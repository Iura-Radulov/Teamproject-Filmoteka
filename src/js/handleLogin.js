import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function handleLogin (email, password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {                
                email: user.email;
                id: user.uid;
                token: user.accessToken;              
            })
           .catch(() => alert('Invalid user!'))    
    }