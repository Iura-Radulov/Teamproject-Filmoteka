import hashValue from './language';
export default function genreLang(genre_ids) {
  const genreUkr = JSON.parse(localStorage.getItem('genre_uk'));
  const genreEn = JSON.parse(localStorage.getItem('genre_en'));
  let hash = hashValue();
  if (hash === 'en') {
    const genreA = genreEn.reduce((listGenre, genre) => {
      if (genre_ids.includes(genre.id)) {
        listGenre.push(` ${genre.name}`);
      }
      return listGenre;
    }, []);
    if (genreA.length > 2) {
      return genreA.slice(0, 2).concat([' Other']);
    } else if (genreA.length === 0) {
      return 'No information';
    } else {
      return genreA;
    }
  } else if (hash === 'ua') {
    const genreB = genreUkr.reduce((listGenre, genre) => {
      if (genre_ids.includes(genre.id)) {
        listGenre.push(` ${genre.name}`);
      }
      return listGenre;
    }, []);
    if (genreB.length > 2) {
      return genreB.slice(0, 2).concat([' Інші']);
    } else if (genreB.length === 0) {
      return 'Дані відсутні';
    } else {
      return genreB;
    }
  }
}
