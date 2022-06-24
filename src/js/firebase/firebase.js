import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import refs from './refs';
import {
  showLoginError,
  showFormLogin,
  hideLoginError,
  onBtnSignIn,
} from './handleLogin';
import {
  hideFormLoginRegister,
  resetForm,
  showFormLoginRegister,
  showRegisterError,
} from './handleRegister';
import { startPopularFilms } from '../fetchdata';
import hashValue from '../language';
const hash = hashValue();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw',
  authDomain: 'filmoteka-goit-6e05f.firebaseapp.com',
  databaseURL: 'https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-goit-6e05f',
  storageBucket: 'filmoteka-goit-6e05f.appspot.com',
  messagingSenderId: '281727023613',
  appId: '1:281727023613:web:ae072f932b4bc661d88194',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create new account using email/password

export async function createAccount(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    ({ user }) => {
      console.log(user);
      email: user.email;
      id: user.uid;
      token: user.accessToken;
    };
    resetForm();
    hideFormLoginRegister();
  } catch (error) {
    console.log(`There was an error: ${error}`);
    showRegisterError(error);
    resetForm();
  }
}

// Login using email/password

export async function loginEmailPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    ({ user }) => {
      email: user.email;
      id: user.uid;
      token: user.accessToken;
    };

    resetForm();
    hideLoginError();
    hideFormLoginRegister();
  } catch (error) {
    console.log(error);
    showLoginError(error);
    resetForm();
  }
}

// Log out
async function logout() {
  try {
    await signOut(auth);
    showOverlay();
  } catch (error) {
    console.log(error);
  }
}

// Monitor auth state
export async function monitorAuthState() {
  onAuthStateChanged(auth, user => {
    if (user) {
      hideLoginError();
      refs.boxLoginLogout.style.display = 'flex';
      refs.loginUser.innerHTML = `${user.email} `;
      refs.btnLogout.removeEventListener('click', showFormLoginRegister);
      refs.btnLogout.addEventListener('click', logout);
      hash === 'ua'
        ? (refs.btnLogout.innerHTML = 'Вийти')
        : (refs.btnLogout.innerHTML = 'Log out');
      refs.loginContainer.classList.add('is-hidden');
    } else {
      refs.loginContainer.classList.remove('is-hidden');
      refs.boxLoginLogout.style.display = 'none';
      refs.btnLogout.removeEventListener('click', logout);
      refs.btnLogout.addEventListener('click', showFormLoginRegister);
    }
  });
}

monitorAuthState();

refs.registerFormSignUp.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();
  createAccount(email, password);
});

refs.registerFormSignIn.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value.trim();
  const password = e.target.password.value.trim();
  loginEmailPassword(email, password);
});

function showOverlay() {
  refs.overlayBackdrop.style.display = 'flex';
}

export function hideOverlay() {
  refs.overlayBackdrop.style.display = 'none';
  startPopularFilms();
}

refs.overlayBtnClose.addEventListener('click', hideOverlay);

refs.overlayBtn.addEventListener('click', onBtnSignIn);

refs.btnLogout.addEventListener('click', logout);
