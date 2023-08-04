import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const UserStats = ({ userid }) => {
  const [chartData1, setChartData1] = useState();
  const [chartData2, setChartData2] = useState();

  useEffect(() => {
    fetchChartData();
  }, [userid]);

  useEffect(() => {
    fetchLineData();
  }, [userid]);

  const config = {
    type: "doughnut",
    data: chartData1,
  };

  const config1 = {
    type: "line",
    data: chartData2,
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    },
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/UserStatistics/${userid}`
      );
      const data = response.data;
      if (data && typeof data === "object") {
        const squadNames = Object.keys(data);
        const totalWhisperIds = Object.values(data);
        const sample = squadNames.map((id) => String(id));
        const chartData = {
          labels: sample,
          datasets: [
            {
              label: "Number of Whispers",
              data: totalWhisperIds,
              fill: false,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(201, 203, 207)",
              ],
              hoverOffset: 4,
              borderWidth: 2,
              pointBackgroundColor: " rgb(2, 119, 244)",
              tension: 0.1,
            },
          ],
        };
        if (chartData) {
          setChartData1(chartData);
        }
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLineData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7105/api/UserStatistics?userUserId=${userid}`
      );
      const data = response.data;
      console.log(data);
      if (data && typeof data === "object") {
        const squadNames = Object.keys(data);
        const totalWhisperIds = Object.values(data);
        const sample = squadNames.map((id) => String(id));
        const chartData = {
          labels: sample,
          datasets: [
            {
              label: "Total Count",
              data: totalWhisperIds,
              fill: false,
              borderColor: "#2196f3",
              pointBackgroundColor: " rgb(2, 119, 244)",
              tension: 0.1,
            },
          ],
        };
        if (chartData) {
          setChartData2(chartData);
        }
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <div style={{ marginLeft: 50 }}>
          <h5>
            See your Activity in each <span>SQUAD</span>
          </h5>
        </div>
        {chartData1 && <Doughnut data={chartData1} />}
      </div>
      <div style={{ marginLeft: 40 }}>
        {" "}
        <div style={{ marginLeft: 40 }}>
          <h5>
            See how people react to your <span>WHISPER</span>
          </h5>
        </div>
        {chartData2 && <Line data={chartData2} />}
      </div>
    </div>
  );
};

export default UserStats;
