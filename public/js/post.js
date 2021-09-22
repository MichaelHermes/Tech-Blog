const formSubmitHandler = async event => {
	event.preventDefault();

	const title = document.querySelector('#post-title').value.trim();
	const content = document.querySelector('#post-content').value.trim();

	// Make sure we have title and content
	if (title && content) {
		// If the form has a 'data-id' attribute, we know we're updating an existing post
		if (event.target.hasAttribute('data-id')) {
			const id = event.target.getAttribute('data-id');

			const title = document.querySelector('#post-title').value.trim();
			const content = document.querySelector('#post-content').value.trim();

			const response = await fetch(`/api/posts/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ title, content }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				document.location.replace('/dashboard');
			} else {
				alert('Failed to update blog post');
			}
		} else {
			const response = await fetch(`/api/posts`, {
				method: 'POST',
				body: JSON.stringify({ title, content }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				document.location.replace('/dashboard');
			} else {
				alert('Failed to create blog post');
			}
		}
	}
};

async function deletePost() {
	const id = document.querySelector('#delete-post').getAttribute('data-id');
	const response = await fetch(`/api/posts/${id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete blog post');
	}
}

document
	.querySelector('.post-form')
	.addEventListener('submit', formSubmitHandler);
