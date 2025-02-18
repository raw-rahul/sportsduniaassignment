// import React from "react";
// import { Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Charts = ({ articles }) => {
//   // Prepare data for the bar chart (articles by author)
//   const authors = {};
//   articles.forEach((article) => {
//     const author = article.author || "Unknown";
//     authors[author] = (authors[author] || 0) + 1;
//   });

//   const barChartData = {
//     labels: Object.keys(authors),
//     datasets: [
//       {
//         label: "Number of Articles",
//         data: Object.values(authors),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Prepare data for the pie chart (articles by type)
//   const types = {};
//   articles.forEach((article) => {
//     const type = article.type || "news";
//     types[type] = (types[type] || 0) + 1;
//   });

//   const pieChartData = {
//     labels: Object.keys(types),
//     datasets: [
//       {
//         label: "Article Types",
//         data: Object.values(types),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="bg-white p-4 rounded shadow-md">
//         <h2 className="text-xl font-bold mb-4">Articles by Author</h2>
//         <Bar
//           data={barChartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: "top",
//               },
//               title: {
//                 display: true,
//                 text: "Number of Articles by Author",
//               },
//             },
//           }}
//         />
//       </div>
//       <div className="bg-white p-4 rounded shadow-md">
//         <h2 className="text-xl font-bold mb-4">Articles by Type</h2>
//         <Pie
//           data={pieChartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: "top",
//               },
//               title: {
//                 display: true,
//                 text: "Distribution of Articles by Type",
//               },
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Charts;


import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./Charts.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ articles }) => {
  // Prepare data for the bar chart (articles by author)
  const authors = {};
  articles.forEach((article) => {
    const author = article.author || "Unknown";
    authors[author] = (authors[author] || 0) + 1;
  });

  // Sort authors and limit to top 5 for better readability
  const sortedAuthors = Object.entries(authors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const barChartData = {
    labels: sortedAuthors.map(([author]) => author),
    datasets: [
      {
        label: "Number of Articles",
        data: sortedAuthors.map(([_, count]) => count),
        backgroundColor: [
          "rgba(16, 137, 211, 0.7)",
          "rgba(18, 177, 209, 0.7)",
          "rgba(67, 187, 178, 0.7)",
          "rgba(95, 197, 148, 0.7)",
          "rgba(128, 207, 118, 0.7)",
        ],
        borderColor: [
          "rgba(16, 137, 211, 1)",
          "rgba(18, 177, 209, 1)",
          "rgba(67, 187, 178, 1)",
          "rgba(95, 197, 148, 1)",
          "rgba(128, 207, 118, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the pie chart (articles by type)
  const types = {};
  articles.forEach((article) => {
    const type = article.type || "news";
    types[type] = (types[type] || 0) + 1;
  });

  const pieChartData = {
    labels: Object.keys(types),
    datasets: [
      {
        label: "Article Types",
        data: Object.values(types),
        backgroundColor: [
          "rgba(16, 137, 211, 0.7)",
          "rgba(18, 177, 209, 0.7)",
          "rgba(67, 187, 178, 0.7)",
          "rgba(95, 197, 148, 0.7)",
          "rgba(128, 207, 118, 0.7)",
        ],
        borderColor: [
          "rgba(16, 137, 211, 1)",
          "rgba(18, 177, 209, 1)",
          "rgba(67, 187, 178, 1)",
          "rgba(95, 197, 148, 1)",
          "rgba(128, 207, 118, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Generate details for the summary cards
  const authorDetails = sortedAuthors.map(([author, count]) => ({
    name: author,
    value: count,
  }));

  const typeDetails = Object.entries(types).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  // Create color arrays for the detail cards
  const barColors = [
    "#1089D3",
    "#12B1D1",
    "#43BBB2",
    "#5FC594",
    "#80CF76",
  ];
  
  const pieColors = Object.keys(types).map((_, index) => 
    barColors[index % barColors.length]
  );

  return (
    <div className="charts-container">
      <h2 className="charts-main-title">Data Insights</h2>
      
      <div className="charts-row">
        {/* Bar Chart Card */}
        <div className="chart-card">
          <h3 className="chart-title">Top Authors</h3>
          <div className="chart-content">
            <div className="chart-container">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      ticks: {
                        font: {
                          size: 10,
                        },
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                  },
                }}
              />
            </div>
            
            <div className="chart-details">
              <div className="chart-summary-card">
                <h4>Top Authors</h4>
                <ul className="chart-detail-list">
                  {authorDetails.map((entry, index) => (
                    <li key={`author-${index}`} className="chart-detail-item">
                      <span 
                        className="chart-detail-color" 
                        style={{ backgroundColor: barColors[index] }}
                      ></span>
                      <span className="chart-detail-name">{entry.name}</span>
                      <span className="chart-detail-value">{entry.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pie Chart Card */}
        <div className="chart-card">
          <h3 className="chart-title">Articles by Type</h3>
          <div className="chart-content">
            <div className="chart-container">
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            
            <div className="chart-details">
              <div className="chart-summary-card">
                <h4>Distribution Summary</h4>
                <ul className="chart-detail-list">
                  {typeDetails.map((entry, index) => (
                    <li key={`type-${index}`} className="chart-detail-item">
                      <span 
                        className="chart-detail-color" 
                        style={{ backgroundColor: pieColors[index] }}
                      ></span>
                      <span className="chart-detail-name">{entry.name}</span>
                      <span className="chart-detail-value">{entry.value} articles</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;