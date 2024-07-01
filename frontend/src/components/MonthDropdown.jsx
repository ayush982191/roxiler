const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
    );
  };
export default MonthDropdown  