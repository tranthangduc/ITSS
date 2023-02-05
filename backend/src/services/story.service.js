const StoryModel = require('../models/story.model');

exports.getStories = async (filter) => {
  let searchResult = await StoryModel.find({});
  if (!searchResult) {
    return {
      code: 404,
      data: {}
    }
  } else {
    searchResult = searchResult.filter((item) => {
      return item.name.includes(filter.searchKey)
    });
    let newResult = searchResult.slice(0, filter.pageIndex * filter.pageSize)
    if(filter.sortType === 'asc') {
      newResult.sort();
    }else if(filter.sortType === 'desc') {
      newResult.sort();
      newResult.reverse();
    }
    return {
      code: 200,
      data: {
        newResult
      }
    }
  }
}

exports.getStoryById = async (id) => {
  const searchResult = await StoryModel.findById(id);
  if (!searchResult) {
    return {
      code: 404,
      data: {}
    }
  } else return {
    code: 200,
    data: {
      name: searchResult.name,
      picture: searchResult.picture,
      description: searchResult.description,
      values: searchResult.values,
      listWords: searchResult.listWords
    }
  }
}

exports.createStory = async (name, description, picture, values) => {
  try {
    const newStory = await StoryModel.create({name, description, picture, values});
    if (newStory && newStory._id) return newStory;
    return null; 
  } catch (error) {
    throw error;
  }
}

exports.deleteStoryById = async (id) => {
  try {
    const newStory = await StoryModel.deleteOne({_id: id});
    return newStory; 
  } catch (error) {
    throw error;
  }
}