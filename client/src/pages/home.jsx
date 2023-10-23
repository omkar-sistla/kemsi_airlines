import NavBar from '../components/nav_bar/nav_bar';
import Cover from '../components/cover/cover';
import Booking from '../components/booking/booking';
import Section from '../components/sections/sections';
import plansjson from '../components/card/plansjson.json'

function Home() {
  return (
    <div className="Home">      
      <NavBar/>
      <Cover/>      
      <Booking/>
      <Section cards={plansjson[2].coupons} csecclass="offer_section"/>
      <Section cards={plansjson[0].plans} heading={plansjson[0].heading} tagline={plansjson[0].tagline} id="plans"/>
      <Section cards={plansjson[1].plans} heading={plansjson[1].heading} tagline={plansjson[1].tagline} id="guidelines"/>
    </div>
  );
}

export default Home;
