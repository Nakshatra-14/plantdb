const fs = require('fs');
const path = require('path');

// Path to the JSON file
const dataFilePath = path.join(__dirname, '../data', 'data.json');

// Function to read the JSON file
const getData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// This is the serverless function handler
module.exports = (req, res) => {
  const id = parseInt(req.query.id); // Access the 'id' parameter from the URL query string
  const data = getData();
  const filteredData = data.filter(item => item.id === id);

  if (filteredData.length > 0) {
    res.status(200).json(filteredData[0]);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
};
