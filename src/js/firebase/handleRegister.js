import refs from "./refs";
import {hideFormRegister} from './handleLogin'
import { createAccount, hideOverlay } from "./firebase";

    
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


export function hideFormLogin() {
    refs.signInContainer.style.display = 'none';
   }


export function showRegisterError(error) {
  refs.divLoginError1.style.display = 'block';
   refs.lblLoginErrorMessage1.innerHTML = `Error: ${error.message}`;
  }


function showFormRegister() {
   refs.signUpContainer.style.display = 'flex';  
}


function onBtnSignUp() {
    showFormLoginRegister();
   hideFormLogin();
   hideOverlay();
    showFormRegister();
}



refs.signUpBtn.addEventListener('click', onBtnSignUp);
refs.signUpButtonClose.addEventListener('click', () => {  
   hideFormLoginRegister();   
      hideFormRegister();
})
