const User = require('./User');
const Post = require('./Post');

// A User has many Posts;
User.hasMany(Post, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

// A Post belongs to a single User;
Post.belongsTo(User, {
	foreignKey: 'user_id',
});

module.exports = { User, Post };
