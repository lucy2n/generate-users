import React from 'react';

const RegionSelector = ({ region, setRegion }) => {
  return (
    <div className="d-flex align-items-center">
      <label>Region:</label>
      <select className="form-select ms-2" value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="us">USA</option>
        <option value="pl">Poland</option>
        <option value="uz">Uzbekistan</option>
      </select>
    </div>
  )
};

export default RegionSelector;
