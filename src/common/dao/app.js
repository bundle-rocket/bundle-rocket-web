/**
 * @file dao/app
 * @author leon(ludafa@outlook.com)
 */

const fetch = require('../util/fetch');

exports.list = () => {
    return fetch.get('/app');
};
