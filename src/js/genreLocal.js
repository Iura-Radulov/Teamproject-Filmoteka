async function genreLocal() {
  const KEY_API = '024bf82d4805f650033dc69997860333';
  const festFetch = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_API}&language=en-US`;
  const secondFetch = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_API}&language=uk`;
  const dateIds = [festFetch, secondFetch];

  const arrayOfPromises = dateIds.map(async userId => {
    const response = await fetch(`${userId}`);
    return response.json();
  });

  const dates = await Promise.all(arrayOfPromises);
  return dates;
}

const LOCALSTORAGE_KEY2 = 'genre_uk';
const LOCALSTORAGE_KEY1 = 'genre_en';

genreLocal()
  .then(genre => {
    localStorage.setItem('genre_en', JSON.stringify(genre[0].genres));
    localStorage.setItem('genre_uk', JSON.stringify(genre[1].genres));
  })
  .catch(error => console.log(error));
