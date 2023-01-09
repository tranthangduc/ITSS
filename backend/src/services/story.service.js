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