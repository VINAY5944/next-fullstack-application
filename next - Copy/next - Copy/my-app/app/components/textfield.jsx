// components/TextField.js

import React from 'react';

const TextField = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="text-field">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
