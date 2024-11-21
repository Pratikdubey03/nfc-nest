document.getElementById('login-form').addEventListener('submit', handleLogin);

function handleLogin(event) {
    event.preventDefault();  // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the user is registered by checking localStorage
    const storedUser = localStorage.getItem(username);

    if (!storedUser) {
        alert('This username is not registered. Please sign up first.');
        return;
    }

    const user = JSON.parse(storedUser);  // Parse the stored user data

    // Validate the password
    if (user.password !== password) {
        alert('Incorrect password. Please try again.');
        return;
    }

    // If login is successful, redirect to homepage
    alert('Login successful!');
    window.location.href = "homepage.html";
}
