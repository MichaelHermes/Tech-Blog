const loginFormHandler = async event => {
	event.preventDefault();

	const username = document.querySelector('#username-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	// Make sure we have a username and password
	if (username && password) {
		// Attempt to log in the user
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// Redirect to the user's dashboard
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

const signupFormHandler = async event => {
	event.preventDefault();

	const username = document.querySelector('#username-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	// Make sure we have a username and password
	if (username && password) {
		// POST a new user
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// Redirect to the user's dashboard
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
