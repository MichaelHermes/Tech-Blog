const newPostHandler = async () => {
	// When the '+ New Post' button is clicked, redirect to the '/post' route to display the form for creating a new blog post.
	document.location.replace('/post');
};

document.querySelector('#new-post').addEventListener('click', newPostHandler);
