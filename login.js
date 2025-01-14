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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const otpForm = document.getElementById('otpForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    // Show forgot password form
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    });

    // Handle sending OTP
    document.getElementById('forgotPasswordRequestForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailForOtp').value;

        const response = await fetch('/api/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('OTP sent to your email!');
            forgotPasswordForm.style.display = 'none';
            otpForm.style.display = 'block';
        } else {
            alert('Error sending OTP.');
        }
    });

    // Handle OTP verification
    document.getElementById('otpVerificationForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const otp = document.getElementById('otpInput').value;

        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp }),
        });

        if (response.ok) {
            alert('OTP verified! Proceed to reset password.');
            otpForm.style.display = 'none';
            resetPasswordForm.style.display = 'block';
        } else {
            alert('Invalid OTP.');
        }
    });

    // Handle password reset
    document.getElementById('resetPasswordFormSubmit').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: newPassword }),
        });

        if (response.ok) {
            alert('Password reset successfully!');
            location.reload();
        } else {
            alert('Error resetting password.');
        }
    });
});



});
