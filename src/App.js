import './App.css';
import { Route, Routes } from 'react-router-dom';
import Adoption from './pages/Adoption/Adoption';
import MainNavbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Volunteering from './components/volunteering/Volunteering';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <MainNavbar/>
      <div className='move-under-nav'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/adoption" element={<Adoption/>}/>
          <Route path="/volunteering" element={<Volunteering/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
