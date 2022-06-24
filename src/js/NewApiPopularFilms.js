export default class NewApiPopularFilms {
  constructor() {
    this.page = 1;
  }

  async fetchFilmsCards(languageChoose) {
    const KEY_API = '024bf82d4805f650033dc69997860333';
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY_API}&page=${this.page}&language=${languageChoose}`;
    const response = await fetch(url);
    const dates = await response.json();
    return dates;
  }

  resetPage() {
    this.page = 1;
  }
  setPage(page) {
    this.page = page;
  }

  incrementPage() {
    this.page += 1;
  }
}
