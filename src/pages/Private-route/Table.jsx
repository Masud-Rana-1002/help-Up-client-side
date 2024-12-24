import React, { useMemo, useState } from "react";

// react icons
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever, MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { GrDocumentUpdate } from "react-icons/gr";

const Table = () => {
  const initialData = useLoaderData();
  const postsArray = initialData.map((post) => ({
    title: post.PostTitle,
    category: post.category,
    
    Location: post.Location,
    "Required Volunteers ": post.NoOfVolunteersRequired,
startDate: format(new Date(post.startDate), "dd-MM-yyyy"),
  }));
  console.log(postsArray);
  // const initialData = [
  //     {id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active"},
  //     {id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive"},
  //     {id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Active"},
  //     {id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active"},
  //     {id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "Inactive"},
  // ];

  const [data, setData] = useState(postsArray);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  console.log(data);

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // outside click close the action dropdown
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".zenui-table") &&
      !event.target.closest(".action-btn")
    ) {
      setOpenActionMenuId(null);
    }
  });

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
              {Object.keys(postsArray[0]).map(
                (key) =>
                  key !== "id" && (
                    <th
                      key={key}
                      className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                      onClick={() => handleSort(key)}
                    >
                      <div className="flex items-center gap-[5px]">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                      </div>
                    </th>
                  )
              )}
              <th className="p-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                {Object.entries(item).map(
                  ([key, value]) =>
                    key !== "id" && (
                      <td key={key} className="p-3">
                        {value}
                      </td>
                    )
                )}
                <td className="flex items-center gap-3">
                 <p className="text-green-600 text-xl"><GrDocumentUpdate /></p>
                 <p className="text-red-600 text-xl"> <MdDeleteForever /></p>
                 </td>
                {/* <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={() => toggleActionMenu(item._id)}
                    className="action-btn text-gray-600 cursor-pointer"
                  />

                  <div
                    className={`${
                      openActionMenuId === item._id
                        ? "opacity-100 scale-[1] z-30"
                        : "opacity-0 scale-[0.8] z-[-1]"
                    } zenui-table absolute top-[90%] right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdOutlineEdit />
                      Edit
                    </p>
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdDeleteOutline />
                      Delete
                    </p>
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <IoEyeOutline />
                      View Details
                    </p>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {!sortedData?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Table;
