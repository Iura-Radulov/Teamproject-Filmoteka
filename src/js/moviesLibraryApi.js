import { getDatabase, ref, set, child, get, remove } from 'firebase/database';
import { app } from './firebase/firebase';
import { getAuth } from 'firebase/auth';
import { Notify } from 'notiflix';

const database = getDatabase(app);
const auth = getAuth(app);

const showWatchedBtn = document.getElementById('watched');
const showQueueBtn = document.getElementById('queue');
const showLibraryBtn = document.getElementById('library');
const showHomeBtn = document.getElementById('home');
const search = document.querySelector('.search-form');
const container = document.querySelector('.films__container');
const libraryButtons = document.querySelector('.buttons');
const header = document.querySelector('.header');
const emptyListMessage = document.querySelector('.films__empty-list-thumb');
const mainPagination = document.querySelector('.pagination');

const WATCHED_MOVIES = 'watchedMovies/';
const MOVIES_QUEUE = 'queueOfMovies/';
const IS_HIDDEN = 'is-hidden';
const CURRENT_LINK = 'current-link';
const HEADER_BGR = 'header__background';
const HEADER_BGR_LIBRARY = 'header__background-library';
const ACTIVE = 'active';

showWatchedBtn.addEventListener('click', onWatchedBtnClick);
showQueueBtn.addEventListener('click', onQueueBtnClick);
showLibraryBtn.addEventListener('click', onLibraryBtnClick);
showHomeBtn.addEventListener('click', onHomeBtnClick);

function getUserId() {
  return auth.currentUser?.uid;
}

function onHomeBtnClick() {
  hideEmptyListMessage();
  switchToHomeHeader();
}

async function onLibraryBtnClick() {
  const userId = getUserId();
  if (!userId) {
    Notify.warning('You should sign in first!', {
      timeout: 1000,
      opacity: 0.9,
      width: '150px',
      clickToClose: true,
      pauseOnHover: false,
    });
    return;
  }

  mainPagination.classList.add(IS_HIDDEN);

  switchToLibraryHeader();

  const response = await fetchMoviesFromDatabase(WATCHED_MOVIES);
  showLibrary(response);
}

async function onWatchedBtnClick() {
  makeWatchedBtnActive();
  hideEmptyListMessage();

  const response = await fetchMoviesFromDatabase(WATCHED_MOVIES);
  if (!response) {
    return;
  }
  const arrayOfJsons = Object.values(response);
  renderWatched(arrayOfJsons);
}

async function onQueueBtnClick() {
  makeQueueBtnActive();
  hideEmptyListMessage();

  const response = await fetchMoviesFromDatabase(MOVIES_QUEUE);
  if (!response) {
    return;
  }
  const arrayOfJsons = Object.values(response);
  renderQueue(arrayOfJsons);
}

async function onAddButtonClick(event) {
  const userId = getUserId();

  if (!userId) {
    Notify.warning('You should sign in first');
    return;
  }

  const movieJson = event.target.dataset.movie;
  const id = Number(event.target.dataset.id);
  switch (event.target.id) {
    case 'add-to-watched':
      set(ref(database, `users/${userId}/watchedMovies/${id}`), movieJson);

      removeBtnDataAttributes(event.target);
      break;

    case 'add-to-queue':
      set(ref(database, `users/${userId}/queueOfMovies/${id}`), movieJson);

      removeBtnDataAttributes(event.target);
      break;

    case 'remove-from-watched':
      remove(ref(database, `users/${userId}/watchedMovies/${id}`));

      removeBtnDataAttributes(event.target);

      reRenderListOnLibraryChange(WATCHED_MOVIES);
      break;

    case 'remove-from-queue':
      remove(ref(database, `users/${userId}/queueOfMovies/${id}`));

      removeBtnDataAttributes(event.target);

      reRenderListOnLibraryChange(MOVIES_QUEUE);
      break;

    default:
      break;
  }
}

