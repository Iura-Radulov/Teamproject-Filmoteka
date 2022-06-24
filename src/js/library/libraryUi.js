import { Notify } from 'notiflix';
import refs from '../firebase/refs';
import { changeLibraryActivePage, renderPagination } from '../pagination';
import hashValue from '../language';

const {
  showWatchedBtn,
  showQueueBtn,
  showLibraryBtn,
  showHomeBtn,
  libraryButtons,
  search,
  header,
  emptyListMessage,
  paginationButtons,
  paginationContainer,
} = refs;

export const hash = hashValue();

const IS_HIDDEN = 'is-hidden';
export const CURRENT_LINK = 'current-link';
const HEADER_BGR = 'header__background';
const HEADER_BGR_LIBRARY = 'header__background-library';
const ACTIVE = 'active';

export function makeWatchedBtnActive() {
  showWatchedBtn.classList.add(ACTIVE);
  showQueueBtn.classList.remove(ACTIVE);
}
export function makeQueueBtnActive() {
  showQueueBtn.classList.add(ACTIVE);
  showWatchedBtn.classList.remove(ACTIVE);
}
export function disableButton(button) {
  button.classList.add('disabled');
}
export function switchToLibraryHeader() {
  showLibraryBtn.classList.add(CURRENT_LINK);
  showHomeBtn.classList.remove(CURRENT_LINK);
  libraryButtons.classList.remove(IS_HIDDEN);
  search.classList.add(IS_HIDDEN);
  header.classList.add(HEADER_BGR_LIBRARY);
  header.classList.remove(HEADER_BGR);

  makeWatchedBtnActive();
}
export function switchToHomeHeader() {
  libraryButtons.classList.add(IS_HIDDEN);
  search.classList.remove(IS_HIDDEN);
  header.classList.remove(HEADER_BGR_LIBRARY);
  header.classList.add(HEADER_BGR);
}
export function showEmptyListMessage() {
  emptyListMessage.classList.remove(IS_HIDDEN);
  paginationContainer.classList.add(IS_HIDDEN);
}
export function hideEmptyListMessage() {
  emptyListMessage.classList.add(IS_HIDDEN);
  paginationContainer.classList.remove(IS_HIDDEN);
}
export function showMainPagination() {
  paginationButtons.id = 'pagination_list';
}
export function showWatchedPagination() {
  paginationButtons.id = 'library-pagination-watched';
  const pagination = document.getElementById('library-pagination-watched');
  pagination.addEventListener('click', changeLibraryActivePage);
}
export function showQueuePagination() {
  paginationButtons.id = 'library-pagination-queue';
  const pagination = document.getElementById('library-pagination-queue');
  pagination.addEventListener('click', changeLibraryActivePage);
}
export function definePagesQuantity(response) {
  const totalPages = Math.ceil(Object.values(response).length / 20);
  renderPagination(totalPages);
}
export function notifyIfNotLoggedIn() {
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
