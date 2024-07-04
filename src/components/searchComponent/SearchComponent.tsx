import  { useEffect, useRef } from 'react';
import { SearchProps } from '../../types';
import './searchComponent.scss';

function SearchComponent({ onSearch }: SearchProps) {
  const searchTermRef = useRef<HTMLInputElement>(null);  // useRef to hold the input element

  // Automatically focus the input when the component mounts
  useEffect(() => {
    searchTermRef.current?.focus();  // Focus the input element on component mount
  }, []);

  // Function to handle input changes and trigger the search action
  const handleSearchChange = () => {
    if (searchTermRef.current) {
      onSearch(searchTermRef.current.value);  // Use the current value of the input for the search
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        ref={searchTermRef}  // Attach the ref to the input element
        placeholder="Search books..."
        onChange={handleSearchChange}  // Call handleSearchChange on input change
        className="search-input"
      />
      <button onClick={handleSearchChange} className="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchComponent;
