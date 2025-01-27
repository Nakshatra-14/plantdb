const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 2000;

// Path to the JSON file
const dataFilePath = path.join(__dirname, 'data', 'data.json');

// Function to read the JSON file
const getData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// Endpoint to return the filtered data by ID
app.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const data = getData();
  const filteredData = data.filter(item => item.id === id);

  if (filteredData.length > 0) {
    res.json(filteredData[0]);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
