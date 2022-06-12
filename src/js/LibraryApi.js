class LibraryApi {
  constructor() {
    //   button references
    this.addToWatchedBtn = document.getElementById('add-to-watched');
    this.addToQueueBtn = document.getElementById('add-to-queue');
    this.showWatchedBtn = document.getElementById('show-watched');
    this.showQueueBtn = document.getElementById('show-queue');
    this.container = document.querySelector('.films__container');

    // arrays of data (to be replaced by firebase database)
    this.watched = [];
    this.queue = [];

    // button event listeners
    this.addToWatchedBtn.addEventListener(
      'click',
      this.onAddButtonClick.bind(this)
    );
    this.addToQueueBtn.addEventListener(
      'click',
      this.onAddButtonClick.bind(this)
    );
    this.showWatchedBtn.addEventListener('click', this.showWatched.bind(this));
    this.showQueueBtn.addEventListener('click', this.showQueue.bind(this));
  }

  // is called from open modal window
  onAddButtonClick = event => {
    const movieJson = event.target.dataset.movie;
    switch (event.target.id) {
      case 'add-to-watched':
        this.watched.push(JSON.parse(movieJson));
        this.removeBtnAttribute(event.target);
        break;

      case 'add-to-queue':
        this.queue.push(JSON.parse(movieJson));
        this.removeBtnAttribute(event.target);
        break;
      default:
        break;
    }
    // const watched = this.watched.map(item => JSON.parse(item));
    // const queue = this.queue.map(item => JSON.parse(item));
    console.log('watched:', this.watched);
    console.log('queue:', this.queue);
  };

  removeBtnAttribute = button => {
    button.removeAttribute('data-movie');
  };

  // renders to DOM
  showWatched = () => {
    this.container.innerHTML = '';

    const markup = this.watched
      .map(
        ({
          poster_path,
          original_title,
          original_name,
          genres,
          release_date,
          id,
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
      )
      .join('');

    this.container.insertAdjacentHTML('beforeend', markup);
  };
  showQueue = () => {
    this.container.innerHTML = '';

    const markup = this.queue.map(
      ({
        poster_path,
        original_title,
        original_name,
        genres,
        release_date,
        id,
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

    this.container.insertAdjacentHtml('beforeend', markup);
  };
}

export default LibraryApi;
