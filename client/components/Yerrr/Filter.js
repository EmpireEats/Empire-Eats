import React from 'react';

const Filter = ({ selectedOption, handleSort }) => {
  return (
    <div className='filter'>
      <span>Filter By Preference: </span>
      <select value={selectedOption} onChange={handleSort}>
        <option value='all'>All</option>
        <option value='no preference'>No Preference</option>
        <option value='group'>Group</option>
        <option value='one on one'>1 on 1</option>
      </select>
    </div>
  );
};

export default Filter;
