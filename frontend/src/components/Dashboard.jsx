import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

import MonthDropdown from './MonthDropdown';
import SearchBox from './SearchBox';
import TransactionsTable from './TransactionTable';
import Statistics from './Statistics';
import BarChart from './BarChart';
import PieChart from './PieChart';


const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [originalData,setOriginaldData] = useState([])


  useEffect(() => { 
    const fetchTransactions = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/transactions?month=${selectedMonth}&search=${""}&page=${page}`);
          setTransactions(response.data.products);
          setOriginaldData(response.data.products)  
          
        //   console.log(response.data.products);
        //   console.log("transaction coming is ", response.data.products); // Update to use 'products'
        } catch (error) {
          console.error("Error fetching transactions: ", error);
        }
      };

    const fetchStats = async () => {
      const response = await axios.get(`http://localhost:4000/api/statistics?month=${selectedMonth}`);
      setStats(response.data);
    };

    const fetchBarChartData = async () => {
      const response = await axios.get(`http://localhost:4000/api/barchart?month=${selectedMonth}`);
      setBarChartData(response.data);
    };

    const fetchPieChartData = async () => {
      const response = await axios.get(`http://localhost:4000/api/piechart?month=${selectedMonth}`);
      setPieChartData(response.data);
    };

    fetchTransactions();
    fetchStats();
    fetchBarChartData();
    fetchPieChartData();
  }, [selectedMonth, page]);
  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filtered= originalData.filter((item) =>
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
          )
          setTransactions(filtered)
  };
  
  return (
    <div className="flex flex-col items-center bg-blue-50 h-screen p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Transaction Dashboard</h1>
      </div>
      <div className="flex justify-between w-full max-w-4xl mb-6">
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleChange={handleChange} />
        <MonthDropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      </div>
        <Statistics stats={stats} />
      <TransactionsTable transactions={transactions} page={page} setPage={setPage} />
       <BarChart data={`${barChartData.length >0 ? barChartData : []}`} />
      {/* <PieChart data={`${pieChartData.length >0 ? pieChartData : []}`} />  */}
    </div>
  );
};

export default Dashboard;
