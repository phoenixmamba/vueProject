import axios from 'axios';

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '/ai-meeting',
  timeout: 10000,
  withCredentials: true,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;