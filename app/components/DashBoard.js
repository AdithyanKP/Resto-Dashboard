"use client";

import React, { useMemo } from "react";
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

const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
  },
};

const Dashboard = () => {
  const {
    monthlySalesChartData,
    yearlyChartDataYearly,
    orderTypeChartData,
    topItemsChartData,
    ratingsChartData,
  } = useMemo(() => {
    const monthlySalesData = {};
    const yearlySalesData = {};
    const orderTypesData = {};
    const itemsSoldData = {};
    const ratingsData = {};

    orderData.forEach((order) => {
      const orderDate = new Date(order.Order_Placed_Time);

      if (!isNaN(orderDate.getTime())) {
        const month = orderDate.toLocaleString("default", { month: "long" });
        const year = orderDate.getFullYear();

        // Monthly Sales Data
        monthlySalesData[month] =
          (monthlySalesData[month] || 0) +
          order.Items.reduce((sum, item) => sum + item.Total_Price, 0);

        // Yearly Sales Data
        yearlySalesData[year] =
          (yearlySalesData[year] || 0) +
          order.Items.reduce((sum, item) => sum + item.Total_Price, 0);

        // Order Types
        orderTypesData[order.Order_Type] =
          (orderTypesData[order.Order_Type] || 0) + 1;

        // Items Sold
        order.Items.forEach((item) => {
          itemsSoldData[item.Item_Name] =
            (itemsSoldData[item.Item_Name] || 0) + item.Quantity;

          // Ratings
          ratingsData[item.Item_Name] = ratingsData[item.Item_Name] || {
            total: 0,
            count: 0,
          };
          ratingsData[item.Item_Name].total += item.Rating;
          ratingsData[item.Item_Name].count += 1;
        });
      }
    });

    // Prepare Chart Data
    const monthlySalesChartData = {
      labels: Object.keys(monthlySalesData),
      datasets: [
        {
          label: "Monthly Sales",
          data: Object.values(monthlySalesData),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const yearlyChartDataYearly = {
      labels: Object.keys(yearlySalesData),
      datasets: [
        {
          label: "Yearly Sales",
          data: Object.values(yearlySalesData),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const orderTypeChartData = {
      labels: Object.keys(orderTypesData),
      datasets: [
        {
          label: "Order Types",
          data: Object.values(orderTypesData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };

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

    const averageRatings = {};
    for (const item in ratingsData) {
      averageRatings[item] = (
        ratingsData[item].total / ratingsData[item].count
      ).toFixed(1);
    }

    const ratingsChartData = {
      labels: Object.keys(averageRatings),
      datasets: [
        {
          label: "Average Ratings",
          data: Object.values(averageRatings),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
        },
      ],
    };

    return {
      monthlySalesChartData,
      yearlyChartDataYearly,
      orderTypeChartData,
      topItemsChartData,
      ratingsChartData,
    };
  }, [orderData]);

  return (
    <div className="flex flex-col marker: max-h-full overflow-y-auto p-6 space-y-8">
      <div className="flex flex-col lg:flex-row justify-around">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 font-roboto">
            Monthly Sales Data
          </h2>
          <div className="flex justify-center mt-2">
            <Bar
              data={monthlySalesChartData}
              options={commonChartOptions}
              className="h-[340px] w-full max-w-3xl"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 font-roboto">
            Yearly Sales Data
          </h2>
          <div className="flex justify-center mt-2">
            <Bar
              data={yearlyChartDataYearly}
              options={commonChartOptions}
              className="h-[340px] w-full max-w-3xl"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center flex-col mt-2">
        <h2 className="flex justify-center text-2xl font-semibold text-gray-800 font-roboto">
          Order Types Distribution
        </h2>
        <div className="flex justify-center mt-2">
          <Pie
            data={orderTypeChartData}
            options={{
              ...commonChartOptions,
              plugins: {
                legend: { display: true },
              },
            }}
            className="h-[340px] w-full max-w-3xl"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-around mt-2 ">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-gray-800 font-roboto">
            Top 5 Items Sold
          </h2>
          <div className="flex justify-center mt-2">
            <Bar
              data={topItemsChartData}
              options={{
                ...commonChartOptions,
                indexAxis: "y",
              }}
              className="h-[340px] w-full max-w-3xl"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800 font-roboto">
            Average Ratings of Food Items
          </h2>
          <div className="flex justify-center mt-2">
            <Bar
              data={ratingsChartData}
              options={{
                ...commonChartOptions,
                indexAxis: "y",
              }}
              className="h-[340px] w-full max-w-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
