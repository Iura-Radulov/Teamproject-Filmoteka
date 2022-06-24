import NewApiSearchFilms from './NewApiSearchFilms';
import NewApiPopularFilms from './NewApiPopularFilms';
import createFilmsList from './createFilmsList';
import createFilmCard from './createFilmCard';
import fetchFilmModal from './fetchFilmModal';
import Notiflix from 'notiflix';
import './language';
import hashValue from './language';
import { changeLanguage } from './language';
import { chooseLanguageApi } from './language';
import { openLoading, closeLoading } from './loader';
import {
  addBtnDataAttributes,
  addBtnEventListeners,
  createButtonRefs,
} from './library/moviesLibraryApi';
import { renderPagination } from './pagination';

export let popularSearch;
export let textSearch;
const newApiSearchFilm = new NewApiSearchFilms();
const newApiPopularFilms = new NewApiPopularFilms();
let hash = hashValue();

const filmsContainer = document.querySelector('.films__container');
const backdropEl = document.querySelector('.backdrop');
const modalFilmInfoEl = document.querySelector('.modal_film-info');
const btnModal = document.querySelector('.modal_film__button--close');
const formEl = document.querySelector('.search-form');
const showHomeBtn = document.getElementById('home');
const showLibraryBtn = document.getElementById('library');
const logoBtn = document.querySelector('.logo');
const libraryButtons = document.querySelector('.buttons');
const closeModalBtn = document.querySelector('[team-data-close]');
const select = document.querySelector('.lang');
const LOCALSTORAGE_KEY3 = 'select_lang';

document.addEventListener('DOMContentLoaded', startPopularFilms);
showHomeBtn.addEventListener('click', startPopularFilms);
logoBtn.addEventListener('click', onLogoClick);
filmsContainer.addEventListener('click', onFilmClick);
formEl.addEventListener('submit', onSearchFilm);

function onLogoClick(event) {
  event.preventDefault();
  startPopularFilms();
}

export async function startPopularFilms() {
  formEl[0].value = '';
  clearFilmsContainer();
  const currentLanguage = chooseLanguageApi();
  newApiPopularFilms.resetPage();
  showHomeBtn.classList.add('current-link');
  showLibraryBtn.classList.remove('current-link');
  formEl.classList.remove('is-hidden');
  libraryButtons.classList.add('is-hidden');
  openLoading();
  try {
    const dates = await newApiPopularFilms.fetchFilmsCards(currentLanguage);
    popularSearch = 'popular';
    renderPagination(dates.total_pages);
    const markup = createFilmsList(dates);
    filmsContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.log(error.message);
  }
  closeLoading();
}

function onFilmClick(event) {
  openLoading();
  event.preventDefault();
  modalFilmInfoEl.innerHTML = '';
  if (!event.target.dataset.id) {
    return;
  } else {
    const currentLanguage = chooseLanguageApi();
    fetchFilmModal(event.target.dataset.id, currentLanguage)
      .then(movie => {
        if (!movie) {
          if (hash === 'ua') {
            return Notiflix.Notify.info('Ваш запит не знайдено.', {
              timeout: 3000,
              opacity: 0.9,
              width: '150px',
              clickToClose: true,
              pauseOnHover: false,
            });
          } else {
            return Notiflix.Notify.info(
              'The resource you requested could not be found.',
              {
                timeout: 3000,
                opacity: 0.9,
                width: '150px',
                clickToClose: true,
                pauseOnHover: false,
              }
            );
          }
        } else {
          const markup = createFilmCard(movie);
          backdropEl.classList.remove('is-hidden');
          document.body.classList.toggle('modal-open');
          btnModal.addEventListener('click', onBtnModalClick);
          backdropEl.addEventListener('click', onBackdropClick);
          document.addEventListener('keydown', onEscKeyPress);
          modalFilmInfoEl.insertAdjacentHTML('beforeend', markup);
          changeLanguage();

          const buttons = createButtonRefs();
          addBtnEventListeners(buttons);
          addBtnDataAttributes(movie, buttons);
        }
      })
      .catch(error => console.log(error));
  }
  closeLoading();
}

function onSearchFilm(event) {
  event.preventDefault();

  textSearch = event.currentTarget.elements.searchQuery.value.trim();
  newApiSearchFilm.query =
    event.currentTarget.elements.searchQuery.value.trim();
  if (newApiSearchFilm.query === '') {
    if (hash === 'ua') {
      return Notiflix.Notify.info('Введіть, будь ласка, дані пошуку.', {
        timeout: 3000,
        opacity: 0.9,
        width: '150px',
        clickToClose: true,
        pauseOnHover: false,
      });
    } else {
      return Notiflix.Notify.info('Please enter search data.', {
        timeout: 3000,
        opacity: 0.9,
        width: '150px',
        clickToClose: true,
        pauseOnHover: false,
      });
    }
  }
  openLoading();
  newApiSearchFilm.resetPage();
  const currentLanguage = chooseLanguageApi();

  newApiSearchFilm
    .searchFilm(currentLanguage)
    .then(dates => {
      const filmArray = dates.results;

      if (filmArray.length === 0) {
        if (hash === 'ua') {
          return Notiflix.Notify.info(
            'На жаль, немає фільмів, які відповідають вашому пошуковому запиту. Будь ласка, спробуйте ще раз.',
            {
              timeout: 3000,
              opacity: 0.9,
              width: '150px',
              clickToClose: true,
              pauseOnHover: false,
            }
          );
        } else {
          return Notiflix.Notify.info(
            'Sorry, there are no movies matching your search query. Please try again.',
            {
              timeout: 3000,
              opacity: 0.9,
              width: '150px',
              clickToClose: true,
              pauseOnHover: false,
            }
          );
        }
      } else {
        clearFilmsContainer();
        const markup = createFilmsList(dates);
        filmsContainer.insertAdjacentHTML('afterbegin', markup);
      }
      popularSearch = 'search';
      renderPagination(dates.total_pages);
    })
    .catch(error => console.log(error));
  closeLoading();
}

function onBackdropClick(event) {
  if (event.target !== backdropEl) {
    return;
  }
  backdropEl.classList.add('is-hidden');
  document.body.classList.toggle('modal-open');
  backdropEl.removeEventListener('click', onBackdropClick);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    backdropEl.classList.add('is-hidden');
    document.body.classList.toggle('modal-open');
    document.removeEventListener('keydown', onEscKeyPress);
  }
}

function onBtnModalClick() {
  backdropEl.classList.add('is-hidden');
  document.body.classList.toggle('modal-open');
  backdropEl.removeEventListener('click', onBackdropClick);
}

function clearFilmsContainer() {
  filmsContainer.innerHTML = '';
}
