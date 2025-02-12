import React, { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../context/AuthContextProvider";
import Loader from "../../components/Loader";
import EmptyPage from "../../components/EmptyPage";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import { format } from "date-fns";

const MyVolunteerRequest = () => {
  const { loading, setLoading, user } = useContext(AuthContext);
  const [postReqData, setPostReqData] = useState([]);
  const navigate = useNavigate();

  // Cancel a volunteer request
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
        setLoading(true); // Set loading to true while making the API request
        axiosInstance
          .delete(`/api/posts/req/delete/${id}`, {
            withCredentials: true,
          })
          .then((response) => {
            setLoading(false); // Set loading false when the response is received
            if (response.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your request has been deleted.",
                icon: "success",
              });

              // Update the state with remaining requests
              const updatedData = postReqData.filter((data) => data._id !== id);
              setPostReqData(updatedData);

              // Navigate if necessary
              navigate(`/manageMyPosts/${user.email}`);
            }
          })
          .catch((error) => {
            setLoading(false); 
           
            Swal.fire({
              title: "Error",
              text: "Something went wrong while deleting the request!",
              icon: "error",
            });
          });
      }
    });
  };

  // Fetch volunteer requests on component mount
  useEffect(() => {
    if (user?.email) {
      // setLoading(true);
      axiosInstance
        .get(`/api/post/myVolunteerReq/${user.email}`)
        .then((res) => {
          setPostReqData(res.data);
          setLoading(false);
     
        })
        .catch((error) => {
          
          setLoading(false);
        });
    }
  }, [user, setLoading]);

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
          {/* Table Header */}
          <thead>
            <tr className="font-bold text-sm">
              <th>S/L</th>
              <th>Organizer Name</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render Volunteer Requests */}
            {postReqData.map((data, index) => (
              <tr className="bg-base-200" key={data._id}>
                <th>{index + 1}</th>
                <td>{data?.postDetails?.name || "N/A"}</td>
                <td>{data?.postDetails?.Location || "N/A"}</td>
                <td>
                  {data?.postDetails?.startDate ? (
                    <span>{format(new Date(data.postDetails.startDate), "dd-MM-yyyy")}</span>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{data?.postDetails?.category || "N/A"}</td>
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
        {/* Show EmptyPage Component if no data */}
        {postReqData.length === 0 && <EmptyPage />}
      </div>
    </div>
  );
};

export default MyVolunteerRequest;