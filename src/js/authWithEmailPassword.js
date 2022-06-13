
const API_KEY = "AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw"

export default function authWithEmailPassword(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true,
        }),
        headers: {
                'Content-Type': 'applicatiom/json'
            }
        
    })
        .then(response => response.json())
        .then(data => data.idToken)
        .catch(error => console.log(error))
}






// console.log(app);
// console.log(getFirestore);
// getAuth()
//   .getUserByEmail(email)
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });







