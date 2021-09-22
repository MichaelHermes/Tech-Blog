const newPostHandler = async event => {
	document.location.replace('/newPost');
};

document.querySelector('#new-post').addEventListener('click', newPostHandler);
