const {
    isExistWord,
    uploadImage,
    getWordPack,
} = require('../services/common.service');
const {
    getStories
} = require('../services/story.service');

exports.getStories= async (req, res) => {
    const listStories = await getStories(req.body);
    return res.status(200).json(listStories);
}