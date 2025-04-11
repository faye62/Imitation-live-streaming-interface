// 引入axios
import axios from 'axios';
import router from '../../router';
import MyStorage from '../storage/storage.js'
import {showToast, showFailToast} from 'vant'
// 基础配置
const url = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = url;
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 动态设置请求头
        // 登录相关接口不需要设置 token
        const whiteList = ['/smst/user/send-code', '/smst/user/login'];
        if (!whiteList.includes(config.url)) {
            const accessToken = MyStorage.getUserToken()
            if (accessToken) {
                config.headers['x-user-token'] = accessToken
            } else {
                showFailToast('登录异常，请重新登录');
                MyStorage.clearUser()
                router.push({path: '/login'})
            }
        }
        config.headers['tenant-id'] = '1' // 设置 tenant-id
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 确保 response 存在
        if (!response) {
            showToast({
                type: 'danger',
                message: '请求失败：无响应',
            });
            return Promise.reject(new Error('无响应'));
        }

        // 确保 response.data 存在
        if (!response.data) {
            showToast({
                type: 'danger',
                message: '请求失败,响应数据为空',
            });
            return Promise.reject(new Error('响应数据为空'));
        }
        const {code, msg} = response.data;
        if (response.status === 401 || response.data.code === 401) {
            // 处理 401 未授权错误
            router.push({path: '/login'})
            return Promise.reject(new Error('账号未授权'));
        }

        if (response.status === 200) {
            return response.data;
        } else {
            showToast({
                type: 'danger',
                message: msg || '请求失败',
            });
            return Promise.reject(response.data);
        }
    },
    (error) => {
        // 处理网络错误或请求被取消的情况
        if (!error.response) {
            showToast({
                type: 'danger',
                message: '请检查API是否异常',
            });
            console.error('API异常:', error);
            return Promise.reject(error);
        }

        // 处理超时错误
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            showToast({
                type: 'danger',
                message: '请求超时',
            });
            return Promise.reject(error);
        }

        // 其他错误
        showToast({
            type: 'danger',
            message: error.response.data.message || '请求失败',
        });
        return Promise.reject(error);
    }
);

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
    return axios({
        method: 'post',
        url,
        data,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
    return axios({
        method: 'get',
        url,
        params,
    });
}

export function _delete(url, params = {}) {
    return axios({
        method: 'delete',
        url,
        params,
    });
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
    return axios({
        method: 'put',
        url,
        params,
        data,
    });
}

export function getFile(url, params = {}) {
    return axios({
        method: 'get',
        url,
        params,
        responseType: 'blob',
    });
}

export function postFile(url, data, params = {}) {
    return axios({
        method: 'post',
        url,
        params,
        data,
        responseType: 'blob',
    });
}

export default axios;
