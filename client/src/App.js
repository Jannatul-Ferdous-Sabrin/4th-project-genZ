import './App.css';

// Components
import Header from './components/header/Header';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';

function App() {
  return (
    <DataProvider>
      <Header />
      <Home />
    </DataProvider>
  );
}

export default App;
