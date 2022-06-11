export default class NewApiPopularFilms {
  constructor() {
    this.page = 1;
  }

  async fetchFilmsCards() {
    const KEY_API = '024bf82d4805f650033dc69997860333';
    const festFetch = `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY_API}&page=${this.page}`;
    const secondFetch = `https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_API}&language=en-US`;
    const dateIds = [festFetch, secondFetch];

    const arrayOfPromises = dateIds.map(async userId => {
      const response = await fetch(`${userId}`);
      return response.json();
    });

    const dates = await Promise.all(arrayOfPromises);
    return dates;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
