import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";

const MyVolunteerRequest = () => {
  const reqData = useLoaderData();
  const [postReqData, setPostReqData] = useState(reqData);
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
        axiosInstance.delete(`/api/posts/req/delete/${id}`)
        .then((response) => {
          if (response.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });

         
            
          }
          const update = postReqData.filter((data) => data._id !== id);
           setPostReqData(update);
           console.log(update)
        })
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-sm">
              <th>S/L</th>
              <th>Organizer name</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {postReqData.map((data, index) => (
              <tr className="bg-base-200 ">
                <th>{index + 1}</th>
                <td>{data?.postDetails?.name}</td>
                <td>{data?.postDetails?.Location}</td>
                <td>{data?.postDetails?.startDate}</td>
                <td>{data?.postDetails?.category}</td>
                <td className="  mx-auto text-red-600 text-xl">
                  <button onClick={() => cancelRequest(data?._id)} className="">
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyVolunteerRequest;
