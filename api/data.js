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
  const id = req.query.id ? parseInt(req.query.id) : null; // Check if 'id' is provided
  const data = getData();
  
  if (id) {
    // If 'id' is provided, filter the data by id
    const filteredData = data.filter(item => item.id === id);

    if (filteredData.length > 0) {
      res.status(200).json(filteredData[0]);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } else {
    // If 'id' is not provided, return all the data
    res.status(200).json(data);
  }
};
