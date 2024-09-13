import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { orderList } from '../services/allApi';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const OrdersByDateChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await orderList();
        const orders = response.data;

        // Process data
        const orderDates = {};
        const recentOrdersList = [];
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        orders.forEach(order => {
          const orderDate = new Date(order.start_date);
          const dateString = orderDate.toLocaleDateString();

          if (orderDate >= sevenDaysAgo && orderDate <= today) {
            if (orderDates[dateString]) {
              orderDates[dateString] += 1;
            } else {
              orderDates[dateString] = 1;
            }

            recentOrdersList.push(order);
          }
        });

        const labels = Object.keys(orderDates);
        const data = Object.values(orderDates);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Number of Orders',
              data,
              borderColor: '#007bff',
              backgroundColor: (context) => {
                const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, context.chart.height);
                gradient.addColorStop(0, 'rgba(0, 123, 255, 0.5)'); 
                gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');   
                return gradient;
              },
              borderWidth: 2,
              fill: true,
            },
          ],
        });

        
        setRecentOrders(recentOrdersList);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrderData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', 
        },
      },
      tooltip: {
        callbacks: {
          labelTextColor: () => 'white',
        },
      },
      title: {
        display: true,
        text: 'Orders by Date',
        color: 'white',
      },
    },
    scales: {
      x: {
        grid: {
          color: '#444', 
        },
        ticks: {
          color: 'white', 
        },
      },
      y: {
        grid: {
          color: '#444', 
        },
        ticks: {
          color: 'white', 
          stepSize: 1,   
          callback: (value) => value.toString(), 
        },
        suggestedMin: 0, 
      },
    },
  };

  return (
    <div className="chart-container">
      <style>
        {`
          .chart-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
          }

          .chart-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: white;
          }

          .recent-orders {
            margin-top: 20px;
            color: white;
          }
        `}
      </style>
      <h2>Orders by Date</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default OrdersByDateChart;
