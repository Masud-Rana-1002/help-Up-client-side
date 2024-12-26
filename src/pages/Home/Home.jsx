import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import OurGoal from "./OurGoal";
import UpcomingEvents from "./UpcomingEvents";
import VolunteerNeedsNow from "./VolunteerNeedsNow";


const Home = () => {
  return (
    <div className="container mx-auto z-0 space-y-12">
      <Helmet>
      <title>Home - Volunteer Platform</title>
      </Helmet>
      <Carousel></Carousel>
      <VolunteerNeedsNow></VolunteerNeedsNow>
      <UpcomingEvents></UpcomingEvents>
      <OurGoal></OurGoal>
    </div>
  );
};

export default Home;