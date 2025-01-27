// script.js

let jsonData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    displayData(jsonData);  // Display all data initially
  })
  .catch(error => console.error('Error fetching JSON data:', error));

function filterData() {
  const filterId = document.getElementById('filterId').value;
  const filteredData = jsonData.filter(item => item.id == filterId);

  displayData(filteredData);
}

function displayData(data) {
  const tableBody = document.getElementById('jsonTable').getElementsByTagName('tbody')[0];
  
  // Clear existing rows
  tableBody.innerHTML = '';

  if (data.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5">No data found</td></tr>';
  } else {
    data.forEach(item => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.salary}</td>
        <td>${item.address}</td>
      `;
    });
  }
}
