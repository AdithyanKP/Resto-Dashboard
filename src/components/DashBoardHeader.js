import React, { useState, useEffect } from "react";
import { orderData } from "../constants/data";

const Header = ({ orders }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const calculateTotalRevenue = () => {
    return orders.reduce((acc, order) => {
      const orderTotal = order.Items.reduce(
        (itemAcc, item) => itemAcc + item.Total_Price,
        0
      );
      return acc + orderTotal;
    }, 0);
  };

  useEffect(() => {
    const finalRevenue = calculateTotalRevenue();
    const finalOrders = orderData.length;
    let currentRevenue = 0;
    let currentOrder = 0;

    const incrementRevenue = () => {
      if (currentRevenue < finalRevenue) {
        currentRevenue += Math.ceil(finalRevenue / 100);
        setTotalRevenue(Math.min(currentRevenue, finalRevenue));
        setTimeout(incrementRevenue, 10);
      }
    };
    const incrementOrders = () => {
      if (currentOrder < finalOrders) {
        currentOrder += Math.ceil(finalOrders / 100);
        setTotalOrders(Math.min(currentOrder, finalOrders));
        setTimeout(incrementOrders, 20);
      }
    };

    incrementRevenue();
    incrementOrders();
  }, [orders]);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-lg p-6 text-center cursor-pointer">
        <h1 className="text-white text-3xl font-bold font-roboto">
          Total Orders
        </h1>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4 shadow-inner">
          <p className="text-white text-5xl font-extrabold font-roboto">
            {totalOrders}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-teal-500 shadow-lg rounded-lg p-6 text-center cursor-pointer">
        <h1 className="text-white text-3xl font-bold font-roboto">
          Total Revenue
        </h1>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4 shadow-inner">
          <p className="text-white text-5xl font-extrabold">
            {`${totalRevenue.toFixed(2)}$`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
