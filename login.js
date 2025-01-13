document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user exists and credentials match
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // If credentials match, login successful
        alert('Login successful!');
        // Redirect to the library page
        window.location.href = 'library.html';  // You can modify this to your library page URL
    } else {
        // If no match, show error
        alert('Invalid credentials! Please try again.');
    }
});
