import refs from './firebase/refs';
import { changeLibraryActivePage } from './pagination';

const IS_HIDDEN = 'is-hidden';
export const CURRENT_LINK = 'current-link';
const HEADER_BGR = 'header__background';
const HEADER_BGR_LIBRARY = 'header__background-library';
const ACTIVE = 'active';

export function makeWatchedBtnActive() {
  refs.showWatchedBtn.classList.add(ACTIVE);
  refs.showQueueBtn.classList.remove(ACTIVE);
}
export function makeQueueBtnActive() {
  refs.showQueueBtn.classList.add(ACTIVE);
  refs.showWatchedBtn.classList.remove(ACTIVE);
}
export function switchToLibraryHeader() {
  refs.showLibraryBtn.classList.add(CURRENT_LINK);
  refs.showHomeBtn.classList.remove(CURRENT_LINK);
  refs.libraryButtons.classList.remove(IS_HIDDEN);
  refs.search.classList.add(IS_HIDDEN);
  refs.header.classList.add(HEADER_BGR_LIBRARY);
  refs.header.classList.remove(HEADER_BGR);

  makeWatchedBtnActive();
}
export function switchToHomeHeader() {
  refs.libraryButtons.classList.add(IS_HIDDEN);
  refs.search.classList.remove(IS_HIDDEN);
  refs.header.classList.remove(HEADER_BGR_LIBRARY);
  refs.header.classList.add(HEADER_BGR);
}
export function showEmptyListMessage() {
  refs.emptyListMessage.classList.remove(IS_HIDDEN);
}
export function hideEmptyListMessage() {
  refs.emptyListMessage.classList.add(IS_HIDDEN);
}
export function showMainPagination() {
  refs.paginationButtons.id = 'pagination_list';
}
export function showWatchedPagination() {
  refs.paginationButtons.id = 'library-pagination-watched';
  const pagination = document.getElementById('library-pagination-watched');
  pagination.addEventListener('click', changeLibraryActivePage);
}
export function showQueuePagination() {
  refs.paginationButtons.id = 'library-pagination-queue';
  const pagination = document.getElementById('library-pagination-queue');
  pagination.addEventListener('click', changeLibraryActivePage);
}
