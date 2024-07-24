"use client";
import React, { useEffect, useState } from 'react';

const Dropdown = ({ api, onSelectUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchData = async (query = '') => {
    try {
      const url = `http://localhost:3000/api/user?name=${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      console.log(data);
      setFilteredItems(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onSelectUser(item.id); // Pass selected user's ID to parent component
    setIsOpen(false); // Close dropdown
    setSearchText(`${item.name}`); // Display selected user's name
  };

  const handleSearchChange = async (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchText(e.target.value);
    await fetchData(searchText);
  };

  return (
    <div className="relative">
      <div tabIndex={0} role="button" onClick={handleDropdownClick} className="btn m-1">
        {searchText || "Click"}
      </div>
      {isOpen && (
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute">
          <li className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={handleSearchChange}
              className="input input-bordered w-full pr-10"
            />
          </li>
          {filteredItems.map((item) => (
            <li key={item.id} onClick={() => handleItemClick(item)}>
              <a>{item.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
