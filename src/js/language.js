import { translation } from './translation';
const select = document.querySelector('.lang');
const formEl = document.querySelector('.search-form');
const registerFormSignUp = document.querySelector('.register-form__sign-up');
const registerFormSignIn = document.querySelector('.register-form__sign-in');

const LOCALSTORAGE_KEY3 = 'select_lang';
select.addEventListener('change', changeLocStLanguage);

export function changeLocStLanguage() {
  if (localStorage.getItem(LOCALSTORAGE_KEY3)) {
    localStorage.removeItem(LOCALSTORAGE_KEY3);
  }
  let chooseLang = select.value;
  localStorage.setItem(LOCALSTORAGE_KEY3, chooseLang);
  location.reload();
}

function changeLanguagePlaceholder() {
  let hash = hashValue();
  if (hash === 'ua') {
    formEl[0].placeholder = 'Пошук фільмів...';
    registerFormSignUp[1].placeholder = 'Емейл';
    registerFormSignUp[2].placeholder = 'Пароль';
    registerFormSignIn[1].placeholder = 'Емейл';
    registerFormSignIn[2].placeholder = 'Пароль';
  } else {
    formEl[0].placeholder = 'Search movies...';
    registerFormSignUp[1].placeholder = 'Email';
    registerFormSignUp[2].placeholder = 'Password';
    registerFormSignIn[1].placeholder = 'Email';
    registerFormSignIn[2].placeholder = 'Password';
  }
}

export default function hashValue() {
  if (localStorage.getItem('select_lang')) {
    return localStorage.getItem('select_lang');
  } else {
    return 'en';
  }
}

export function changeLanguage() {
  let hash = hashValue();
  select.value = hash;
  for (let key in translation) {
    let elem = document.querySelector('.lang-' + key);
    if (elem) {
      elem.innerHTML = translation[key][hash];
    }
    if (!hash) {
      elem.innerHTML = '';
    }
  }
}

changeLanguage();
changeLanguagePlaceholder();

export function chooseLanguageApi() {
  let hash = hashValue();
  if (hash === 'ua') {
    return 'uk';
  } else {
    return 'en-US';
  }
}
