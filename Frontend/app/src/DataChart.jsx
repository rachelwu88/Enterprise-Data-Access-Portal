import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DataChart = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating fetching data from the backend (you can replace with axios GET request if needed)
    const fetchedData = [
      {"Date":"2020-05-18T07:00:00","PLANT_ID":4136001,"SOURCE_KEY":"4UPUqMRk7TRMgml","DC_POWER":5,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":2445231},
      {"Date":"2020-06-05T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"81aHJ1q11NBPMrL","DC_POWER":5,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":1215409892},
      {"Date":"2020-06-05T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"oZ35aAeoifZaQzV","DC_POWER":5,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":1660118653},
      {"Date":"2020-05-17T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"mqwcsP2rE7J0TFp","DC_POWER":5,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":593597321},
      {"Date":"2020-06-04T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"LlT2YUhhzqhg5Sw","DC_POWER":5,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":282724355},
      {"Date":"2020-05-30T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"LYwnQax7tkwH5Cb","DC_POWER":6,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":1795032723},
      {"Date":"2020-06-01T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"q49J1IKaHRwDQnt","DC_POWER":6,"AC_POWER":5,"DAILY_YIELD":0,"TOTAL_YIELD":444300},
      {"Date":"2020-05-30T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"V94E5Ben1TlhnDV","DC_POWER":6,"AC_POWER":6,"DAILY_YIELD":0,"TOTAL_YIELD":1412200239},
      {"Date":"2020-06-16T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"rrq4fwE8jgrTyWY","DC_POWER":7,"AC_POWER":7,"DAILY_YIELD":0,"TOTAL_YIELD":121122264},
      {"Date":"2020-06-13T06:00:00","PLANT_ID":4136001,"SOURCE_KEY":"q49J1IKaHRwDQnt","DC_POWER":2,"AC_POWER":2,"DAILY_YIELD":0,"TOTAL_YIELD":491396}
    ];

    setData(fetchedData); // Set the data for table display

    // Prepare data for the chart
    const labels = fetchedData.map(item => item.Date);
    const acPowerValues = fetchedData.map(item => item.AC_POWER);

    setChartData({
      labels,
      datasets: [
        {
          label: 'AC Power',
          data: acPowerValues,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Chart.js options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AC Power Data',
      },
    },
  };

  return (
    <div>
      <h1>Plant Data</h1>

      {/* Table Display */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Plant ID</th>
            <th>DC Power</th>
            <th>AC Power</th>
            <th>Daily Yield</th>
            <th>Total Yield</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.Date}</td>
              <td>{entry.PLANT_ID}</td>
              <td>{entry.DC_POWER}</td>
              <td>{entry.AC_POWER}</td>
              <td>{entry.DAILY_YIELD}</td>
              <td>{entry.TOTAL_YIELD}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart Display */}
      <div style={{ width: '100%', height: '400px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DataChart;
