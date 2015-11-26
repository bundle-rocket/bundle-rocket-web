/**
 * @file 账号相关的 dao
 * @author leon(ludafa@outlook.com)
 */

const fetch = require('../util/fetch');
const {toQueryString} = require('numen/util');
const cleanFetch = fetch.createInstance();
const jshashes = require('jshashes');
const SHA256 = new jshashes.SHA256();


exports.info = () => {
    return fetch.get('/user');
};

exports.login = function (email, password) {
    return cleanFetch.post('/login', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept-type': 'application/json'
        },
        body: toQueryString({
            email,
            password: SHA256.hex(password)
        })
    });
};

exports.register = function (user) {

    const {password, ...rest} = user;

    return cleanFetch.post('/register', {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept-type': 'application/json'
        },
        body: toQueryString({
            ...rest,
            password: SHA256.hex(password)
        })
    }).then((user) => {
        console.log(user);
        return user;
    });

};
