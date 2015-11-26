/**
 * @file 登录页面
 * @author leon(ludafa@outlook.com)
 */

const {Page} = require('ei');
const isAsyncActing = require('../common/reducer/isAsyncActing');
const ReducerBuilder = require('../common/reducer/ReducerBuilder');

const RegisterPage = Page.extend({

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

                const next = {
                    ...state,
                    ...payload
                };

                const {password, repassword} = next;

                return {
                    ...next,
                    confirmPasswordError: password && repassword && password !== repassword
                        ? '两次输入的密码不一致，请新输入'
                        : null
                };

            })
            .toReducer()


    },

    view: require('./RegisterView')

});

module.exports = RegisterPage;
