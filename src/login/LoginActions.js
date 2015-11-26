/**
 * @file 登录相关的 action creators
 * @author leon(ludafa@outlook.com)
 */

const {login} = require('../common/dao/user');
const locator = require('../locator');


exports.login = (email, password) => {

    return (dispatch) => {

        dispatch({
            type: 'LOGIN_START',
            payload: {
                email, password
            }
        });

        return login(email, password)
            .then(({token}) => {
                sessionStorage.setItem('jwttoken', token);
                locator.redirect('/web/');
            }, (error) => {
                dispatch({
                    type: 'LOGIN_FAILED',
                    payload: error,
                    error: true
                });
            });

    };

};
