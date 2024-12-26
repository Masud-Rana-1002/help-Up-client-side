import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../context/AuthContextProvider";
import Loader from "../../components/Loader";
import EmptyPage from "../../components/EmptyPage";
import Table from "../Private-route/Table";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import axios from "axios";
import { format } from "date-fns";

const MyVolunteerRequest = () => {
  
  const { loading, setLoading, user } = useContext(AuthContext);
  const [postReqData, setPostReqData] = useState([]);
const navigate = useNavigate()
  const cancelRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true); // Set loading true while making the API request
        axiosInstance.delete(`/api/posts/req/delete/${id}`).then((response) => {
          setLoading(false); // Set loading false when response is received
          if (response.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
            navigate(`manageMyPosts/${user.email}`)
          }
          const updatedData = postReqData.filter((data) => data._id !== id);
          setPostReqData(updatedData);
        }).catch((error) => {
          setLoading(false); // Ensure loading is reset if an error occurs
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Something went wrong!",
            icon: "error",
          });
        });
      }
    });
  };
useEffect(()=>{
 
  axios.get(`${import.meta.env.VITE_VOLUNTEER_MANAGEMENT_SERVER_URL}/api/post/myVolunteerReq/${user?.email}`)
  .then(res =>{
    setPostReqData(res.data)
    
  })
},[user])

// console.log(reqData)
  if (loading) {
    return <Loader />; 
  }

  return (
    <div>
      <Helmet>
        <title>My Volunteer Requests - Volunteer Platform</title>
      </Helmet>
     
      <div className="overflow-x-auto">

        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-sm">
              <th>S/L</th>
              <th>Organizer name</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through postReqData */}
            {postReqData?.map((data, index) => (
              <tr className="bg-base-200" key={data._id}>
                <th>{index + 1}</th>
                <td>{data?.postDetails?.name}</td>
                <td>{data?.postDetails?.Location}</td>
                <td>  <span>{format(new Date(data?.postDetails?.startDate), "dd-MM-yyyy")}</span></td>
                <td>{data?.postDetails?.category}</td>
                <td className="mx-auto text-red-600 text-xl">
                  <button
                    title="Cancel Request"
                    onClick={() => cancelRequest(data._id)}
                  >
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {postReqData?.length===0 && <EmptyPage></EmptyPage>}
      </div>
    </div>
  );
};

export default MyVolunteerRequest;