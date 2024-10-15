"use client";

import React, { useState, useMemo } from "react";
import { orderData } from "../constants/data";
import useDebounce from "../Hooks/UseDebounce";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // Adjust delay as needed
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Memoized filtered, searched, and sorted orders
  const filteredOrders = useMemo(() => {
    return orderData
      .filter(
        (order) =>
          (statusFilter ? order.Order_Status === statusFilter : true) &&
          (debouncedSearchTerm
            ? order.Customer_Name.toLowerCase().includes(
                debouncedSearchTerm.toLowerCase()
              )
            : true)
      )
      .sort((a, b) => new Date(b.Order_Date) - new Date(a.Order_Date));
  }, [orderData, statusFilter, debouncedSearchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 font-roboto">Orders</h1>
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700 font-roboto">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring focus:outline-none"
          >
            <option value="" className="font-roboto">
              All
            </option>
            <option value="Delivered" className="font-roboto">
              Delivered
            </option>
            <option value="In Transit" className="font-roboto">
              In Transit
            </option>
            <option value="Pending" className="font-roboto">
              Pending
            </option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:ring focus:outline-none w-full"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto hidden sm:table-cell">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto">
                Order Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto hidden md:table-cell">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto hidden lg:table-cell">
                Total Items
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold font-roboto hidden lg:table-cell">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500 font-roboto"
                >
                  No data found
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order.Order_ID} className="even:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-roboto">
                    {order.Order_ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-roboto hidden sm:table-cell">
                    {order.Customer_Name}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      order.Order_Status === "Delivered"
                        ? "text-green-500"
                        : order.Order_Status === "In Transit"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.Order_Status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-roboto hidden md:table-cell">
                    {order.Order_Date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-roboto hidden lg:table-cell">
                    {order.Items.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-roboto hidden lg:table-cell">
                    {order.Items.reduce(
                      (acc, item) => acc + item.Total_Price,
                      0
                    ).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 font-roboto"
        >
          Previous
        </button>
        <span className="text-gray-700 font-roboto">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 font-roboto"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
