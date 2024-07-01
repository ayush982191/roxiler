const TransactionsTable = ({ transactions, page, setPage }) => {
  return (
    <div>
      <table className="min-w-full bg-yellow-100 rounded-md overflow-hidden">
        <thead className="bg-yellow-200">
          <tr>
            {['ID', 'Title', 'Description', 'Price', 'Category', 'Sold', 'Image'].map((header, idx) => (
              <th key={idx} className="py-2 px-4 border-b-2 border-yellow-500 text-left font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.id}</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.title}</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.description}...</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.price}</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.category}</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.sold ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border-b border-yellow-500">{transaction.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4 text-sm text-gray-700">
        <button onClick={() => setPage(page - 1)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded mx-1" disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded mx-1">Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
