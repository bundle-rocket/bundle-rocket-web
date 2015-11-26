/**
 * @file routes
 * @author leon(ludafa@outlook.com)
 */

const app = require('./app/routes');
const login = require('./login/routes');
const register = require('./register/routes');

module.exports = [...app, ...login, ...register]
    .map((route) => {

        const {path} = route;

        return {
            ...route,
            path: `/web${path}`
        };

    });
