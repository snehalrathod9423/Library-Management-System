document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Create a user object
    let user = {
        username: username,
        email: email,
        password: password
    };

    // Check if the email already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        alert('Email already exists! Please login or use another email.');
    } else {
        // Store user data in localStorage
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirect to login page after successful registration
        alert('Account created successfully!');
        window.location.href = 'login.html';
    }
});
