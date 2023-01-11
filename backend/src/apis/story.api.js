const storyApi = require('express').Router();
const storyController = require('../controllers/story.controller');
const { jwtAuthentication } = require('../middlewares/passport.middleware');

storyApi.post('/', storyController.getStories);

module.exports = storyApi;