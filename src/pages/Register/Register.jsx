import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProviderContext";
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import logInAnimation from "../../assets/loginImg/login.json";
import { AuthContext } from "../../context/AuthContextProvider";
import { updateProfile } from "firebase/auth";
import auth from "../../utils/firebaseConfig";
import Swal from "sweetalert2";

const Register = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { createUserByEmailAndPassword, signInWithGoogle, toast } =
    useContext(AuthContext);
  const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  // Submit Function

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!passwordValidation.test(data.password)) {
      toast.error(
        "Invalid password. Must include uppercase, lowercase, and at least 6 characters."
      );

      return;
    }
    createUserByEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed up
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success! Your account has been created.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
        e.target.reset();
        const user = userCredential.user;
        // Update profile
        updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: data.photoUrl,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if ((errorCode || errorMessage)) {
          Swal.fire({
            position: "center",
            icon: "error",
            title:
              "This email is already in use. Please try a different email or log in.",
            showConfirmButton: false,
            timer: 3000,
          });
        }
        // ..
      });
  };
  // Sign in with Google
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success! Your account has been created.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
        if(error){
          Swal.fire({
            position: "center",
            icon: "error",
            title:
              "Oops... Something went wrong.",
            showConfirmButton: false,
            timer: 3000,
          });
        }
      
      });
  };
  return (
    <div className="loginBg flex items-center justify-center gap-32 min-h-[calc(100vh-84px)]">
      {/* lottie-react */}
      <div className="hidden lg:block ">
        <Lottie animationData={logInAnimation} loop={true} />
      </div>
      {/* login form */}
      <div
        className={`card-body bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ${
          isDarkMode ? "border border-[#891f21]" : ""
        }`}
      >
        <h3 className="text-center text-2xl font-medium">Register</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          {/* email */}
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
          {/* photoURL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL </span>
            </label>
            <input
              name="photoUrl"
              type="url"
              placeholder="Photo URL"
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
            <p>
              Already have account ?<Link to="/login"> Login</Link>
            </p>
          </div>
        </form>
        <div className="divider">OR</div>

        {/* bordered google login button */}
        <button
          onClick={handleGoogleSignIn}
          className="border justify-center border-[#e5eaf2] hover:border-red-600 rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-transition-all duration-200"
        >
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

export default Register;
