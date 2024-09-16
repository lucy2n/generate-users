import React from 'react';

const SeedSelector = ({ seed, setSeed }) => {
  return (
      <div className="d-flex align-items-center">
        <label>Seed:</label>
        <input
          className="form-control ms-2"
          type="number"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
        />
        <button className="btn btn-outline-primary ms-2" onClick={() => setSeed(Math.floor(Math.random() * 100000))}>
          Random
        </button>
      </div>
  )
};

export default SeedSelector;
