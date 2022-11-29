const { Schema, model } = require('mongoose');
const User = require('./User');
const Group = require('./Group');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  group: {
    type: Schema.Types.ObjectId,
    ref: "Group",
  },

  comments: [
    {
      commentText: {
        type: String,
        required: true,
      },
      username: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});


const Post = model('post', postSchema)
module.exports = Post;
