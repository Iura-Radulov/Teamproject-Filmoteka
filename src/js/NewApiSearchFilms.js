export default class NewApiSearchFilms {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async searchFilm(languageChoose) {
    const KEY_API = '024bf82d4805f650033dc69997860333';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${KEY_API}&language=${languageChoose}&page=${this.page}&include_adult=false&query=${this.searchQuery}`;
    const response = await fetch(url);
    const dates = await response.json();
    return dates;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
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
