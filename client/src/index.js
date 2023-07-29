
import React from 'react';
import ReactDOM from 'react-dom';
import { DataProvider } from './context/DataProvider';
import App from './App';
// import LoginPagePopUp from './components/login/LoginPagePopUp';

const Root = () => {
  return (
    <React.StrictMode>
      <DataProvider>
        <App />
        {/* <LoginPagePopUp /> */}
      </DataProvider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<Root />);
