
import React, { useContext, useState } from "react";

// icons
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


import { ThemeContext } from "../../context/ThemeProviderContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import ModalForm from "./volunteer-post-page/ModalForm";
import { AuthContext } from "../../context/AuthContextProvider";


const Modal = () => {
const navigate = useNavigate()
  const {modalOpen, setModalOpen } = useContext(ThemeContext)
  const {user} = useContext(AuthContext)
  const data = useLoaderData();
  const ModalClose = ()=>{
    setModalOpen(false)
    navigate(`/manageMyPosts/${user?.email}`)
  }
  return (
    <>
      <div
        className={`${
          modalOpen ? " visible" : " invisible"
        } w-full  detailsPage h-screen fixed top-0 left-0 z-50 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}>
        
        <div
          className={`${
            modalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
          } w-[90%] md:w-[70%] lg:w-[60%] bg-[#ffffff] rounded-lg p-4 transition-all duration-300`}>
          <div className="  w-full flex items-end justify-end">
            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={ModalClose}
            />
          </div>

          <div className="w-full h-[750px]  flex-col">
            <ModalForm data={data}></ModalForm>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
          