import NewApiSearchFilms from './NewApiSearchFilms';
import NewApiPopularFilms from './NewApiPopularFilms';
import createFilmsList from './createFilmsList';
import createFilmCard from './createFilmCard';
import fetchFilmModal from './fetchFilmModal';
import Notiflix from 'notiflix';
import { addBtnDataAttributes } from './moviesLibraryApi';
const newApiSearchFilm = new NewApiSearchFilms();
const newApiPopularFilms = new NewApiPopularFilms();

const filmsContainer = document.querySelector('.films__container');
const backdropEl = document.querySelector('.backdrop');
const modalFilmInfoEl = document.querySelector('.modal_film-info');
const btnModal = document.querySelector('.modal_film__button--close');
const formEl = document.querySelector('.search-form');

document.addEventListener('DOMContentLoaded', startPopularFilms);
filmsContainer.addEventListener('click', onFilmClick);
formEl.addEventListener('submit', onSearchFilm);

async function startPopularFilms() {
  clearFilmsContainer();
  newApiPopularFilms.resetPage();
  try {
    const dates = await newApiPopularFilms.fetchFilmsCards();
    console.log(dates);
    const markup = createFilmsList(dates);
    filmsContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.log(error.message);
  }
}

function onFilmClick(event) {
  modalFilmInfoEl.innerHTML = '';
  console.log(event.target);
  console.log(event.currentTarget);
  if (!event.target.dataset.id) {
    return;
  } else {
    console.log(event.target.dataset.id);
    fetchFilmModal(event.target.dataset.id)
      .then(movie => {
        console.log(movie);
        if (!movie) {
          return alert('The resource you requested could not be found.');
        } else {
          addBtnDataAttributes(movie);
          const markup = createFilmCard(movie);
          backdropEl.classList.remove('is-hidden');
          document.body.classList.toggle('modal-open');
          btnModal.addEventListener('click', onBtnModalClick);
          backdropEl.addEventListener('click', onBackdropClick);
          document.addEventListener('keydown', onEscKeyPress);
          modalFilmInfoEl.insertAdjacentHTML('beforeend', markup);
        }
      })
      .catch(error => console.log(error));
  }
}

function onSearchFilm(event) {
  event.preventDefault();
  clearFilmsContainer();
  console.log(event.currentTarget);

  newApiSearchFilm.query =
    event.currentTarget.elements.searchQuery.value.trim();
  console.log(newApiSearchFilm.searchQuery);
  if (newApiSearchFilm.query === '') {
    return Notiflix.Notify.info('Please enter search data.');
  }
  newApiSearchFilm.resetPage();

  newApiSearchFilm
    .searchFilm()
    .then(dates => {
      console.log(dates);
      const filmArray = dates[0].results;
      const genreArray = dates[1].genres;
      console.log(filmArray);
      console.log(genreArray);

      if (filmArray.length === 0) {
        return Notiflix.Notify.info(
          'Sorry, there are no movies matching your search query. Please try again.'
        );
      } else {
        const markup = createFilmsList(dates);
        filmsContainer.insertAdjacentHTML('afterbegin', markup);
      }
    })
    .catch(error => console.log(error));
}

function onBackdropClick() {
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
