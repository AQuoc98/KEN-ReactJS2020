import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '/auth/local/register';
    return axiosClient.post(url, data);
  },
  // nguyendinhanhquoc3398@gmail.com - 123123 || nguyendinhanhquoc331998@gmail.com - 123123

  login(data) {
    const url = '/auth/local';
    return axiosClient.post(url, data);
  },
};

export default userApi;
