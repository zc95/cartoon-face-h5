import axios from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: '/bd-api',
    timeout: 50000, // 设置请求超时
});

// post请求头的设置
service.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器，过滤响应
service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // const errorRes = error.response;
        return Promise.reject(error);
    }
);

export default service;
