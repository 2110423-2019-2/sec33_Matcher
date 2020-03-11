//#########  not yet implemented!!!  #########

export const firebaseConfig = {
    apiKey: "AIzaSyCDGeYkkWBkaIeEIj2j9Di1-QIco2nNBX8",
    authDomain: "matcher-api.firebaseapp.com",
    storageBucket: "matcher-api.appspot.com"
  }
  
  export const apiEndpoint = process.env.NODE_ENV === 'production' ?
    "https://us-central1-matcher-api.cloudfunctions.net/api" : // For production
    "http://localhost:8080" // For dev
  export const apiEndpointOf = (path: string) => `${apiEndpoint}${path}`