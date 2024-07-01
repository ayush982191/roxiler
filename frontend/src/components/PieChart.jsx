import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data }) => {
  let chartData;
  // console.log("data coming is ",data)
  // if(data.length > 0){
  //   chartData = {
  //     labels: data?.map(item => item.category),
  //     datasets: [
  //       {
  //         data: data?.map(item => item.count),
  //         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
  //         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56'],
  //       },
  //     ],
  //   }
  // }

  return <Pie data={chartData} />;
};

export default PieChart;
