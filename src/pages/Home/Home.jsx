import Carousel from "./Carousel";
import OurGoal from "./OurGoal";
import UpcomingEvents from "./UpcomingEvents";
import VolunteerNeedsNow from "./VolunteerNeedsNow";


const Home = () => {
  return (
    <div className="container mx-auto space-y-12">
      <Carousel></Carousel>
      <VolunteerNeedsNow></VolunteerNeedsNow>
      <UpcomingEvents></UpcomingEvents>
      <OurGoal></OurGoal>
    </div>
  );
};

export default Home;