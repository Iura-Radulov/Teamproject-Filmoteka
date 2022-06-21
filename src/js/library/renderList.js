import refs from '../firebase/refs';

export default function renderList(arrayOfJsons) {
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
