// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the room type dropdown filter
    document.getElementById('room-type-dropdown').addEventListener('change', function() {
        const selectedRoomType = this.value; // Get the selected filter value
        const hotels = document.querySelectorAll('.hotel'); // Select all hotel elements

        // Loop through each hotel and apply the filter
        hotels.forEach(hotel => {
            const roomType = hotel.getAttribute('data-room-type'); // Get the hotel room type
            
            if (selectedRoomType === 'all' || roomType === selectedRoomType) {
                hotel.style.display = 'block'; // Show hotel if it matches the filter
            } else {
                hotel.style.display = 'none'; // Hide hotel if it doesn't match the filter
            }
        });
    });

    // Add hover effect for hotels
    document.querySelectorAll('.hotel').forEach(hotel => {
        hotel.addEventListener('mouseover', function() {
            hotel.classList.add('hover-effect'); // Add hover effect class
        });

        hotel.addEventListener('mouseout', function() {
            hotel.classList.remove('hover-effect'); // Remove hover effect class
        });
    });

    // Event listener for the "Book Now" buttons
    document.querySelectorAll('.book-now').forEach(button => {
        button.addEventListener('click', function() {
            const hotel = button.closest('.hotel'); // Find the parent hotel element
            if (!hotel) {
                alert("Error: Unable to find hotel details.");
                return;
            }

            const hotelName = hotel.querySelector('h2').innerText; // Get hotel name
            const roomPrice = parseInt(hotel.getAttribute('data-price'), 10); // Get hotel price
            const hotelImage = hotel.getAttribute('data-image'); // Get hotel image URL
            const startDate = document.getElementById('start-date').value; // Get start date
            const endDate = document.getElementById('end-date').value; // Get end date

            // Validate input
            if (!startDate || !endDate) {
                alert("Please select valid start and end dates.");
                return;
            }

            const totalDays = calculateTotalDays(startDate, endDate);
            if (totalDays <= 0) {
                alert("End date must be after the start date.");
                return;
            }

            if (isNaN(roomPrice)) {
                alert("Invalid room price. Please try again.");
                return;
            }

            const totalPrice = totalDays * roomPrice; // Calculate the total price

            // Store data in localStorage
            try {
                localStorage.setItem('hotelName', hotelName);
                localStorage.setItem('roomPrice', roomPrice);
                localStorage.setItem('hotelImage', hotelImage);
                localStorage.setItem('startDate', startDate);
                localStorage.setItem('endDate', endDate);
                localStorage.setItem('totalDays', totalDays);
                localStorage.setItem('totalPrice', totalPrice);
            } catch (error) {
                alert("Error saving booking details. Please try again.");
                console.error(error);
                return;
            }

            // Redirect to confirmation page
            window.location.href = "confirmation.html";
        });
    });
});

// Function to calculate the total number of days between two dates
function calculateTotalDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;

    // Ensure minimum 1 day is counted if dates are the same
    return Math.max(Math.ceil(timeDiff / (1000 * 3600 * 24)), 1);
}
