import { getDatabase, ref, set, child, get, remove } from 'firebase/database';
import { app } from '../firebase/firebase';
import { getAuth } from 'firebase/auth';
import refs from '../firebase/refs';
import { showEmptyListMessage, disableButton, CURRENT_LINK } from './libraryUi';
import {
  removeBtnDataAttributes,
  handleFetchAndRender,
  WATCHED_MOVIES,
  MOVIES_QUEUE,
} from './moviesLibraryApi';

const database = getDatabase(app);
const auth = getAuth(app);

export function getUserId() {
  return auth.currentUser?.uid;
}

export function databaseContainsMovie(category, movieId, userId) {
  return get(ref(database, `users/${userId}/${category}${movieId}`)).then(
    snapshot => snapshot.exists()
  );
}

export function handleDatabaseInteraction(event, userId) {
  const movieJson = event.target.dataset.movie;
  const id = Number(event.target.dataset.id);
  switch (event.target.id) {
    case 'add-to-watched':
      set(ref(database, `users/${userId}/watchedMovies/${id}`), movieJson);

      removeBtnDataAttributes(event.target);
      disableButton(event.target);
      break;

    case 'add-to-queue':
      set(ref(database, `users/${userId}/queueOfMovies/${id}`), movieJson);

      removeBtnDataAttributes(event.target);
      disableButton(event.target);
      break;

    case 'remove-from-watched':
      remove(ref(database, `users/${userId}/watchedMovies/${id}`));

      removeBtnDataAttributes(event.target);

      if (!refs.showLibraryBtn.classList.contains(CURRENT_LINK)) {
        return;
      }

      handleFetchAndRender(WATCHED_MOVIES);

      disableButton(event.target);
      break;

    case 'remove-from-queue':
      remove(ref(database, `users/${userId}/queueOfMovies/${id}`));

      removeBtnDataAttributes(event.target);

      if (!refs.showLibraryBtn.classList.contains(CURRENT_LINK)) {
        return;
      }

      handleFetchAndRender(MOVIES_QUEUE);

      disableButton(event.target);
      break;

    default:
      break;
  }
}

export function fetchMoviesFromDatabase(category) {
  const userId = getUserId();
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/${category}`)).then(snapshot => {
    if (snapshot.exists()) {
      const response = snapshot.val();
      return response;
    } else {
      refs.filmsContainer.innerHTML = '';
      showEmptyListMessage();
      return;
    }
  });
}
