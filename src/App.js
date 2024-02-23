import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from './components/LoginPage';
import HomePage from "./components/Homepage"
import Hikes from './components/Hikes';
import Profile from './components/Profile';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>

      <div className='mainContainer'>


        <Routes>

          <Route path='/login' element={<LoginPage />} />

          <Route path="/homepage" element={<HomePage />} />

          <Route path='/search' element={<Search />} />


          <Route path='/search/hikes' element={<Hikes />} />

          <Route path='/profile/:userId' element={<Profile />} />



        </Routes>

      </div>

    </BrowserRouter>

  );
}

export default App;
