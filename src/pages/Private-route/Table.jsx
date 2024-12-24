import React, { useEffect, useMemo, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { axiosInstance } from "../../utils/hooks/useAxiosSecure";

const Table = () => {
  const initialData = useLoaderData();

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
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
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
    <div className="w-max mx-auto p-4">
      <div className="mb-4">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
        />
      </div>

      <div className="customTable w-full rounded-md border border-gray-200">
        <table className="w-max text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["Title", "Category", "Location", "Required Volunteers", "Start Date"].map((header, idx) => (
                <th
                  key={idx}
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort(header.toLowerCase().replace(" ", ""))}
                >
                  <div className="flex items-center gap-[5px]">
                    {header}
                    <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                  </div>
                </th>
              ))}
              <th className="p-3 text-left font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3">{item.requiredVolunteers}</td>
                <td className="p-3">{item.startDate}</td>
                <td className="flex items-center gap-3">
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

        {!sortedData.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">No data found!</p>
        )}
      </div>
    </div>
  );
};

export default Table;