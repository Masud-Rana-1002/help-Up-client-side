
import React, { useContext } from "react";
import logo from "../assets/logo/logo.png"
// react icons
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import { ThemeContext } from "../context/ThemeProviderContext";
import { Link } from "react-router-dom";

const Footer = () => {
const {isDarkMode} = useContext(ThemeContext)
    return (
        <footer className={`${isDarkMode? 'border-t border-gray-600': 'bg-[#3a5f9c] '}  w-full py-8`}>
            <div className="flex justify-between container w-11/12  mx-auto gap-[30px] flex-wrap">
                <div className="lg:w-[25%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">About The HelpUp</h3>
                    <div className="flex flex-col gap-[8px] text-white">
                        <span><a className="text-[0.9rem] hover:text-blue-400 cursor-pointer"><Link to='/'>Home</Link></a></span>
                        <span><a
                            className="text-[0.9rem] hover:text-blue-400 cursor-pointer"><Link to='/allVolunteerNeedPosts'>Become a Volunteer</Link></a></span>
                        <span><a className="text-[0.9rem] hover:text-blue-400 cursor-pointer"><Link to='/AboutUs'>About us</Link></a></span>
                        <span><a
                            className="text-[0.9rem] hover:text-blue-400 cursor-pointer"><Link to='faq'>FAQ</Link></a></span>
                        <span><a className="text-[0.9rem] hover:text-blue-400 cursor-pointer"><Link to='ContactUs'>Contact us</Link></a></span>
                    </div>
                </div>

                <div className="lg:w-[45%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">Language</h3>
                    <div className="flex text-white flex-wrap">
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">English
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Bengali
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Italian
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Hindi
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">English
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Bengali
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Italian
                        </button>
                        <button
                            className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md">Hindi
                        </button>
                    </div>
                </div>

                <div className="lg:w-[20%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">Get in touch</h3>
                    <div className="flex gap-[7px] text-white">
                        <a href="https://www.facebook.com/profile.php?id=61561063179982" target="_blank" className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:bg-blue-400">
                            <CgFacebook/>
                        </a>
                        <a href="https://x.com/home?lang=en" target="_blank" className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-blue-400">
                            <BsTwitter/>
                        </a>
                      
                        <a href="https://www.linkedin.com/in/dev-masud-rana/" target="_blank" className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-blue-400">
                            <BsLinkedin/>
                        </a>
                    </div>
                    <img className="w-16" src={logo} alt="" />
                </div>
            </div>

            <div
                className="sm:flex-row flex-col flex sm:items-center gap-[15px] w-full justify-center mt-8">
                <a className="text-gray-400 cursor-pointer text-[0.8rem]">&copy; 2024 HelpUp. All rights reserved.</a>
                
            </div>
        </footer>
    );
};

export default Footer;
                    