const Statistics = ({ stats }) => {
    return (
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <div>Total Sale Amount: ${stats.totalSaleAmount}</div>
        <div>Total Sold Items: {stats.totalSoldItems}</div>
        <div>Total Not Sold Items: {stats.totalNotSoldItems}</div>
      </div>
    );
  };
export default Statistics;  