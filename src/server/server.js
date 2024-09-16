const express = require('express');
const cors = require('cors');
const { generateFakeData } = require('./fakeGenerator');
const csv = require('fast-csv');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/api/data', (req, res) => {
  const { region = 'ru', seed = 0, errors = 0, page = 0, limit = 20 } = req.query;
  const data = generateFakeData(region, Number(seed), Number(errors), Number(page), Number(limit));
  res.json(data);
});

app.get('/api/export-csv', (req, res) => {
  const { region = '', seed = 0, errors = 0, page = 0, limit = 20 } = req.query;
  const data = generateFakeData(region, Number(seed), Number(errors), Number(page), Number(limit));

  res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  res.setHeader('Content-Type', 'text/csv');

  csv.write(data, { headers: true }).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});