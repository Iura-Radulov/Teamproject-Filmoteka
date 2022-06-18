import { translation } from './translation';
const select = document.querySelector('.lang');
const allLang = ['en', 'ua'];

select.addEventListener('change', changeUrlLanguage);

function changeUrlLanguage() {
  let lang = select.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
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

document.querySelector('.lang-in');

changeLanguage();

export function chooseLanguageApi() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (hash === 'ua') {
    return 'uk';
  } else {
    return 'en-US';
  }
}
