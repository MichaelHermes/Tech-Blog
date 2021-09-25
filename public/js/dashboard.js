const newPostHandler = async () => {
	document.location.replace('/post');
};

document.querySelector('#new-post').addEventListener('click', newPostHandler);
