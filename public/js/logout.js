const logout = async () => {
	// Remove the user's session object
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		// Redirect to the homepage
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
};

document.querySelector('#logout').addEventListener('click', logout);
