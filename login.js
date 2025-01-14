document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // Login functionality
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        // Get input values
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        try {
            // Fetch user data from localStorage (Replace this with API calls if needed)
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Validate user credentials
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Login successful
                alert('Login successful!');
                // Redirect to the library dashboard
                window.location.href = library.html; // Replace with the actual dashboard URL
            } else {
                // Login failed
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    });
});
