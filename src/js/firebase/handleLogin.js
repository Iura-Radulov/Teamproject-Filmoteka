import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import refs from "./refs";
import { loginEmailPassword } from './firebase';
import {resetForm, hideFormLoginRegister} from './handleRegister';
refs.registerFormSignIn.addEventListener('submit', handleLogin);



function handleLogin() {
    loginEmailPassword();
    hideLoginError();
      resetForm();
      hideFormLoginRegister();
        
           
}
    
function hideLoginError() {
   refs.divLoginError.style.display = 'none';
   refs.lblLoginErrorMessage.innerHTML = '';
};

function showLoginError (error) {
   refs.divLoginError.style.display = 'block';
   if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
      refs.lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
   } else {
      refs.lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
   }
};

