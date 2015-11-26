/**
 * @file 登录页面
 * @author leon(ludafa@outlook.com)
 */

const {Page} = require('ei');
const isAsyncActing = require('../common/reducer/isAsyncActing');
const ReducerBuilder = require('../common/reducer/ReducerBuilder');

const LoginPage = Page.extend({

    middlewares: [
        require('../common/middleware/logger')
    ],

    reducer: {

        isSubmitting: isAsyncActing(
            ['LOGIN_START'],
            ['INIT', 'LOGIN_FAILED']
        ),

        form: new ReducerBuilder()
            .add('INIT', {})
            .add('INPUT_CHANGE', (state, payload) => {

                return {
                    ...state,
                    ...payload
                };

            })
            .toReducer(),

        authenticateError: new ReducerBuilder()
            .add(['INIT', 'INPUT_CHANGE'], '')
            .add('LOGIN_FAILED', (state, payload) => {
                return payload.status === 401
                    ? '邮箱或密码不正确'
                    : payload.message;
            })
            .toReducer()

    },

    view: require('./LoginView')

});

module.exports = LoginPage;
