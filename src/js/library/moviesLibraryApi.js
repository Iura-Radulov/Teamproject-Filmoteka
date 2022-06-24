import { openLoading, closeLoading } from '../loader';

import refs from '../firebase/refs';
import {
  makeWatchedBtnActive,
  makeQueueBtnActive,
  switchToLibraryHeader,
  switchToHomeHeader,
  hideEmptyListMessage,
  showMainPagination,
  showWatchedPagination,
  showQueuePagination,
  definePagesQuantity,
  notifyIfNotLoggedIn,
} from './libraryUi';
import {
  getUserId,
  databaseContainsMovie,
  handleDatabaseInteraction,
  fetchMoviesFromDatabase,
} from './libraryDatabase';
import renderList from './renderList';
import hashValue from '../language';
const hash = hashValue();

export const WATCHED_MOVIES = 'watchedMovies/';
export const MOVIES_QUEUE = 'queueOfMovies/';

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
  if (!userId) {
    notifyIfNotLoggedIn();
    return;
  }
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
  if (!userId) {
    notifyIfNotLoggedIn();
    return;
  }

  handleDatabaseInteraction(event, userId);

  closeLoading();
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
export function removeBtnDataAttributes(button) {
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

export async function handleFetchAndRender(category) {
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
