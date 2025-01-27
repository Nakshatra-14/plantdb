window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const jsonFilePath = 'data.json'; // path to your JSON file

    try {
        const response = await fetch(jsonFilePath);
        const data = await response.json();
        
        let filteredData = data;

        // Apply filters based on URL parameters
        urlParams.forEach((value, key) => {
            filteredData = filteredData.filter(item => {
                if (item.hasOwnProperty(key)) {
                    return item[key] == value;
                }
                return false;
            });
        });

        displayJson(filteredData);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
};

function displayJson(data) {
    const outputDiv = document.getElementById('json-output');
    if (data.length > 0) {
        outputDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } else {
        outputDiv.innerHTML = '<p>No matching data found.</p>';
    }
}
