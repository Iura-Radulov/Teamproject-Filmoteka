export default function date(release_date) {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (hash === 'en') {
    return release_date ? release_date.slice(0, 4) : 'No information';
  } else if (hash === 'ua') {
    return release_date ? release_date.slice(0, 4) : 'Дані відсутні';
  }
}
