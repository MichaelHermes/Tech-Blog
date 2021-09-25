module.exports = {
	section: (name, options) => {
		if (!this._sections) this._sections = {};
		this._sections[name] = options.fn(this);
		return null;
	},
	format_date: date => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	post_card: (post, link) => {
		let postCard = `	<section class='card my-3 mx-auto post-card'>
			<h2 class='card-header'>${post.title}</h2>
			<div class='card-body'>
				<div class='card-subtitle mb-2 text-muted'>By: ${post.user.username}</div>
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
