// lottie-react import Lottie from "lottie-react";
import Lottie from "lottie-react";
// import login animation
import logInAnimation from "../../assets/loginImg/login.json";
// import img from '../assets/loginImg/loginBg.png'
// import css
import "./Login.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
import { Link } from "react-router-dom";
const Login = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  }
  return (
    <div className="loginBg flex  items-center justify-center gap-32 min-h-[calc(100vh-84px)]">
      {/* lottie-react */}
      <div className=" hidden lg:block ">
        <Lottie animationData={logInAnimation} loop={true} />
      </div>
      {/* login form */}
      <div className= {`card-body bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ${isDarkMode?'border border-[#891f21]' : ''}`}>
        <h3 className="text-center text-2xl font-medium">Login</h3>
        <form >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
               name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
            name="password"
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button
              className={`btn bg-[#CE3235] hover:bg-[#891f21] text-white `}
            >
              Login
            </button>
          </div>
         <div className="text-center mt-2">
         <p>New user?<Link to='/register'> Sign Up</Link></p>
         </div>
        </form>
        <div className="divider">OR</div>

        {/* bordered google login button */}
        <button className="border justify-center border-[#e5eaf2] hover:border-red-600 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-transition-all duration-200">
          <img
            src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
            alt="google logo"
            className="w-[23px]"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
