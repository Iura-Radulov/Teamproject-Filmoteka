import refs from '../firebase/refs';
import genreLang from '../genre';
import date from '../date';
import titleLibraryLang from '../titleLibraryLang';

export default function renderList(arrayOfJsons) {
  refs.filmsContainer.innerHTML = '';
  const markup = arrayOfJsons
    .map(json => JSON.parse(json))
    .map(
      ({
        poster_path,
        title,
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
        } alt="film-img" loading="lazy" class="film__img" data-id=${id} />
        <div class="info">
          <p class="film__info-name">${titleLibraryLang(
            title,
            original_name,
            original_title
          )}
          </p>
          <p class="info-item film__info-desc">
            <b>${genreLang(genres.map(genre => genre.id))}</b >
            <b>|</b>
            <b>${date(release_date)}</b>
            <b class="rating">${vote_average}</b>
          </p>
        </div>
      </div>`
    )
    .join('');

  refs.filmsContainer.insertAdjacentHTML('beforeend', markup);
}
