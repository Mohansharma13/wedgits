document.addEventListener("DOMContentLoaded", function() {
    // Function to get the current date in the format "Month Day"
    function getCurrentDate() {
        const now = new Date();
        const options = { month: 'long', day: 'numeric' };
        return now.toLocaleDateString(undefined, options);
    }

    // Function to update the state and date
    function updateWeatherInfo(state) {
        const locationElement = document.getElementById('location');
        const dayElement = document.getElementById('day');

        // Update location with state
        locationElement.innerHTML = `${state}<br>`;

        // Update day
        if (dayElement) {
            dayElement.textContent = getCurrentDate();
        }
    }

    // Function to fetch the user's location
    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Use a reverse geocoding API to get the location name
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then(response => response.json())
                        .then(data => {
                            // Extract state from the address components
                            const address = data.address || {};
                            const state = address.state || 'Unknown State';
                            
                            updateWeatherInfo(state);
                        })
                        .catch(() => {
                            updateWeatherInfo('Unable to determine state');
                        });
                },
                function() {
                    // Handle error
                    updateWeatherInfo('Geolocation access denied');
                }
            );
        } else {
            // Geolocation is not supported
            updateWeatherInfo('Geolocation is not supported');
        }
    }

    // Call the function to get the user's location
    getUserLocation();
});
