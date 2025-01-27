window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const jsonFilePath = 'data.json'; // Path to your JSON file

    try {
        const response = await fetch(jsonFilePath);
        const data = await response.json();

        // Get the 'id' parameter from the URL
        const id = urlParams.get('id');
        
        // If 'id' is present, filter data for the specific ID
        if (id) {
            const filteredData = data.filter(item => item.id == id);
            displayJson(filteredData);
        } else {
            displayJson(data);  // If no 'id' parameter, show all data
        }
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
};

function displayJson(data) {
    const outputDiv = document.getElementById('json-output');
    
    if (data.length > 0) {
        // Display the filtered data in a readable format
        outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } else {
        // If no matching data found, show a message
        outputDiv.innerHTML = '<p>No matching data found for the given ID.</p>';
    }
}
