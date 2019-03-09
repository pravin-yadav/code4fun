import axios from 'axios';

export default {
  user: {
    signup: data => axios.post('/api/users/signup', data),
    login: data => axios.post('/api/users/login', data),
  },
};
