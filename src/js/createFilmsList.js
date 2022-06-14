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
        return `<div class="film-card">
        <img src=${
          poster_path !== null
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : `https://www.online-tech-tips.com/wp-content/uploads/2022/03/image-41.jpeg`
        } alt="" loading="lazy" width="310" data-id=${id} />
        <div class="info">
          <p class="film__info-name">${
            original_title ? original_title : original_name
          }
          </p>

          <p class="info-item">
            <b>${
              genre_ids.length > 2
                ? genreArray
                    .reduce((listGenre, genre) => {
                      if (genre_ids.includes(genre.id)) {
                        listGenre.push(` ${genre.name}`);
                      }
                      return listGenre;
                    }, [])
                    .slice(0, 2)
                    .concat([' Other'])
                : genreArray.reduce((listGenre, genre) => {
                    if (genre_ids.includes(genre.id)) {
                      listGenre.push(` ${genre.name}`);
                    }
                    return listGenre;
                  }, [])
            } </b >

            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
            <b class="rating">${vote_average}</b>
          </p>
        </div>
      </div>`;
      }
    )
    .join('');
}
