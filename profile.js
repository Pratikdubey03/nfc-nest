document.addEventListener("DOMContentLoaded", function() {
    // Fetch booking data from localStorage
    const currentBookings = JSON.parse(localStorage.getItem('currentBookings')) || [];
    const pastBookings = JSON.parse(localStorage.getItem('pastBookings')) || [];

    // Render Current Bookings
    const currentBookingsContainer = document.getElementById('current-bookings');
    if (currentBookings.length > 0) {
        currentBookings.forEach(booking => {
            const bookingDiv = createBookingElement(booking);
            currentBookingsContainer.appendChild(bookingDiv);
        });
    } else {
        currentBookingsContainer.innerHTML = "<p>No current bookings.</p>";
    }

    // Render Past Bookings
    const pastBookingsContainer = document.getElementById('past-bookings');
    if (pastBookings.length > 0) {
        pastBookings.forEach(booking => {
            const bookingDiv = createBookingElement(booking);
            pastBookingsContainer.appendChild(bookingDiv);
        });
    } else {
        pastBookingsContainer.innerHTML = "<p>No past bookings.</p>";
    }

    // Helper function to create booking elements
    function createBookingElement(booking) {
        const bookingDiv = document.createElement('div');
        bookingDiv.classList.add('booking');

        const bookingDetails = `  
            <p><strong>Hotel:</strong> ${booking.hotelName}</p>
            <p><strong>Room Type:</strong> ${booking.roomType}</p>
            <p><strong>Price:</strong> ₹${booking.price}</p>
            <p><strong>Booking Date:</strong> ${booking.bookingDate}</p>
            <p><strong>Check-in:</strong> ${booking.checkInDate}</p>
            <p><strong>Check-out:</strong> ${booking.checkOutDate}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
        `;

        bookingDiv.innerHTML = bookingDetails;
        return bookingDiv;
    }
});
