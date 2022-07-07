import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import React from 'react';
import './css/index.css';

import 'bootstrap/dist/css/bootstrap.min.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
