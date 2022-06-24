import hashValue from './language';
export default function date(release_date) {
  let hash = hashValue();
  if (hash === 'en') {
    return release_date ? release_date.slice(0, 4) : 'No information';
  } else if (hash === 'ua') {
    return release_date ? release_date.slice(0, 4) : 'Дані відсутні';
  }
}
