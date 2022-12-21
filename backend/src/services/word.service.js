const WordModel = require('../models/word.model');

exports.createNewWord = async (wordInfo) => {
  try {
    const newWord = await WordModel.create({ ...wordInfo });

    if (newWord) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.searchWord = async (word = '', limit = 20, select = '') => {
  try {
    const regex = new RegExp(`^${word}.*`, 'gi');
    const list = await WordModel.find({ word: regex })
      .limit(limit)
      .select(select);
    return list;
  } catch (error) {
    throw error;
  }
};

exports.getWordDetail = async (word = '') => {
  try {
    const res = await WordModel.findOne({ word });

    return res;
  } catch (error) {
    throw error;
  }
};

exports.getFavoriteList = async (rawFavorites = []) => {
  try {
    if (!Array.isArray(rawFavorites) || rawFavorites.length === 0) {
      return [];
    }

    let list = [];
    for (let word of rawFavorites) {
      const regex = new RegExp(`^${word}.*`, 'gi');
      const wordDetails = await WordModel.findOne({ word: regex }).select(
        '-_id type word mean phonetic picture',
      );
      if (wordDetails) {
        list.push(wordDetails);
      }
    }

    return list;
  } catch (error) {
    throw error;
  }
};

exports.getWordById = async id => {
  const searchResult = await WordModel.findById({ _id: id });
  if (!searchResult) {
    return {
      code: 404,
      data: {}
    }
  } else return {
    code: 200,
    data: {
      word: searchResult.word,
      picture: searchResult.picture,
      phonetic: searchResult.phonetic,
      mean: searchResult.mean,
      phonetic: searchResult.phonetic
    }
  }
}