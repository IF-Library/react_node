import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Provider permite compartilhar dados com toda a aplicação 
import { Provider } from 'react-redux';
// Onde guardamos os elementos a serem compartilhados
import { store } from "./store/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
