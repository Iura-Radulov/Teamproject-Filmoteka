class LibraryApi {
  constructor() {
    //   button references
    this.addToWatchedBtn = document.getElementById('add-to-watched');
    this.addToQueueBtn = document.getElementById('add-to-queue');
    this.showWatchedBtn = document.getElementById('show-watched');
    this.showQueueBtn = document.getElementById('show-queue');

    // arrays of data (to be replaced by firebase database)
    this.watched = [];
    this.queue = [];

    // button event listeners
    // this.showWatchedBtn.addEventListener('click', this.showWatched.bind(this));
    // this.showQueueBtn.addEventListener('click', this.showQueue.bind(this));
  }

  // awaits an object describing current movie
  addToWatched = movie => {
    const watchedMovie = {
      genres: movie.genres,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      original_name: movie.original_name,
      release_date: movie.release_date,
      id: movie.id,
      vote_average: movie.vote_average,
    };

    this.watched.push(watchedMovie);
    console.log(this.watched);
  };
  addToQueue = movie => {
    const queueMovie = {
      genres: movie.genres,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      original_name: movie.original_name,
      release_date: movie.release_date,
      id: movie.id,
      vote_average: movie.vote_average,
    };

    this.queue.push(queueMovie);
    console.log(this.queue);
  };

  // is called from open modal window
  onAddToWatchedBtnClick = movie => {
    this.addToWatchedBtn.addEventListener('click', () => {
      this.addToWatched(movie);
    });
  };
  onAddToQueueBtnClick = movie => {
    this.addToQueueBtn.addEventListener('click', () => {
      this.addToQueue(movie);
    });
  };

  // awaits reference to element in which it will render
  showWatched = container => {
    container.innerHTML = '';

    const markup = this.watched.map(
      ({
        poster_path,
        original_title,
        original_name,
        genres,
        release_date,
      }) => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${genres.map(genre => genre.name)}</b >
            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
          </p>
        </div>
      </div>`
    );

    container.insertAdjacentHtml('beforeend', markup);
  };
  showQueue = container => {
    container.innerHTML = '';

    const markup = this.queue.map(
      ({
        poster_path,
        original_title,
        original_name,
        genres,
        release_date,
      }) => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${genres.map(genre => genre.name)}</b >
            <b>|</b>
            <b>${release_date ? release_date.slice(0, 4) : '-'}</b>
          </p>
        </div>
      </div>`
    );

    container.insertAdjacentHtml('beforeend', markup);
  };
}

export default LibraryApi;
