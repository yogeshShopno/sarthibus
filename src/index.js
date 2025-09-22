import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import { Buffer } from "buffer";

import TawkMessengerReact from '@tawk.to/tawk-messenger-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = 'https://admin.sarthibus.com/api/V1_web/';

let username = 'sarthi_bus';
let password = '20$tgbsv09u';
const base64encodedData = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
axios.defaults.headers.common['Authorization'] = base64encodedData;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
