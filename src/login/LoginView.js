/**
 * @file Login 页面视图
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const {connect} = require('ei');
const Form = require('melon/Form');
const TextBox = require('melon/TextBox');
const Button = require('melon/Button');
const Link = require('../common/component/HistoryLink');

class LoginView extends React.Component {

    static displayName = 'LoginView';

    render() {

        const {
            isSubmitting,
            authenticateError,
            changeInput,
            form
        } = this.props;

        return (
            <div className="login-view">
                <section className="login-view-content">
                    <div className="login-view-logo" />
                    <div className="login-view-title">
                        Bundle Rocket
                    </div>
                    <Form
                        className="login-view-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const {email, password} = e.data;
                            this.props.login(email, password);
                        }}>
                        <div className="login-view-form-row">
                            <TextBox
                                name="email"
                                floatingLabel="邮箱"
                                variants={['fluid']}
                                value={form.email}
                                rules={{
                                    required: true,
                                    requiredErrorMessage: '请填写您的注册邮箱',
                                    email: true
                                }}
                                validateEvents={['change']}
                                onChange={changeInput.bind(null, 'email')} />
                        </div>
                        <div className="login-view-form-row">
                            <TextBox
                                name="password"
                                type="password"
                                floatingLabel="密码"
                                variants={['fluid']}
                                rules={{
                                    required: true,
                                    requiredErrorMessage: '请填写您的密码'
                                }}
                                customValidity={authenticateError}
                                value={form.password}
                                validateEvents={['change']}
                                onChange={changeInput.bind(null, 'password')} />
                        </div>
                        <footer className="login-view-footer">
                            <Button
                                type="submit"
                                variants={['fluid', 'raised', 'primary']}
                                disabled={isSubmitting}>
                                登录
                            </Button>
                            <Link href='/web/register'>
                                没有账号？立即注册
                            </Link>
                        </footer>
                    </Form>
                </section>
            </div>
        );
    }

}

const {login} = require('./LoginActions');

LoginView = connect(
    LoginView,
    true,
    {
        login,
        changeInput(name, {value}) {
            return {
                type: 'INPUT_CHANGE',
                payload: {
                    [`${name}`]: value
                }
            };
        }
    }
);

module.exports = LoginView;
