import axiosClient from './axiosClient';

const URL = '/stories';

const storyApi = {
  getListStories: (filter) => {
    return axiosClient.post(`${URL}`, filter);
  },
};

export default storyApi;