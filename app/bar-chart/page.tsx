"use client"
import React from "react";
import {CategoryScale, Chart, LinearScale} from 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import orders from "../lib/constant/Order";
import months from "../lib/constant/Months";

Chart.register(LinearScale,CategoryScale)   

const Statistical = () => {
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
      <Bar data={data} options={options}/>
    </div>
  )
}

export default Statistical
