import refs from "./refs";
// import Firebase from './firebase'
import {hideFormRegister} from './handleLogin'
refs.registerFormSignUp.addEventListener('submit', handleRegister);



import { createAccount } from "./firebase";

function handleRegister() {
   createAccount();
    resetForm();
    hideFormLoginRegister()
}
    
export function resetForm() {
   refs.txtEmailLogin.value = '';
   refs.txtPasswordLogin.value = '';
   refs.txtEmailRegister.value = '';
   refs.txtPasswordRegister.value = '';
};
export function showFormLoginRegister() {
   refs.formLogin.style.display = 'flex';
   window.addEventListener('keydown', hideFormLoginRegisterByKey);
};
export function hideFormLoginRegisterByKey(e) {
   if (e.key === 'Escape') {
      hideFormLoginRegister();
      hideFormLogin();
      hideFormRegister();
      window.removeEventListener('keydown', hideFormLoginRegisterByKey);
   }
};
export function hideFormLoginRegister() {
   refs.formLogin.style.display = 'none';
};


function hideFormLogin() {
    refs.signInContainer.style.display = 'none';
   // refs.signInContainer.classList.add('is-hidden');
}


function showFormRegister() {
   refs.signUpContainer.style.display = 'flex';
   // refs.signUpContainer.classList.remove('is-hidden');
}

// showFormLoginRegister()
hideFormLoginRegister()

function onBtnSignUp() {
    showFormLoginRegister();
    hideFormLogin();
    showFormRegister();
}

refs.signUpBtn.addEventListener('click', onBtnSignUp);
