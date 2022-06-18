export default function genreCard(genres) {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (genres.length > 2) {
    if (hash === 'en') {
      return genres
        .map(genre => genre.name)
        .slice(0, 2)
        .concat([' Other']);
    } else {
      return genres
        .map(genre => genre.name)
        .slice(0, 2)
        .concat([' Інші']);
    }
  } else {
    return genres.map(genre => genre.name);
  }
}
