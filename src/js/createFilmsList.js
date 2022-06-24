import genreLang from './genre';
import date from './date';
export default function createFilmsList(dates) {
  const filmArray = dates.results;
  return filmArray
    .map(
      ({
        title,
        poster_path,
        original_name,
        genre_ids,
        release_date,
        id,
        vote_average,
      }) => {
        return `<a href="#" class="film-card">
        <img src=${
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : `https://mysteriouswritings.com/wp-content/uploads/2017/02/movie.jpg`
        } alt="film-img" loading="lazy" class="film__img" data-id=${id} />

        <div class="info">
          <p class="film__info-name">${title ? title : original_name}
          </p>

          <p class="film__info-desc">
            <b>${genreLang(genre_ids)} </b >

            <b>|</b>
            <b>${date(release_date)}</b>
            <b class="rating is-hidden">${vote_average}</b>
          </p>
        </div>
      </a>`;
      }
    )
    .join('');
}
