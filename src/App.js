import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import HomePage from "./components/Homepage"

function App() {
  return (
    <BrowserRouter>

    <div className='mainContainer'>

    
      <Routes>


        <Route path="/homepage" element={<HomePage />} />

        <Route path='/login' element={<LoginPage/>}/>
  

      </Routes>

    </div>
    
    </BrowserRouter>

  );
}

export default App;
