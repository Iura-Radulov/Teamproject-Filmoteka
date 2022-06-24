import refs from './refs';
import { hideOverlay, loginEmailPassword, monitorAuthState } from './firebase';
import {
  resetForm,
  hideFormLoginRegister,
  showFormLoginRegister,
  hideFormLogin,
} from './handleRegister';
import hashValue from '../language';
const hash = hashValue();

export function hideLoginError() {
  refs.divLoginError2.style.display = 'none';
  refs.lblLoginErrorMessage2.innerHTML = '';
}

export function showLoginError(error) {
  refs.divLoginError2.style.display = 'block';

  if (error.code == 'auth/wrong-password') {
    hash === 'ua'
      ? (refs.lblLoginErrorMessage2.innerHTML = `Невірний пароль. Спробуйте ще раз.`)
      : (refs.lblLoginErrorMessage2.innerHTML = `Wrong password. Try again.`);
  } else {
    hash === 'ua'
      ? (refs.lblLoginErrorMessage2.innerHTML = `Помилка: ${error.message}`)
      : (refs.lblLoginErrorMessage2.innerHTML = `Error: ${error.message}`);
  }
}

export function showFormLogin() {
  refs.signInContainer.style.display = 'flex';
}

export function hideFormRegister() {
  refs.signUpContainer.style.display = 'none';
}

export function onBtnSignIn() {
  showFormLoginRegister();
  hideFormRegister();
  hideOverlay();
  showFormLogin();
}

refs.signInBtn.addEventListener('click', onBtnSignIn);
refs.signInLogin.addEventListener('click', onBtnSignIn);
refs.signInButtonClose.addEventListener('click', () => {
  hideFormLoginRegister();
  hideFormLogin();
  monitorAuthState();
});
