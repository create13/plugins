import Vue from 'vue';
import axios from 'axios';
// import qs from 'qs';
/*const baseURL = '/dangjian/';*/
const baseURL = '/dangjian/';

let requestCount = 0;
let requestLoading = count => {
    requestCount += count;
    requestCount === 0 && setTimeout(() => Vue.$vux.loading.hide(), 60);
    requestCount === 1 && Vue.$vux.loading.show({ text: '加载中' });
};

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (!/^(http(s)?:\/\/|\/)/.test(config.url)) {
            config.url = baseURL + config.url;
        }
        // if (config.method.toUpperCase() === 'POST') {
        //     config.data = qs.stringify(config.data);
        //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        // }
        requestLoading(1);
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
    response => {
        // Do something with response data
        /* if (!response.data.status) {
            return Promise.reject(response.data);
        }*/
        requestLoading(-1);
        return response.data;
    },
    error => {
        requestLoading(-1);
        return Promise.reject(error);
    }
);
