import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart({ data, dateRange }) {
  const options = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
      },
      scales: {
          x: {
              title: {
                  display: true,
                  text: "Painting Name",
              },
          },
          y: {
              title: {
                  display: true,
                  text: "Total Duration (seconds)",
              },
          },
      },
  };

  // Filter and aggregate total duration within the selected date range
  const labels = data.map(item => `Painting ${item.sys_id}`); // Painting names
  const totalDurations = data.map(item => {
      // Filter `dailyStats` by selected date range
      const filteredStats = item.dailyStats.filter(stat => {
          const statDate = new Date(stat.date);
          return (
              statDate >= new Date(dateRange.startDate) &&
              statDate <= new Date(dateRange.endDate)
          );
      });
      // Sum durations within the date range
      return filteredStats.reduce((sum, stat) => sum + stat.totalDuration, 0);
  });

  const chartData = {
    labels,
    datasets: [
      {
        
      fill: true,
      label: 'Total Duration (seconds)',
      data: totalDurations,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    
    ],
};


  return (
      <TitleCard title={"Total Time Viewed Over Time"}>
          <Line data={chartData} options={options} />
      </TitleCard>
  );
}

export default LineChart;
