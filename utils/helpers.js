module.exports = {
	format_date: date => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
	},
	format_amount: amount => {
		// format large numbers with commas
		return parseInt(amount).toLocaleString();
	},
	post_summary: post => {
		return `<section class='card'>
		<a href='/post/${post.id}'>
			<h4>${post.title}</h4>
		</a>
		<p>${post.content}</p>
	</section>`;
	},
	// get_emoji: () => {
	// 	const randomNum = Math.random();

	// 	// Return a random emoji
	// 	if (randomNum > 0.7) {
	// 		return `<span for="img" aria-label="lightbulb">💡</span>`;
	// 	} else if (randomNum > 0.4) {
	// 		return `<span for="img" aria-label="laptop">💻</span>`;
	// 	} else {
	// 		return `<span for="img" aria-label="gear">⚙️</span>`;
	// 	}
	// },
};
