import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";
import EmptyPage from "../../components/EmptyPage";
import MyVolunteerRequest from "../MyVolunteerRequest/MyVolunteerRequest";

const Table = () => {
  const initialData = useLoaderData();

  // State to manage the active tab
  const [activeTab, setActiveTab] = useState(1);

  // Handle tab click
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const postsArray = initialData.map((post) => ({
    title: post.PostTitle,
    category: post.category,
    location: post.Location,
    requiredVolunteers: post.NoOfVolunteersRequired,
    startDate: format(new Date(post.startDate), "dd-MM-yyyy"),
    id: post._id,
  }));

  const [data, setData] = useState(postsArray);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    setData(postsArray);
  }, [initialData]);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    console.log("Search Query:", search);
    const filtered = data.filter((item) =>
      Object.values(item)
        .filter(Boolean) // Remove null/undefined
        .some((value) =>
          value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );
    console.log("Filtered Data:", filtered);
    return filtered;
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const deletePost = (id) => {
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
        axiosInstance.delete(`/api/posts/delete/${id}`).then((response) => {
          if (response.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
            setData(data.filter((post) => post.id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 w-full max-w-6xl">
    <div role="tablist" className={`tabs tabs-lifted mb-4  `}>
      {/* Tabs */}
      <a
        role="tab"
        className={`tab ${
          activeTab === 1
            ? "bg-[#3A5F9C] text-white"
            : ""
        }`}
        onClick={() => handleTabClick(1)}
      >
        My volunteer need posts{activeTab}
      </a>
      <a
        role="tab"
        className={`tab ${
          activeTab === 2
            ? "bg-[#3A5F9C] text-white"
            : ""
        }`}
        onClick={() => handleTabClick(2)}
      >
        My volunteer Request
      </a>
    </div>
  
    <div>
      {activeTab === 1 && (
        <div>
          <div className="mb-4 flex items-center justify-center">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-full sm:max-w-md py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-[#3a5f9c]"
            />
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {["Title", "Category", "Location", "Required Volunteers", "Start Date"].map((header, idx) => (
                    <th
                      key={idx}
                      className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                      onClick={() => handleSort(header.toLowerCase().replace(" ", ""))}
                    >
                      <div className="flex items-center gap-1">
                        {header}
                        <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-1 rounded-md text-lg" />
                      </div>
                    </th>
                  ))}
                  <th className="p-3 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-3">{item.title}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.location}</td>
                    <td className="p-3 text-center">{item.requiredVolunteers}</td>
                    <td className="p-3">{item.startDate}</td>
                    <td className="flex items-center pt-2 gap-3">
                      <Link to={`/updatePost/${item.id}`}>
                        <p className="text-green-600 text-xl">
                          <GrDocumentUpdate />
                        </p>
                      </Link>
                      <button onClick={() => deletePost(item.id)}>
                        <p className="text-red-600 text-xl">
                          <MdDeleteForever />
                        </p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {!sortedData.length && (
            <p className="text-sm text-gray-500 py-6 text-center w-full">
              <EmptyPage />
            </p>
          )}
        </div>
      )}
  
      {activeTab === 2 && (
        <div>
          <h1 className="text-2xl font-semibold my-4 mt-20"></h1>
          <MyVolunteerRequest />
        </div>
      )}
    </div>
  </div>
  );
};

export default Table;
