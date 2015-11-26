/**
 * @file fetch 的拦截器们
 * @author leon(ludafa@outlook.com)
 */

const fetch = require('./fetch');

fetch.addInterceptor('request', (config) => {

    const token = sessionStorage.getItem('jwttoken');

    if (!token) {
        return config;
    }

    return {
        ...config,
        headers: {
            ...config.headers,
            authorization: `Bearer ${token}`
        }
    };

});

const Alert = require('../component/Alert');
const locator = require('../../locator');

const RESERVED_ERROR_MESSAGES = {
    401: '您的会话已超时，请重新登录'
};

fetch.addInterceptor('response', (response) => {

    if (response instanceof Error) {

        const {status, message} = response;

        Alert
            .show(RESERVED_ERROR_MESSAGES[status] || message)
            .then(() => {
                locator.redirect('/web/login');
            });
    }

    return response;

});
