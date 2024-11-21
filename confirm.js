document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your Public Key
    try {
        if (emailjs) {
            emailjs.init("Y8x1k7AIQi4zj8DAx"); // Replace with your actual EmailJS Public Key
        } else {
            throw new Error("EmailJS library is not loaded.");
        }
    } catch (error) {
        console.error("Error initializing EmailJS: ", error);
        alert("There was an issue with the email service. Please try again later.");
        return;
    }

    // Helper function to retrieve booking details from localStorage
    function getBookingDetails() {
        return {
            hotelName: localStorage.getItem('hotelName'),
            roomPrice: parseInt(localStorage.getItem('roomPrice'), 10) || 0,
            hotelImage: localStorage.getItem('hotelImage') || "default_image_url.jpg",
            startDate: localStorage.getItem('startDate'),
            endDate: localStorage.getItem('endDate'),
            totalDays: parseInt(localStorage.getItem('totalDays'), 10) || 1,
            totalPrice: parseInt(localStorage.getItem('totalPrice'), 10) || 0
        };
    }

    // Retrieve booking details
    const bookingDetails = getBookingDetails();

    // Validate booking details
    if (!bookingDetails.hotelName || !bookingDetails.startDate || !bookingDetails.endDate) {
        alert("Booking details are incomplete or missing. Please go back and fill in all required details.");
        return;
    }

    // Populate confirmation page with booking details
    document.getElementById('hotel-name').innerText = bookingDetails.hotelName;
    document.getElementById('hotel-image').src = bookingDetails.hotelImage;
    document.getElementById('start-date-summary').innerText = bookingDetails.startDate;
    document.getElementById('end-date-summary').innerText = bookingDetails.endDate;
    document.getElementById('total-days').innerText = bookingDetails.totalDays;
    document.getElementById('room-price').innerText = bookingDetails.roomPrice;
    document.getElementById('total-price').innerText = bookingDetails.totalPrice;

    // Update final price with extras
    let finalPrice = bookingDetails.totalPrice || 0;
    const spa = document.getElementById('spa');
    const breakfast = document.getElementById('breakfast');
    const airportTransfer = document.getElementById('airport-transfer');

    function updateFinalPrice() {
        finalPrice = bookingDetails.totalPrice || 0;
        if (spa?.checked) finalPrice += 500;
        if (breakfast?.checked) finalPrice += 200;
        if (airportTransfer?.checked) finalPrice += 800;
        document.getElementById('final-price').innerText = finalPrice;
    }

    if (spa && breakfast && airportTransfer) {
        spa.addEventListener('change', updateFinalPrice);
        breakfast.addEventListener('change', updateFinalPrice);
        airportTransfer.addEventListener('change', updateFinalPrice);
    }
    updateFinalPrice();

    // Show email popup when confirm booking button is clicked
    const emailPopup = document.getElementById('emailPopup');
    const confirmBookingBtn = document.getElementById('confirmBookingBtn');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if (emailPopup && confirmBookingBtn && closePopupBtn) {
        confirmBookingBtn.addEventListener('click', function () {
            emailPopup.style.display = 'flex';
        });

        closePopupBtn.addEventListener('click', function () {
            emailPopup.style.display = 'none';
        });
    }

    // Handle form submission
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            // Retrieve form values
            const email = document.getElementById('email').value.trim();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();

            // Validate form fields
            if (!email || !name || !phone) {
                alert("Please fill in all fields.");
                return;
            }

            // Call the function to send the email
            sendEmail(email, name, phone);
        });
    }

    // Function to send the email using EmailJS
    function sendEmail(email, name, phone) {
        const templateParams = {
            user_email: email,
            user_name: name,
            user_phone: phone,
            hotel_name: bookingDetails.hotelName,
            check_in_date: bookingDetails.startDate,
            check_out_date: bookingDetails.endDate,
            virtual_card_url: "https://yourvirtualcard.com", // Replace with dynamic URL if needed
            room_price: bookingDetails.roomPrice,
            total_price: finalPrice // Include updated final price
        };

        emailjs
            .send("service_257rzya", "template_vje8znr", templateParams)
            .then(function (response) {
                alert("Your room has been booked successfully! A confirmation email has been sent.");
                emailPopup.style.display = 'none'; // Hide the popup
            })
            .catch(function (error) {
                console.error("Error sending email: ", error);
                alert("There was an issue with booking your room. Please try again later.");
            });
    }
});
