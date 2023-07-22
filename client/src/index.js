import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from './context/DataProvider';
import App from './App';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
