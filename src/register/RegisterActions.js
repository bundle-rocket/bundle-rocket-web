/**
 * @file register action creators
 * @author leon(ludafa@outlook.com)
 */

const userDAO = require('../common/dao/user');
const Alert = require('../common/component/Alert');
const locator = require('../locator');

exports.register = function (user) {

    return (dispatch) => {

        dispatch({
            type: 'REGISTER_START',
            payload: user
        });

        return userDAO
            .register(user)
            .then((user) => {
                return Alert.show('恭喜您，已成功注册');
            })
            .then(() => {
                locator.redirect('/web/login');
            })
            .catch((error) => {
                Alert.show(error.message);
            });

    };

};
