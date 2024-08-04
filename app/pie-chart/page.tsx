"use client"
import React from "react";
import {CategoryScale, Chart, LinearScale} from 'chart.js/auto'
import {Scatter} from 'react-chartjs-2'
import orders from "../lib/constant/Order";
import months from "../lib/constant/Months";

Chart.register(LinearScale,CategoryScale)   

const LineChart = () => {
    const data = {
    labels: months,
    datasets: [
      {
        label: 'Tổng đơn order',
        data: orders.map((order) => order.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
    
  return (
    <div>
      <Scatter data={data} options={options}/>
    </div>
  )
}

export default LineChart
