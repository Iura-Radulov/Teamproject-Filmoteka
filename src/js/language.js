import { translation } from './translation';
const select = document.querySelector('.lang');
const formEl = document.querySelector('.search-form');
const registerFormSignUp = document.querySelector('.register-form__sign-up');
const registerFormSignIn = document.querySelector('.register-form__sign-in');
const allLang = ['en', 'ua'];

select.addEventListener('change', changeUrlLanguage);

export function changeUrlLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
}

function changeLanguagePlaceholder() {
  let hash = window.location.hash;
  hash = hash.substring(1);
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

export function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en';
    location.reload();
  }
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
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (hash === 'ua') {
    return 'uk';
  } else {
    return 'en-US';
  }
}
