// Copy this file to environment.ts and environment.development.ts
// and replace the placeholder values with your actual Firebase and Gemini API credentials

export const environment = {
  production: false,
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
  },
  gemini: {
    apiKey: "AIzaSyA_NviJsF7OYJ6jsYPt0GhKWEjhNrAK18Y"
  }
}; 