import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./App.css";
// import StartYourJourney from './components/StartYourJourney/StartYourJourney';
// import QuizApp from "./Pages/QuizApp/QuizApp";

const root = createRoot(document.getElementById('root')); // Create a root.
root.render( // Use the root to render your app
  // <React.StrictMode>
    <App />
    // <QuizApp/>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();