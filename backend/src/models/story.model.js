const mongoose = require('mongoose');
const { NUM_OF_SPECIALTY, NUM_OF_TOPICS } = require('../constant');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 150,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 250,
  },

  // link picture source
  picture: {
    type: String,
    trim: true,
    default: null,
  },
  values: {
    type: String,
    trim: true,
    default: null,
  }
});

const StoryModel = mongoose.model('stories', storySchema, 'stories');

module.exports = StoryModel;