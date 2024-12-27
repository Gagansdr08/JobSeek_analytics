import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./TopPayingJobs.css"

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const JobSalaryChart = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <div>No data available to display the chart.</div>;
  }

  const data = {
    labels: jobs.map((job) => job.job_title),
    datasets: [
      {
        label: "Average Yearly Salary",
        data: jobs.map((job) => job.salary_year_avg),
        backgroundColor: "rgba(60, 0, 157,0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14, // Increase font size for legend
            weight: "bold", // Make it bold
          },
          color: "#333", // Darker text color for better contrast
        },
      },
      title: {
        display: true,
        text: "Top Paying Jobs",
        font: {
          size: 18, // Increase title font size
          weight: "bold", // Make the title bold
        },
        color: "#222", // Darker color for title
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12, // Increase font size for x-axis labels
          },
          color: "#444", // Darker color for x-axis text
        },
        title: {
          display: true,
          text: "Job Titles",
          font: {
            size: 14, // Font size for x-axis title
            weight: "bold",
          },
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12, // Increase font size for y-axis labels
          },
          color: "#444", // Darker color for y-axis text
        },
        title: {
          display: true,
          text: "Salary (in USD)",
          font: {
            size: 14, // Font size for y-axis title
            weight: "bold",
          },
          color: "#333",
        },
      },
    },
  };
  

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <Bar key={JSON.stringify(jobs)} data={data} options={options} />
    </div>
  );
};

export default JobSalaryChart;
