import { getDatabase, ref, set, child, get, remove } from 'firebase/database';
import { app } from './firebase/firebase';
import { getAuth } from 'firebase/auth';
import { Notify } from 'notiflix';
import { openLoading, closeLoading } from './loader';
import { renderPagination } from './pagination';
import refs from './firebase/refs';
import {
  makeWatchedBtnActive,
  makeQueueBtnActive,
  switchToLibraryHeader,
  switchToHomeHeader,
  showEmptyListMessage,
  hideEmptyListMessage,
  showMainPagination,
  showWatchedPagination,
  showQueuePagination,
  CURRENT_LINK,
} from './libraryUi';

const database = getDatabase(app);
const auth = getAuth(app);

export const WATCHED_MOVIES = 'watchedMovies/';
export const MOVIES_QUEUE = 'queueOfMovies/';

const hash = window.location.hash.substring(1);

refs.showWatchedBtn.addEventListener('click', onLibraryCategoryButtonClick);
refs.showQueueBtn.addEventListener('click', onLibraryCategoryButtonClick);
refs.showLibraryBtn.addEventListener('click', onLibraryBtnClick);
refs.showHomeBtn.addEventListener('click', onHomeBtnClick);

function onLibraryCategoryButtonClick(event) {
  openLoading();

  hideEmptyListMessage();
  switch (event.target.id) {
    case 'watched':
      makeWatchedBtnActive();
      handleFetchAndRender(WATCHED_MOVIES);
      break;

    case 'queue':
      makeQueueBtnActive();
      handleFetchAndRender(MOVIES_QUEUE);

    default:
      break;
  }

  closeLoading();
}

function onLibraryBtnClick() {
  openLoading();

  const userId = getUserId();
  checkIfLoggedIn(userId);
  showWatchedPagination();
  switchToLibraryHeader();
  handleFetchAndRender(WATCHED_MOVIES);

  closeLoading();
}
function onHomeBtnClick() {
  hideEmptyListMessage();
  switchToHomeHeader();
  showMainPagination();
}
function onAddButtonClick(event) {
  openLoading();

  const userId = getUserId();
  checkIfLoggedIn(userId);

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

      if (!refs.showLibraryBtn.classList.contains(CURRENT_LINK)) {
        return;
      }

      handleFetchAndRender(WATCHED_MOVIES);
      break;

    case 'remove-from-queue':
      remove(ref(database, `users/${userId}/queueOfMovies/${id}`));

      removeBtnDataAttributes(event.target);

      if (!refs.showLibraryBtn.classList.contains(CURRENT_LINK)) {
        return;
      }

      handleFetchAndRender(MOVIES_QUEUE);
      break;

    default:
      break;
  }

  closeLoading();
}

function getUserId() {
  return auth.currentUser?.uid;
}
function checkIfLoggedIn(userId) {
  if (!userId) {
    if (hash === 'ua') {
      return Notify.warning('Увійдіть у свій акаунт, будь-ласка', {
        timeout: 3000,
        opacity: 0.9,
        width: '150px',
        clickToClose: true,
        pauseOnHover: false,
      });
    } else {
      return Notify.warning('You should sign in first!', {
        timeout: 3000,
        opacity: 0.9,
        width: '150px',
        clickToClose: true,
        pauseOnHover: false,
      });
    }
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
  hash === 'ua'
    ? (addToWatchedBtn.textContent = 'Видалити з переглянутих')
    : (addToWatchedBtn.textContent = 'Delete from watched');
}
function changeQueueBtn(addToQueueBtn) {
  addToQueueBtn.id = 'remove-from-queue';
  hash === 'ua'
    ? (addToQueueBtn.textContent = 'Видалити з обраних')
    : (addToQueueBtn.textContent = 'Delete from queue');
}

export function fetchMoviesFromDatabase(category) {
  const userId = getUserId();
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/${category}`)).then(snapshot => {
    if (snapshot.exists()) {
      const response = snapshot.val();
      return response;
    } else {
      refs.filmsContainer.innerHTML = '';
      showEmptyListMessage();
      return;
    }
  });
}
export function renderList(arrayOfJsons) {
  refs.filmsContainer.innerHTML = '';
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
      }) => `<a href="#" class="film-card">
        <img src=${
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : `https://mysteriouswritings.com/wp-content/uploads/2017/02/movie.jpg`
        } alt="" loading="lazy" width="310" height="449" data-id=${id} />
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
            <b class="rating is-hidden">${vote_average}</b>
          </p>
        </div>
      </div>`
    )
    .join('');

  refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
}
async function handleFetchAndRender(category) {
  const response = await fetchMoviesFromDatabase(category);
  if (!response) {
    return;
  }
  const arrayOfJsons = transformResponseToArray(response);
  definePagesQuantity(response);
  renderList(arrayOfJsons);
  switch (category) {
    case WATCHED_MOVIES:
      showWatchedPagination();
      break;

    case MOVIES_QUEUE:
      showQueuePagination();
      break;

    default:
      break;
  }
}
function transformResponseToArray(response) {
  const arrayOfJsons =
    Object.values(response).length > 20
      ? Object.values(response).slice(0, 20)
      : Object.values(response);
  return arrayOfJsons;
}
function definePagesQuantity(response) {
  const totalPages = Math.ceil(Object.values(response).length / 20);
  renderPagination(totalPages);
}
