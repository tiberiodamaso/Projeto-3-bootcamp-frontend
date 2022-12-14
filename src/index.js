import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextComponent } from './contexts/authContext.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextComponent>
        <App />
      </AuthContextComponent>
    </Router>
  </React.StrictMode>
);

