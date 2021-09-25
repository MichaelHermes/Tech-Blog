const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Create a new post
router.post('/', async (req, res) => {
	try {
		const newPost = await Post.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Update an existing post
router.put('/:id', async ({ params, body }, res) => {
	try {
		const postData = await Post.update(body, { where: { id: params.id } });
		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete an existing post
router.delete('/:id', async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!postData) {
			res.status(404).json({ message: 'No blog post found with this id!' });
			return;
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TESTING ROUTES
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['username'],
						},
					],
				},
			],
		});
		const posts = postData.map(post => post.get({ plain: true }));
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				{
					model: User,
					attributes: ['username'],
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['username'],
						},
					],
				},
			],
		});

		if (!postData) {
			res.status(404).json({ message: 'No blog post found with this id!' });
			return;
		}

		const post = postData.get({ plain: true });
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
