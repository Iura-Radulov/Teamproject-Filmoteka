const URL = "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/";

export class Firebase {
    static create(data) {
       return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplicatiom/json'
            }
        })
            .then(response => response.json())
            .then(response => console.log(response))
    }
}

const URL_API = "https://api.themoviedb.org/3/"

// /trending/{media_type}/{time_window}
const api_key="8c768371227c12dea02a7fda24385a83"

function fetchApi() {
    return fetch(`${URL_API}trending/all/week?api_key=${api_key}`)
    .then(response => response.json())
    
}

fetchApi().then(response => console.log(response))