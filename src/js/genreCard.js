import hashValue from './language';
export default function genreCard(genres) {
  let hash = hashValue();
  const genreArray = genres.map(genre => genre.name);
  if (hash === 'en') {
    if (genreArray.length !== 0) {
      return genreArray;
    } else {
      return 'No information';
    }
  } else if (hash === 'ua') {
    if (genreArray.length !== 0) {
      return genreArray;
    } else {
      return 'Дані відсутні';
    }
  }
}
