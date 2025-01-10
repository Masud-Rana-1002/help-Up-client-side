import { Helmet } from "react-helmet-async";
import Carousel from "./Carousel";
import OurGoal from "./OurGoal";
import UpcomingEvents from "./UpcomingEvents";
import VolunteerNeedsNow from "./VolunteerNeedsNow";
import ImpactSection from "./ImpactSection";
import HowItWorks from "./HowItWorks";
import VolunteerTestimonials from "./VolunteerTestimonials";


const Home = () => {
  return (
    <div className="container  mx-auto z-0 space-y-12 ">
      <Helmet>
      <title>Home - Volunteer Platform</title>
      </Helmet>
      <Carousel></Carousel>
      <div className="container w-11/12  mx-auto space-y-12">
      <VolunteerNeedsNow></VolunteerNeedsNow>
      <UpcomingEvents></UpcomingEvents>
      <OurGoal></OurGoal>
      <ImpactSection></ImpactSection>
      <HowItWorks></HowItWorks>
      <VolunteerTestimonials></VolunteerTestimonials>
      </div>
   
    </div>
  );
};

export default Home;