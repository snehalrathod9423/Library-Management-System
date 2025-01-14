document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const otpForm = document.getElementById('otpForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    // Login functionality
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            // Fetch user data from localStorage (or replace with API call if applicable)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                alert('Login successful!');
                // Redirect to the library dashboard or home page
                window.location.href = 'library-dashboard.html'; // Replace with your dashboard URL
            } else {
                alert('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again.');
        }
    });

    // Show forgot password form
    document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        forgotPasswordForm.style.display = 'block';
    });

    // Handle sending OTP
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('emailForOtp').value;

        try {
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
                alert('Error sending OTP. Please check your email address.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Handle OTP verification
    otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const otp = document.getElementById('otpInput').value;

        try {
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
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });

    // Handle password reset
    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword }),
            });

            if (response.ok) {
                alert('Password reset successfully!');
                location.reload();
            } else {
                alert('Error resetting password. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});

