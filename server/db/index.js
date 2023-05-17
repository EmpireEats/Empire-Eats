const User = require('./models/User');
const Review = require('./models/Review');
const Post = require('./models/Post');
const UserInteraction = require('./models/UserInteraction');
const HiddenPost = require('./models/HiddenPost');

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(UserInteraction, { foreignKey: 'postAuthorId' });
UserInteraction.belongsTo(User, { foreignKey: 'postAuthorId' });

User.hasOne(UserInteraction, { foreignKey: 'interactingUserId' });
UserInteraction.belongsTo(User, { foreignKey: 'interactingUserId' });

Post.hasMany(UserInteraction);
UserInteraction.belongsTo(Post);

User.hasMany(HiddenPost, { foreignKey: 'userId' });
HiddenPost.belongsTo(User);

Post.hasMany(HiddenPost, { foreignKey: 'postId' });
HiddenPost.belongsTo(Post);

module.exports = {
  User,
  Review,
  Post,
  UserInteraction,
  HiddenPost,
};
