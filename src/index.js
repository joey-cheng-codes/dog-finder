import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { Provider } from 'react-redux';
import store from './redux/store';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);