const formSubmitHandler = async event => {
	event.preventDefault();

	const text = document.querySelector('#comment-text').value.trim();

	if (text && event.target.hasAttribute('data-id')) {
		const id = event.target.getAttribute('data-id');

		// POST the new comment to the blog post.
		const response = await fetch(`/api/comments`, {
			method: 'POST',
			body: JSON.stringify({ text, post_id: id }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			// Reload the current blog post to display the new comment.
			document.location.reload();
		} else {
			alert('Failed to create blog post comment');
		}
	}
};

document
	.querySelector('.comment-form')
	.addEventListener('submit', formSubmitHandler);
