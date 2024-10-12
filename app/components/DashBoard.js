"use client";

import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

import { orderData } from "../constants/data";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const Dashboard = () => {
  const salesData = orderData.reduce((acc, order) => {
    const orderDate = new Date(order.Order_Placed_Time);

    if (!isNaN(orderDate.getTime())) {
      const month = orderDate.toLocaleString("default", { month: "long" });

      order.Items.forEach((item) => {
        acc[month] = (acc[month] || 0) + item.Total_Price;
      });
    }
    return acc;
  }, {});

  const salesChartData = {
    labels: Object.keys(salesData),
    datasets: [
      {
        label: "Sales",
        data: Object.values(salesData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  console.log("salesChartData", salesChartData);

  const orderTypesData = orderData.reduce((acc, order) => {
    acc[order.Order_Type] = (acc[order.Order_Type] || 0) + 1;
    return acc;
  }, {});

  const orderTypeChartData = {
    labels: Object.keys(orderTypesData),
    datasets: [
      {
        label: "Order Types",
        data: Object.values(orderTypesData),
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const itemsSoldData = orderData.reduce((acc, order) => {
    order.Items.forEach((item) => {
      acc[item.Item_Name] = (acc[item.Item_Name] || 0) + item.Quantity;
    });
    return acc;
  }, {});

  const topItemsChartData = {
    labels: Object.keys(itemsSoldData).slice(0, 5),
    datasets: [
      {
        label: "Top Items Sold",
        data: Object.values(itemsSoldData).slice(0, 5),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  return (
    <div className="flex flex-col max-h-full overflow-y-auto p-4 space-y-8">
      <>
        <div className="flex justify-evenly">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              Monthly Sales Data
            </h2>

            <div className="flex justify-center mt-2">
              <Bar
                data={salesChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: true },
                  },
                }}
                className="h-[340px] w-full max-w-3xl"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-800">
              Order Types Distribution
            </h2>
            <div className="flex justify-center mt-2">
              <Pie
                data={orderTypeChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="h-[340px] w-full max-w-3xl"
              />
            </div>
          </div>
        </div>
      </>

      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800">
          Top 5 Items Sold
        </h2>
        <div className="flex justify-center mt-2">
          <Bar
            data={topItemsChartData}
            options={{
              responsive: true,
              indexAxis: "y",
              maintainAspectRatio: false,
            }}
            className="h-[340px] w-full max-w-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
