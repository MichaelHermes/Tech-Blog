module.exports = {
	format_date: date => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	post_card: (post, link) => {
		// Constructs the HTML to display a blog post. A 'link' boolean determines if the blog post can be clicked on to edit/comment.
		let postCard = `	<section class='card my-3 mx-auto post-card'>
			<h2 class='card-header fw-bold'>${post.title}</h2>
			<div class='card-body'>
				<div class='card-subtitle mb-2 text-muted'>By: ${
					post.user.username
				} on ${post.createdAt.toLocaleDateString()}</div>
				<div class='card-text fs-5'>${post.content}</div>
			</div>`;

		if (link) {
			postCard += `
			<a href='/post/${post.id}' class='stretched-link'></a>`;
		}

		postCard += `
		</section>`;
		return postCard;
	},
};
