import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import Contact from './pages/contact';
import About from './pages/about';
import Footer from './components/footer/footer';
import Feedback from './pages/feedback';
import Destinations from './pages/destinations';
import Baggage from './pages/baggage';
import Inflight from './pages/inflight';
import Boarding from './pages/boarding';
import Flights from './pages/flights';
function App() {


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/about-us' element={<About/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/destinations' element={<Destinations/>}/>
          <Route path='/baggage' element={<Baggage/>}/>
          <Route path='/inflight' element={<Inflight/>}/>
          <Route path='/boarding-and-check-in' element={<Boarding/>}/>
          <Route path='/flights' element={<Flights/>}/>
        </Routes>
        <Footer/>
      </Router>      
    </div>
  );
}

export default App;
