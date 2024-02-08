import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>

    <NavBar />
    
      <Routes>

         <Route path='/login' element={<LoginPage />}/>

      </Routes>

    
    </BrowserRouter>
  );
}

export default App;
