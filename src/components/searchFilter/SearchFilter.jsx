import "./SearchFilter.css";

const SearchFilter = ({ onSearch }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by title or author..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchFilter;
