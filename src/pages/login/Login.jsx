// lottie-react import Lottie from "lottie-react";
import Lottie from "lottie-react";
// import login animation
import logInAnimation from "../../assets/loginImg/login.json";
// import img from '../assets/loginImg/loginBg.png'
// import css
import "./Login.css";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import Swal from "sweetalert2";
const Login = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { createUserByEmailAndPassword,  signInWithGoogle } = useContext(AuthContext);
  const  navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const {email,  password} = data
  //  user login function
    createUserByEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful! Welcome back.",
        showConfirmButton: false,
        timer: 2000
      });
      // ...
      navigate('/')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed. Please check your email and password and try again.",
        showConfirmButton: false,
        timer: 2000
      });
    });
  // sing in with google function

  }
  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then((result) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login successful! Welcome back.",
        showConfirmButton: false,
        timer: 2000
      });
      // ...
      navigate('/')
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
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
        <form onSubmit={handleSubmit}>
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
        <button onClick={handleGoogleSignIn} className="border justify-center border-[#e5eaf2] hover:border-red-600 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-transition-all duration-200">
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
