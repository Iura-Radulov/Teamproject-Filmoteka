
const URL = "https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/users.json";

const data = {
    name: 'George',
    email: 'some@mail.ru',
    password: 12345,
}
 class Firebase {
     create(data) {
       return fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplicatiom/json'
            }
        })
           .then(response => response.json())
           .then(response => {
               data.id = response.name;
               return data;
         })
           
    }
      getUser() {
          return fetch(URL).then(response => response.json())
          .then(response => console.log(response))
        
     }
}
function sentData(data) {
    const user1 = new Firebase();
    const sentDat = user1.create(data);
console.log(sentDat);
}

// sentData(data)

const gettingDate = new Firebase();
// gettingDate.getUser()
