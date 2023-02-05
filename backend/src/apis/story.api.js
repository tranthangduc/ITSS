const storyApi = require('express').Router();
const storyController = require('../controllers/story.controller');
const { jwtAuthentication } = require('../middlewares/passport.middleware');

storyApi.post('/', storyController.getStories);
storyApi.get('/:id', storyController.getStortById);
storyApi.post('/create', storyController.createStory);
storyApi.delete('/deleteItem/:id', storyController.deleteStory)

module.exports = storyApi;