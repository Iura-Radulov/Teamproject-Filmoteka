export default async function fetchFilmModal(movie_id, languageChoose) {
  const KEY_API = '024bf82d4805f650033dc69997860333';
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${KEY_API}&language=${languageChoose}`;
  const response = await fetch(url);
  const movie = await response.json();
  return movie;
}
