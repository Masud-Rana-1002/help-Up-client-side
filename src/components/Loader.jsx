// Desc: Loader component
import Lottie from "lottie-react";
import loaderAnimation from "../assets/logo/loaderAnimation.json"

const Loader = () => {
  return (
    <div>
         {/* lottie-react */}
         <div className=" w-36 mx-auto flex items-center justify-center  min-h-[calc(100vh-425px)]">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;