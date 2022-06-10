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
    this.addToWatchedBtn.addEventListener(
      'click',
      this.addToWatched.bind(this)
    );
    this.addToQueueBtn.addEventListener('click', this.addToQueue.bind(this));
    this.showWatchedBtn.addEventListener('click', this.showWatched.bind(this));
    this.showQueueBtn.addEventListener('click', this.showQueue.bind(this));
  }

  // awaits an object describing current movie
  addToWatched = movie => {
    const myMovie = {
      genres: movie.genres,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      original_name: movie.original_name,
      first_air_date: movie.first_air_date,
      id: movie.id,
    };
    this.watched.push(myMovie);
  };
  addToQueue = movie => {
    const myMovie = {
      genres: movie.genres,
      original_title: movie.original_title,
      poster_path: movie.poster_path,
      original_name: movie.original_name,
      first_air_date: movie.first_air_date,
      id: movie.id,
    };
    this.queue.push(myMovie);
  };

  // awaits reference to element in which it will render
  showWatched = container => {
    container.innerHTML = '';

    const markup = this.watched.map(
      () => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${genreArray
              .reduce((listGenre, genre) => {
                if (genre_ids.includes(genre.id)) {
                  listGenre.push(` ${genre.name}`);
                }
                return listGenre;
              }, [])
              .slice(0, 2)
              .concat([' Other'])} </b >
            <b>|</b>
            <b>${first_air_date ? first_air_date.slice(0, 4) : '-'}</b>
          </p>
        </div>
      </div>`
    );

    container.insertAdjacentHtml('beforeend', markup);
  };
  showQueue = container => {
    container.innerHTML = '';

    const markup = this.queue.map(
      () => `<div class="film-card">
        <img src="https://image.tmdb.org/t/p/w500${poster_path}"  alt="" loading="lazy" data-id=${id} />
        <div class="info">
          <p class="film-name">${
            original_title ? original_title : original_name
          }
          </p>
          <p class="info-item">
            <b>${genreArray
              .reduce((listGenre, genre) => {
                if (genre_ids.includes(genre.id)) {
                  listGenre.push(` ${genre.name}`);
                }
                return listGenre;
              }, [])
              .slice(0, 2)
              .concat([' Other'])} </b >
            <b>|</b>
            <b>${first_air_date ? first_air_date.slice(0, 4) : '-'}</b>
          </p>
        </div>
      </div>`
    );

    container.insertAdjacentHtml('beforeend', markup);
  };
}

export default LibraryApi;
