import refs from './firebase/refs';
import { changeLibraryActivePage } from './pagination';

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
} = refs;

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
}
export function hideEmptyListMessage() {
  emptyListMessage.classList.add(IS_HIDDEN);
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
