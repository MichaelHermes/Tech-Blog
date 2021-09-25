module.exports = {
	format_date: date => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	post_card: (post, link) => {
		let postCard = "<section class='card my-3 mx-auto post-card'>";

		if (link) {
			postCard += `
			<a href='/post/${post.id}' class='card-header stretched-link'>
				<h2>${post.title}</h2>
			</a>`;
		} else {
			postCard += `
			<div class='card-header'>
				<h2>${post.title}</h2>
			</div>`;
		}

		postCard += `
			<div class='card-body'>
				<div class='card-subtitle mb-2 text-muted'>By: ${post.user.username}</div>
				<div class='card-text fs-5'>${post.content}</div>
			</div>
		</section>`;

		return postCard;
	},
};
