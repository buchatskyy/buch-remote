import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import LoginCardProvider from './context/LoginCardContext';

import './index.css';

import App from './components/App/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <LoginCardProvider>
          <App />
        </LoginCardProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
