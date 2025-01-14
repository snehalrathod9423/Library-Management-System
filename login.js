 document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            const forgotPasswordForm = document.getElementById('forgotPasswordForm');
            const otpForm = document.getElementById('otpForm');
            const resetPasswordForm = document.getElementById('resetPasswordForm');

            // Show forgot password form
            document.getElementById('forgotPasswordLink').addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.classList.add('hidden');
                forgotPasswordForm.classList.remove('hidden');
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
                        forgotPasswordForm.classList.add('hidden');
                        otpForm.classList.remove('hidden');
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
                        otpForm.classList.add('hidden');
                        resetPasswordForm.classList.remove('hidden');
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
