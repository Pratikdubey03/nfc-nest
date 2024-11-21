
    // Add Room functionality
    document.getElementById('add-room').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form refresh

        // Capture form data
        const room = {
            name: document.getElementById('name').value,
            rentperday: document.getElementById('rentperday').value,
            maxcount: document.getElementById('maxcount').value,
            description: document.getElementById('description').value,
            phonenumber: document.getElementById('phonenumber').value,
            type: document.getElementById('type').value,
            images: [
                document.getElementById('imageurl1').value,
                document.getElementById('imageurl2').value,
                document.getElementById('imageurl3').value,
            ],
        };

        // Store in localStorage
        let rooms = JSON.parse(localStorage.getItem('rooms')) || [];
        rooms.push(room);
        localStorage.setItem('rooms', JSON.stringify(rooms));

        alert('Room added successfully!');
        this.reset(); // Clear the form
    });

