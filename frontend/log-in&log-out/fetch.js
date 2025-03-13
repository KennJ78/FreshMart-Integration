const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

/*** LOGIN FUNCTION*/
async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showAlert(false, 'Please enter your username and password.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Login failed');

        showAlert(true, 'Login successful!'); 
        localStorage.setItem('token', result.token);
        
    } catch (error) {
        showAlert(false, error.message);
    }
}

/*** SIGNUP FUNCTION*/
async function handleSignup(event) {
    event.preventDefault();

    const formData = {
        fullName: document.getElementById('signupFullName').value,
        email: document.getElementById('signupEmail').value,
        username: document.getElementById('signupUsername').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('signupConfirmPassword').value
    };

    if (formData.password !== formData.confirmPassword) {
        showAlert(false, 'Passwords do not match.');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Signup failed');

        showAlert(true, 'Signup successful! You can now login.');
        closeModal('signupModal');

    } catch (error) {
        showAlert(false, error.message);
    }
}

/***FORGOT PASSWORD FUNCTION*/
async function handleForgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('forgotEmail').value;

    try {
        const response = await fetch(`${API_BASE_URL}/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Password reset failed');

        showAlert(true, 'Password reset email sent.');
        closeModal('forgotModal');

    } catch (error) {
        showAlert(false, error.message);
    }
}

/*** UTILITY FUNCTION FOR SHOWING ALERTS*/
function showAlert(isSuccess, message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '20px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.padding = '10px 20px';
    alertBox.style.color = 'white';
    alertBox.style.backgroundColor = isSuccess ? 'green' : 'red';
    alertBox.style.borderRadius = '5px';
    alertBox.style.zIndex = '9999';

    document.body.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

/*** MODAL HANDLING FUNCTIONS*/
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
