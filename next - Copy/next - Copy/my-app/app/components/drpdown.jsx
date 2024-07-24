// components/Dropdown.js
"use client"
import React, { useState } from 'react';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