function databaseContainsMovie(category, movieId, userId) {
  return get(ref(database, `users/${userId}/${category}${movieId}`)).then(
    snapshot => snapshot.exists()
  );
}

export function createButtonRefs() {
  const addToWatchedBtn = document.getElementById('add-to-watched');
  const addToQueueBtn = document.getElementById('add-to-queue');

  return { addToWatchedBtn, addToQueueBtn };
}

export function addBtnEventListeners(buttons) {
  const { addToWatchedBtn, addToQueueBtn } = buttons;
  addToWatchedBtn.addEventListener('click', onAddButtonClick);
  addToQueueBtn.addEventListener('click', onAddButtonClick);
}

export async function addBtnDataAttributes(movie, buttons) {
  const { addToWatchedBtn, addToQueueBtn } = buttons;
  const userId = getUserId();

  addToWatchedBtn.setAttribute('data-movie', JSON.stringify(movie));
  addToQueueBtn.setAttribute('data-movie', JSON.stringify(movie));
  addToWatchedBtn.setAttribute('data-id', movie.id);
  addToQueueBtn.setAttribute('data-id', movie.id);

  const isInWatchlist = await databaseContainsMovie(
    WATCHED_MOVIES,
    movie.id,
    userId
  );

  if (isInWatchlist) {
    changeWatchedBtn(addToWatchedBtn);
  }
  const isInQueue = await databaseContainsMovie(MOVIES_QUEUE, movie.id, userId);
  if (isInQueue) {
    changeQueueBtn(addToQueueBtn);
  }
}

function removeBtnDataAttributes(button) {
  button.removeAttribute('data-movie');
  button.removeAttribute('data-id');
}
function changeWatchedBtn(addToWatchedBtn) {
  addToWatchedBtn.id = 'remove-from-watched';
  addToWatchedBtn.textContent = 'Delete from watched';
}
function changeQueueBtn(addToQueueBtn) {
  addToQueueBtn.id = 'remove-from-queue';
  addToQueueBtn.textContent = 'Delete from queue';
}

function showLibrary(response) {
  if (!response) {
    return;
  }
  const arrayOfJsons = Object.values(response);
  renderWatched(arrayOfJsons);
}

function fetchMoviesFromDatabase(category) {
  const userId = getUserId();
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/${category}`)).then(snapshot => {
    if (snapshot.exists()) {
      const response = snapshot.val();
      return response;
    } else {
      container.innerHTML = '';
      showEmptyListMessage();
      return;
    }
  });
}

function renderWatched(arrayOfJsons) {
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
          <p class="info-item film__info-desc">
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

  container.insertAdjacentHTML('beforeend', markup);
}
async function reRenderListOnLibraryChange(category) {
  const response = await fetchMoviesFromDatabase(category);
  const arrayOfJsons = Object.values(response);
  renderWatched(arrayOfJsons);
}

function makeWatchedBtnActive() {
  showWatchedBtn.classList.add(ACTIVE);
  showQueueBtn.classList.remove(ACTIVE);
}
function makeQueueBtnActive() {
  showQueueBtn.classList.add(ACTIVE);
  showWatchedBtn.classList.remove(ACTIVE);
}
function switchToLibraryHeader() {
  showLibraryBtn.classList.add(CURRENT_LINK);
  showHomeBtn.classList.remove(CURRENT_LINK);
  libraryButtons.classList.remove(IS_HIDDEN);
  search.classList.add(IS_HIDDEN);
  header.classList.add(HEADER_BGR_LIBRARY);
  header.classList.remove(HEADER_BGR);

  makeWatchedBtnActive();
}
function switchToHomeHeader() {
  libraryButtons.classList.add(IS_HIDDEN);
  search.classList.remove(IS_HIDDEN);
  header.classList.remove(HEADER_BGR_LIBRARY);
  header.classList.add(HEADER_BGR);
}
function showEmptyListMessage() {
  emptyListMessage.classList.remove(IS_HIDDEN);
}
function hideEmptyListMessage() {
  emptyListMessage.classList.add(IS_HIDDEN);
}
