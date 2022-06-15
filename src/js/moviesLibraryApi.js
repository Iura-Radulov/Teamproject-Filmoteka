import { getDatabase, ref, set, child, get } from 'firebase/database';
import { app } from './firebase/firebase';
import { Notify } from 'notiflix';

const database = getDatabase(app);

const addToWatchedBtn = document.getElementById('add-to-watched');
const addToQueueBtn = document.getElementById('add-to-queue');
// const showWatchedBtn = document.getElementById('show-watched');
// const showQueueBtn = document.getElementById('show-queue');
const showLibraryBtn = document.getElementById('library');
const container = document.querySelector('.films__container');

const WATCHED_MOVIES = 'watchedMovies/';
const MOVIES_QUEUE = 'queueOfMovies/';

addToWatchedBtn.addEventListener('click', onAddButtonClick);
addToQueueBtn.addEventListener('click', onAddButtonClick);
showLibraryBtn.addEventListener('click', onLibraryBtnClick);

async function onLibraryBtnClick() {
  const response = await fetchMoviesFromDatabase(WATCHED_MOVIES);
  showLibrary(response);
}

function onAddButtonClick(event) {
  const movieJson = event.target.dataset.movie;
  const id = Number(event.target.dataset.id);
  switch (event.target.id) {
    case 'add-to-watched':
      set(ref(database, `watchedMovies/${id}`), movieJson);

      removeBtnDataAttributes();
      break;

    case 'add-to-queue':
      set(ref(database, `queueOfMovies/${id}`), movieJson);

      removeBtnDataAttributes();
      break;

    default:
      break;
  }
}

export function addBtnDataAttributes(movie) {
  addToWatchedBtn.setAttribute('data-movie', JSON.stringify(movie));
  addToQueueBtn.setAttribute('data-movie', JSON.stringify(movie));
  addToWatchedBtn.setAttribute('data-id', movie.id);
  addToQueueBtn.setAttribute('data-id', movie.id);
}

export function removeBtnDataAttributes() {
  addToWatchedBtn.removeAttribute('data-movie');
  addToQueueBtn.removeAttribute('data-movie');
  addToWatchedBtn.removeAttribute('data-id');
  addToQueueBtn.removeAttribute('data-id');
}

function showLibrary(response) {
  const arrayOfJsons = Object.values(response);
  renderWatched(arrayOfJsons);
}
function fetchMoviesFromDatabase(category) {
  const dbRef = ref(database);
  return get(child(dbRef, category)).then(snapshot => {
    if (snapshot.exists()) {
      const response = snapshot.val();
      return response;
    } else {
      Notify.failure('Your library is empty');
    }
  });
}

function renderWatched(arrayOfJsons) {
  container.innerHTML = '';

  console.log(arrayOfJsons.map(json => JSON.parse(json)));
  const markup = arrayOfJsons
    .map(json => JSON.parse(json))
    .map(
      ({
        poster_path,
        original_title,
        original_name,
        genres,
        release_date,
        id,
        vote_average,
      }) => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" width="310" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film__info-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${
              genres.length > 2
                ? genres
                    .map(genre => genre.name)
                    .slice(0, 2)
                    .concat([' Other'])
                : genres.map(genre => genre.name)
            }</b >
            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
            <b class="rating">${vote_average}</b>
          </p>
        </div>
      </div>`
    )
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}

function renderQueue(arrayOfJsons) {
  container.innerHTML = '';

  const markup = arrayOfJsons
    .map(json => JSON.parse(json))
    .map(
      ({
        poster_path,
        original_title,
        original_name,
        genres,
        release_date,
        id,
        vote_average,
      }) => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" width="310" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film__info-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${
              genres.length > 2
                ? genres
                    .map(genre => genre.name)
                    .slice(0, 2)
                    .concat([' Other'])
                : genres.map(genre => genre.name)
            }</b >
            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
            <b class="rating">${vote_average}</b>
          </p>
        </div>
      </div>`
    );

  container.insertAdjacentHtml('beforeend', markup);
}
