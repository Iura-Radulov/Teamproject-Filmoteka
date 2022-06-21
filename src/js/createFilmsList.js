import genreLang from './genre';
export default function createFilmsList(dates) {
  const filmArray = dates[0].results;
  const genreArray = dates[1].genres;
  return filmArray
    .map(
      ({
        original_title,
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
          <p class="film__info-name">${
            original_title ? original_title : original_name
          }
          </p>

          <p class="film__info-desc">
            <b>${genreLang(genreArray, genre_ids)} </b >

            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
            <b class="rating is-hidden">${vote_average}</b>
          </p>
        </div>
      </a>`;
      }
    )
    .join('');
}
