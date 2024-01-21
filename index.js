document.getElementById('flightForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const flightNumber = document.getElementById('num').value;
    const flightName = document.getElementById('name').value;
    const formattedDate = getFormattedDate();

    const apiUrl = `https://api.flightapi.io/airline/65aced944a654be42cdd43e4?num=${flightNumber}&name=${flightName}&date=${formattedDate}`;


    console.log(apiUrl);
    // Make a GET request to the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process your data here
             displayFlightDetails(data);
             function displayFlightDetails(data) {
                const departure = data[0].departure[0]; 
                const arrival = data[1].arrival[0];

                const detailsHTML = `
                <h1>Flight Status</h1>
                <div>
                    <h3>Departure</h3>
                    <p>Status: ${departure.status}</p>
                    <p>Airport: ${departure['Airport:']}</p>
                    <p>Scheduled Time: ${departure['Scheduled Time:']}</p>
                    <p>Takeoff Time: ${departure['Takeoff Time:']}</p>
                </div>
                <div>
                    <h3>Arrival</h3>
                    <p>Airport: ${arrival['Airport:']}</p>
                    <p>Scheduled Time: ${arrival['Scheduled Time:']}</p>
                    <p>Estimated Time: ${arrival['Estimated Time:']}</p>
                    <p>Time Remaining: <b>${arrival['Time Remaining:']}</b></p>
                </div>
                `;
                document.getElementById('flightDetails').innerHTML = detailsHTML;
                
             }     
             console.log(data);
            // For example, display the flight details
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
});

function formatNumber(number) {
    return number < 10 ? '0' + number : number;
}

function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = formatNumber(today.getMonth() + 1);
    const day = formatNumber(today.getDate());
    return `${year}${month}${day}`;
}
