export default function createFilmCard(movie) {
  const {
    vote_average,
    vote_count,
    genres,
    original_title,
    poster_path,
    original_name,
    popularity,
    overview,
    id,
  } = movie;
  console.log(genres);

  return `<div class="about_film-card">
         <img src=${
           poster_path !== null
             ? `https://image.tmdb.org/t/p/w500${poster_path}`
             : `https://www.online-tech-tips.com/wp-content/uploads/2022/03/image-41.jpeg`
         } class="about_film-img" alt="" loading="lazy" data-id=${id} />
        <div class="about_film-info">
          <h1 class="about_film-name">${
            original_title ? original_title : original_name
          }
          </h1>
          <div class="about_film-item">
          <p class="about_film-text">Vote / Votes</p>
          <b class="about_film-date"><span class = about_film_vote>${vote_average}</span> / ${vote_count}</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text">Popularity</p>
          <b class="about_film-date">${popularity}</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text">Original Title</p>
          <b class="about_film-date">${
            original_title ? original_title : original_name
          }</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text">Genre</p>
          <b class="about_film-date">${
            genres ? genres.map(genre => genre.name) : ' '
          }</b>
          </div>
          <h2 class="about_film-pretitle">ABOUT</h2>
          <p class="about_film-overview">${overview}</p>
        </div>
      </div>`;
}
