import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import refs from "./refs";
import { loginEmailPassword } from './firebase';
import {resetForm, hideFormLoginRegister, showFormLoginRegister} from './handleRegister';
// refs.registerFormSignIn.addEventListener('submit', handleLogin);



 function handleLogin() {
   
   loginEmailPassword();
   // if (!error) {
      resetForm();
      hideFormLoginRegister();
   // }
   // else {
   //    showLoginError(error)
   //    }
        
   
   
}
    
function hideLoginError() {
   refs.divLoginError.style.display = 'none';
   refs.lblLoginErrorMessage.innerHTML = '';
};

export function showLoginError (error) {
   refs.divLoginError.style.display = 'block';
   console.log(error.message);
   if (error.code == 'auth/wrong-password') {
      refs.lblLoginErrorMessage.innerHTML = `Wrong password. Try again.`;
   } else {
      refs.lblLoginErrorMessage.innerHTML = `Error: ${error.message}`;
   }
};

function showFormLogin() {
   refs.signInContainer.style.display = 'flex';    
}


export function hideFormRegister() {
    refs.signUpContainer.style.display = 'none';   
}

function onBtnSignIn() {
    showFormLoginRegister();
    hideFormRegister();
    showFormLogin();
}

// onBtnSignIn()
refs.signInBtn.addEventListener('click', onBtnSignIn);
refs.signInLogin.addEventListener('click', onBtnSignIn);