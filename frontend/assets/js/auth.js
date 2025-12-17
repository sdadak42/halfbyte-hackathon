document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        loginKey: email, 
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    window.location.href = 'workspace.html';
                } else {
                    errorMessage.textContent = data.message || 'Login failed';
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                console.error('Login error:', error);
                errorMessage.textContent = 'Server connection failed. Is the backend running?';
                errorMessage.style.display = 'block';
            }
        });
    }

    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorMessage = document.getElementById('error-message');

            console.log('Values:', { name, username, email, password }); 

            errorMessage.style.display = 'none';
            errorMessage.textContent = '';

            const nameParts = name.trim().split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            try {
                console.log('Sending request to backend...'); 
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        firstName,
                        lastName
                    })
                });
                const data = await response.json();

                if (response.ok) {
                    // Redirect to sign in without alert
                    window.location.href = 'sign_in.html';
                } else {
                    errorMessage.textContent = data.message || 'Registration failed';
                    errorMessage.style.display = 'block';
                }

            } catch (error) {
                console.error('Register error:', error);
                errorMessage.textContent = 'Server connection failed.';
                errorMessage.style.display = 'block';
            }
        });
    }
});
