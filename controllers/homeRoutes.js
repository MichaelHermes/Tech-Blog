const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

const THETECHBLOG = 'The Tech Blog';
const YOURDASHBOARD = 'Your Dashboard';

// Render the template for the app homepage (a list of all existing posts)
router.get('/', async (req, res) => {
	try {
		// Get all posts and include the associated user data
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});
		// Serialize data so the template can read it
		const posts = postData.map(post => post.get({ plain: true }));

		// Pass serialized data and session flag into template
		res.render('homepage', {
			posts,
			title: THETECHBLOG,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Render the template for the current logged-in user's dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	try {
		// Find the logged in user based on the session's user_id
		const userData = await User.findByPk(req.session.user_id, {
			attributes: { exclude: ['password'] },
			include: [{ model: Post }],
		});
		const user = userData.get({ plain: true });

		res.render('dashboard', {
			...user,
			title: YOURDASHBOARD,
			logged_in: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Render the template for editing an existing post
router.get('/post/:id/edit', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id);
		const post = postData.get({ plain: true });

		res.render('post', {
			post,
			title: YOURDASHBOARD,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Render the template for existing post details (i.e. comments)
router.get('/post/:id', withAuth, async (req, res) => {
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
		const post = postData.get({ plain: true });
		//console.log(postData, post);

		res.render('comments', {
			post,
			title: THETECHBLOG,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/login', (req, res) => {
	// If the user is already logged in, redirect the request to their dashboard
	if (req.session.logged_in) {
		res.redirect('/dashboard');
		return;
	}

	res.render('login', {
		title: THETECHBLOG,
	});
});

// Render the template for creating a new post
router.get('/post', (req, res) => {
	res.render('post', {
		title: YOURDASHBOARD,
		logged_in: req.session.logged_in,
	});
});

module.exports = router;
