const SearchBox = ({ searchQuery, setSearchQuery , handleChange }) => {
 
    return (
      <input
        type="text"
  
        value={searchQuery}
        onChange={handleChange }
        placeholder="Search transaction"
        className="bg-white shadow-md rounded-md p-2"
      />
    );
  };

  
  export default SearchBox