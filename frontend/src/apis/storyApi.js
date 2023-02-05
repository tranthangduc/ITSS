import axiosClient from './axiosClient';

const URL = '/stories';

const storyApi = {
  getListStories: (filter) => {
    return axiosClient.post(`${URL}`, filter);
  },

  getStory: (_id) => {
    return axiosClient.get(`${URL}/${_id}`);
  },

  createStory: (body) => {
    return axiosClient.post(`${URL}/create`, body);
  },

  deleteStoryById: (id) => {
    return axiosClient.delete(`${URL}/deleteItem/${id}`)
  }
};

export default storyApi;