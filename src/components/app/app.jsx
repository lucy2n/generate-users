import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import RegionSelector from '../region-selector/region-selector';
import ErrorsSelector from '../errors-selector/errors-selector';
import SeedSelector from '../seed-selector/seed-selector';
import DataTable from '../data-table/data-table';

const App = () => {
  const [region, setRegion] = useState('us');
  const [seed, setSeed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    const response = await axios.get('https://protected-hamlet-60257-554b4f88d3c2.herokuapp.com/api/data', {
      params: { region, seed, errors, page },
    });
    return response.data;
  };

  useEffect(() => {
    const loadData = async () => {
      const newData = await fetchData(0);
      setData(newData);
      setPage(1);
    };
    loadData();
  }, [region, seed, errors]);

  const fetchMoreData = async () => {
    const newData = await fetchData(page);
    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData((prevData) => [...prevData, ...newData]);
      setPage(page + 1);
    }
  };

  return (
    <div className="container-md d-flex flex-column">
      <h1 className="text-primary mt-5 mb-3">Data Generator</h1>

      <div className="d-flex align-items-end justify-content-between mb-3">      
        <RegionSelector region={region} setRegion={setRegion} />
        <ErrorsSelector errors={errors} setErrors={setErrors} />
        <SeedSelector seed={seed} setSeed={setSeed} />
        <button
          className="btn btn-primary btn-md"
          onClick={() =>
            window.open(`http://localhost:5001/api/export-csv?region=${region}&seed=${seed}&errors=${errors}&page=${page}`, '_blank')
          }
        >
          Export to CSV
        </button>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more data</p>}
      >
        <DataTable data={data} />
      </InfiniteScroll>
    </div>
  );
};

export default App;
