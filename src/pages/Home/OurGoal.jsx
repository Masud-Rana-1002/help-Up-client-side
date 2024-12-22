import "animate.css";
import './ourGoal.css'
import Environmental from '../../assets/uorgoalimg/Environmental.png'
import Education from '../../assets/uorgoalimg/Education.png'
import medical from '../../assets/uorgoalimg/medical.png'
import Empowering from '../../assets/uorgoalimg/Empowering.png'
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
const OurGoal = () => {
  const {isDarkMode} = useContext(ThemeContext)
  return (
    <div>
    <div className=" text-center max-w-xl mx-auto">
    <h2 className=" text-3xl font-bold animate__animated animate__backInLeft"> Our Goal</h2>
    <p>At HelpUp, our goal is to create a positive impact in the lives of individuals and communities worldwide. We are committed to</p>
    </div> 
      <div className=" text-center  my-10 animate__animated animate__backInRight gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <div className=" space-y-3 h-72 p-4 flex justify-center items-center flex-col bordered shadow-lg border border-gray-100 rounded-lg">
        <img className={`${isDarkMode&& 'bg-white'} w-12`} src={Empowering} alt="" />
        <h4 className="text-xl font-medium ">Empowering Communities</h4>
        <p>Providing essential resources and opportunities to underprivileged communities for sustainable development.</p>
      </div>
      <div className=" space-y-3 h-72 p-4 flex justify-center items-center flex-col bordered shadow-lg border border-gray-100 rounded-lg">
        <img className={`${isDarkMode&& 'bg-white'} w-12`} src={Education} alt="" />
        <h4 className="text-xl font-medium ">Promoting Education</h4>
        <p>Ensuring every child has access to quality education, empowering them to build a better future</p>
      </div>
      <div className=" space-y-3 h-72 p-4 flex justify-center items-center flex-col bordered shadow-lg border border-gray-100 rounded-lg">
        <img className={`${isDarkMode&& 'bg-white'} w-12 `} src={Environmental} alt="" />
        <h4 className="text-xl font-medium ">Environmental Conservation</h4>
        <p>Leading initiatives to protect our planet by planting trees, reducing waste, and promoting sustainable practices.</p>
      </div>
      <div className=" space-y-3 h-72 p-4 flex justify-center items-center flex-col bordered shadow-lg border border-gray-100 rounded-lg">
        <img className={`${isDarkMode&& 'bg-white '} w-12`} src={medical} alt="" />
        <h4 className="text-xl font-medium ">Improving Healthcare Access</h4>
        <p>Bridging gaps in medical services to ensure everyone receives the care they deserve, regardless of their circumstances.</p>
      </div>

      </div>
    </div>
  );
};

export default OurGoal;
