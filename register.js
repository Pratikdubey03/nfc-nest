document.getElementById('register-form').addEventListener('submit', handleRegister);

function handleRegister(event) {
    event.preventDefault();  // Prevent default form submission

    // Get the input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    // Check if the username already exists in localStorage
    if (localStorage.getItem(username)) {
        alert('Username already taken. Please choose another one.');
        return;
    }

    // Store user data in localStorage
    const user = {
        username: username,
        email: email,
        password: password
    };
    localStorage.setItem(username, JSON.stringify(user));  // Save user as JSON object

    // Redirect to homepage after successful registration
    alert('Registration successful!');
    window.location.href = "homepage.html";
}
