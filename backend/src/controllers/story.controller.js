const {
    isExistWord,
    uploadImage,
    getWordPack,
} = require('../services/common.service');
const {
    getStories,
    getStoryById,
    createStory
} = require('../services/story.service');

exports.getStories= async (req, res) => {
    const listStories = await getStories(req.body);
    return res.status(200).json(listStories);
}

exports.getStortById= async (req, res) => {
    const { id } = req.params;
    const result = await getStoryById(id);
    return res.status(200).json(result);
}

exports.createStory= async (req, res) => {
    const {name, description, picture, values} = req.body;
    const result = await createStory(name, description, picture, values);
    return res.status(200).json(result);
}