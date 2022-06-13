import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw',
  authDomain: 'filmoteka-goit-6e05f.firebaseapp.com',
  databaseURL: 'https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-goit-6e05f',
  storageBucket: 'filmoteka-goit-6e05f.appspot.com',
  messagingSenderId: '281727023613',
  appId: '1:281727023613:web:ae072f932b4bc661d88194',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class LibraryApi {
  constructor() {
    //   button references
    this.addToWatchedBtn = document.getElementById('add-to-watched');
    this.addToQueueBtn = document.getElementById('add-to-queue');
    this.showWatchedBtn = document.getElementById('show-watched');
    this.showQueueBtn = document.getElementById('show-queue');
    this.showLibraryBtn = document.getElementById('library');
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
    this.showLibraryBtn.addEventListener(
      'click',
      this.onLibraryBtnClick.bind(this)
    );
    // this.showWatchedBtn.addEventListener('click', this.showWatched.bind(this));
    // this.showQueueBtn.addEventListener('click', this.showQueue.bind(this));
  }
  // is called from header
  onLibraryBtnClick = () => {
    const dbRef = ref(database);
    get(child(dbRef, 'watchedMovies/')).then(snapshot => {
      if (snapshot.exists()) {
        const response = snapshot.val();
        console.log(Object.values(response));
        return response;
      } else {
        console.log('no data available');
      }
    });
    // this.showLibrary();
  };

  // is called from open modal window
  onAddButtonClick = event => {
    const movieJson = event.target.dataset.movie;
    const id = Number(event.target.dataset.id);
    switch (event.target.id) {
      case 'add-to-watched':
        set(ref(database, `watchedMovies/${id}`), movieJson);
        // this.watched.push(JSON.parse(movieJson));
        // localStorage.setItem('watchedMovies', JSON.stringify(this.watched));
        this.removeBtnAttribute(event.target);
        break;

      case 'add-to-queue':
        set(ref(database, `queueOfMovies/${id}`), movieJson);
        // this.queue.push(JSON.parse(movieJson));
        // localStorage.setItem('queueOfMovies', JSON.stringify(this.queue));
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

  // adds data-attributes to buttons
  addBtnDataAttributes = movie => {
    this.addToWatchedBtn.setAttribute('data-movie', JSON.stringify(movie));
    this.addToQueueBtn.setAttribute('data-movie', JSON.stringify(movie));
    this.addToWatchedBtn.setAttribute('data-id', movie.id);
    this.addToQueueBtn.setAttribute('data-id', movie.id);
  };
  // removes data-attributes from buttons
  removeBtnAttribute = button => {
    button.removeAttribute('data-movie');
    button.removeAttribute('data-id');
  };

  // renders to DOM
  showLibrary = () => {
    this.showWatched();
  };

  showWatched = () => {
    this.container.innerHTML = '';

    const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
    const markup = watchedMovies
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

    const queueOfMovies = JSON.parse(localStorage.getItem('queueOfMovies'));
    const markup = queueOfMovies.map(
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
