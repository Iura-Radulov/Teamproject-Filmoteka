import './sass/index.scss';
import NewApiSearchFilms from './js/NewApiSearchFilms';
import NewApiPopularFilms from './js/NewApiPopularFilms';
import createFilmsList from './js/createFilmsList';
import createFilmCard from './js/createFilmCard';
import fetchFilmModal from './js/fetchFilmModal';

const newApiSearchFilm = new NewApiSearchFilms();
const newApiPopularFilms = new NewApiPopularFilms();

const filmsContainer = document.querySelector('.films__container');
const backdropEl = document.querySelector('.backdrop');
const modalFilmInfoEl = document.querySelector('.modal_film-info');
const btnModal = document.querySelector('.modal_film__button--close');

document.addEventListener('DOMContentLoaded', startPopularFilms);
filmsContainer.addEventListener('click', onFilmClick);
btnModal.addEventListener('click', onBtnModalClick);

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

function clearFilmsContainer() {
  filmsContainer.innerHTML = '';
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
          const markup = createFilmCard(movie);
          backdropEl.classList.remove('is-hidden');
          document.body.classList.toggle('modal-open');
          modalFilmInfoEl.insertAdjacentHTML('beforeend', markup);
        }
      })
      .catch(error => console.log(error));
  }
}

function onBtnModalClick() {
  backdropEl.classList.add('is-hidden');
  document.body.classList.toggle('modal-open');
}
