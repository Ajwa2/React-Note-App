import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './components/error page/ErrorPage';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import EachNote from './components/eachNote/EachNote';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

