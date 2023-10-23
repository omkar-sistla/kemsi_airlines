import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import { useContext,useEffect,useState } from 'react';
import { AuthContext } from './context/authContext';
import Home from './pages/home';
import LoginExpress from './pages/login';
import Contact from './pages/contact';
import About from './pages/about';
import Footer from './components/footer/footer';
import Feedback from './pages/feedback';
import Destinations from './pages/destinations';
import Baggage from './pages/baggage';
import Inflight from './pages/inflight';
import Boarding from './pages/boarding';
import Flights from './pages/flightexpress';
import Passenger from './pages/passengers';
import ScrollToTop from './components/ScrollToTop';
import Payment from './pages/reviewAndBook';
import MyJourneysPage from './pages/myJourney';
import JourneyDetails from './pages/my_journey_details';
import PleaseLogin from './components/pleaselogin/pleaselogin';
function App() {
  const {currentToken} = useContext(AuthContext);
  const [isLogin,setIsLogin]=useState(false)
  useEffect(()=>{
    currentToken==='Success'?setIsLogin(true):setIsLogin(false)
  },[currentToken])
  
  console.log("thala"+currentToken)
  console.log("isLogin"+isLogin)
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={isLogin?<Navigate to="/" replace={true}/>:<LoginExpress/>}/>
          <Route path="/contact-us" element={<Contact/>}/>
          <Route path='/about-us' element={<About/>}/>
          <Route path='/feedback' element={<Feedback/>}/>
          <Route path='/destinations' element={<Destinations/>}/>
          <Route path='/baggage' element={<Baggage/>}/>
          <Route path='/inflight' element={<Inflight/>}/>
          <Route path='/boarding-and-check-in' element={<Boarding/>}/>
          <Route path='/flights' element={isLogin?<Flights/>:<PleaseLogin/>}/>
          <Route path='/booking/fill-passenger-details' element={isLogin?<Passenger/>:<PleaseLogin/>}/>
          <Route path='/booking/payment' element={isLogin?<Payment/>:<PleaseLogin/>}/>
          <Route path='/my-journeys' element = {isLogin?<MyJourneysPage/>:<PleaseLogin/>}/>
          <Route path='/my-journeys/journey-details' element = {isLogin?<JourneyDetails/>:<PleaseLogin/>}/>
        </Routes>
        <Footer/>
      </Router>      
    </div>
  );
}

export default App;
