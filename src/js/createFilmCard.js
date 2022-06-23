import genreCard from './genreCard';
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
    title,
    id,
  } = movie;

  return `<div class="about_film-card">
         <img src=${
           poster_path !== null
             ? `https://image.tmdb.org/t/p/w500${poster_path}`
             : `https://mysteriouswritings.com/wp-content/uploads/2017/02/movie.jpg`
         } class="about_film-img" alt="" loading="lazy" data-id=${id} />
        <div class="about_film-info">
          <h1 class="about_film-name">${title}
          </h1>
          <div class="about_film-item">
          <p class="about_film-text lang-vote">Vote / Votes</p>
          <b class="about_film-date"><span class = about_film_vote>${vote_average}</span> / ${vote_count}</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text lang-popul">Popularity</p>
          <b class="about_film-date">${popularity}</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text lang-oridg">Original Title</p>
          <b class="about_film-date">${
            original_title ? original_title : original_name
          }</b>
          </div>
          <div class="about_film-item">
          <p class="about_film-text lang-genre">Genre</p>
          <b class="about_film-date">${genreCard(genres)}</b>
          </div>
          <h2 class="about_film-pretitle lang-about">ABOUT</h2>
          <p class="about_film-overview">${overview}</p>
          <div class = "about_item_btn">
      <button type="button" class="btn lang-addw" id="add-to-watched">
        Add to Watched
      </button>
      <button type="button" class="btn lang-addq" id="add-to-queue">Add to Queue</button>
     </div>
        </div>
        </div>`;
}
