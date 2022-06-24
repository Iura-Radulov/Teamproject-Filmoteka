import createFilmsList from './createFilmsList';
import { openLoading, closeLoading } from './loader';
import NewApiPopularFilms from './NewApiPopularFilms';
import { WATCHED_MOVIES, MOVIES_QUEUE } from './library/moviesLibraryApi';
import renderList from './library/renderList';
import { fetchMoviesFromDatabase } from './library/libraryDatabase';
import { popularSearch, textSearch } from './fetchdata';
import NewApiSearchFilms from './NewApiSearchFilms';
import { chooseLanguageApi } from './language';
import Notiflix from 'notiflix';
import hashValue from './language';

const newApiPopularFilms = new NewApiPopularFilms();
const newApiSearchFilm = new NewApiSearchFilms();
const hash = hashValue();

const refs = {
  ul: document.getElementById('pagination_list'),
  filmsContainer: document.querySelector('.films__container'),
};
let activePage = 1;

export function renderPagination(totalPages, page = 1) {
  let str = '';

  if (page > 1) {
    str += `<li><button class="arrow" type='button' data-page="previous">&#8592;</button></li>`;
  }
  if (window.innerWidth <= 768) {
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        if (i === page) {
          str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
        } else {
          str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i += 1) {
        if (i === page) {
          str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
        } else if (i > page + 2 || i < page - 2) {
          if (i < 6 && page < 3) {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
          }
          if (i > totalPages - 5 && page > totalPages - 2) {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
          }
        } else {
          str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        }
      }
    }
  } else {
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) {
        if (i === page) {
          str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
        } else {
          str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i += 1) {
        if (i === page) {
          str += `<li><button class="numbers active" type='button' data-page="${i}">${i}</button></li>`;
        } else if (i === 1) {
          if (page <= 3) {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
          } else {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
            str += ` <li><p class="points">&#8230;</p></li>`;
          }
        } else if (i === totalPages) {
          if (page >= totalPages - 3) {
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
          } else {
            str += ` <li><p class="points">&#8230;</p></li>`;
            str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
          }
        } else if (i > page + 2 || i < page - 2) {
          // str += ` <li><p class="points">&#8230;</p></li>`;
        } else {
          str += `<li><button class="numbers" type='button' data-page="${i}">${i}</button></li>`;
        }
      }
    }
  }

  if (page < totalPages) {
    str += `<li><button class="arrow" type='button' data-page="next">&#8594;</button></li>`;
  }
  refs.ul.innerHTML = str;
}

refs.ul.addEventListener('click', changeActivePage);

async function changePage(page) {
  openLoading();
  refs.filmsContainer.innerHTML = '';

  if (popularSearch === 'search') {
    newApiSearchFilm.query = textSearch;
    newApiSearchFilm.setPage(page);

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

    const currentLanguage = chooseLanguageApi();

    newApiSearchFilm
      .searchFilm(currentLanguage)
      .then(dates => {
        const filmArray = dates.results;
        // const genreArray = dates[1].genres;

        renderPagination(dates.total_pages, page);

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
          // clearFilmsContainer();
          const markup = createFilmsList(dates);
          refs.filmsContainer.insertAdjacentHTML('afterbegin', markup);
        }
      })
      .catch(error => console.log(error));
  } else {
    newApiPopularFilms.setPage(page);
    try {
      const currentLanguage = chooseLanguageApi();
      const dates = await newApiPopularFilms.fetchFilmsCards(currentLanguage);
      const totalPage = dates.total_pages;

      renderPagination(totalPage, page);
      const markup = createFilmsList(dates);
      refs.filmsContainer.insertAdjacentHTML('afterbegin', markup);
    } catch (error) {
      console.log(error.message);
    }
  }

  closeLoading();
}

function changeActivePage(e) {
  if (e.target.type === 'button') {
    const dataSet = e.target.dataset.page;
    if (dataSet === 'next') {
      activePage += 1;
      changePage(activePage);
    } else if (dataSet === 'previous') {
      activePage -= 1;
      changePage(activePage);
    } else {
      activePage = Number(dataSet);
      changePage(activePage);
    }
  }
}

export function changeLibraryActivePage(e) {
  if (e.target.type === 'button') {
    const listId = e.currentTarget.id;
    const dataSet = e.target.dataset.page;

    if (dataSet === 'next') {
      changeLibraryPage(activePage, listId);
    } else if (dataSet === 'previous') {
      changeLibraryPage(activePage, listId);
    } else {
      activePage = Number(dataSet);
      changeLibraryPage(activePage, listId);
    }
  }
}

export async function changeLibraryPage(page, listId) {
  openLoading();
  switch (listId) {
    case 'library-pagination-watched':
      const watchedResponse = await fetchMoviesFromDatabase(WATCHED_MOVIES);
      if (!watchedResponse) {
        return;
      }

      const watchedArray = Object.values(watchedResponse);
      const filteredWatched = watchedArray.slice(page * 20 - 20, page * 20);
      renderList(filteredWatched);
      renderPagination(Math.ceil(watchedArray.length / 20), page);

      closeLoading();
      break;

    case 'library-pagination-queue':
      const queueResponse = await fetchMoviesFromDatabase(MOVIES_QUEUE);
      if (!queueResponse) {
        return;
      }

      const queueArray = Object.values(queueResponse);
      const filteredQueue = queueArray.slice(page * 20 - 20, page * 20);
      renderList(filteredQueue);
      renderPagination(Math.ceil(queueArray.length / 20), page);

      closeLoading();
      break;
    default:
      break;
  }
}
