export default function genreLang(genreArray, genre_ids) {
  let hash = window.location.hash;
  hash = hash.substring(1);
  const genreA = genreArray.reduce((listGenre, genre) => {
    if (genre_ids.includes(genre.id)) {
      listGenre.push(` ${genre.name}`);
    }
    return listGenre;
  }, []);
  if (genreA.length <= 2) {
    return genreA;
  } else {
    if (hash === 'en') {
      return genreA.slice(0, 2).concat([' Other']);
    } else {
      return genreA.slice(0, 2).concat([' Інші']);
    }
  }
}
