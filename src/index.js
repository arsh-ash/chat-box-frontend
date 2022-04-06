import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Routes } from "react-router-dom";
import {storeCreater} from './store';
import { Provider } from 'react-redux';
let store=storeCreater()
console.log("my Store=",store.getState())



ReactDOM.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


