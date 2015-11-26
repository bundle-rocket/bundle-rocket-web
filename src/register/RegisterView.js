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

class RegisterView extends React.Component {

    static displayName = 'RegisterView';

    render() {

        const {
            isSubmitting,
            changeInput,
            form
        } = this.props;

        const {
            confirmPasswordError
        } = form;

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
                            const {name, email, password} = e.data;
                            this.props.register({
                                name,
                                email,
                                password
                            });
                        }}>
                        <div className="login-view-form-row">
                            <TextBox
                                name="name"
                                floatingLabel="昵称"
                                variants={['fluid']}
                                value={form.name}
                                rules={{
                                    required: true,
                                    requiredErrorMessage: '请填写您的昵称'
                                }}
                                validateEvents={['change']}
                                onChange={changeInput.bind(null, 'name')} />
                        </div>
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
                                value={form.password}
                                validateEvents={['change']}
                                onChange={changeInput.bind(null, 'password')} />
                        </div>
                        <div className="login-view-form-row">
                            <TextBox
                                name="repassword"
                                type="password"
                                floatingLabel="确认密码"
                                variants={['fluid']}
                                rules={{
                                    required: true,
                                    requiredErrorMessage: '请填写您的密码'
                                }}
                                customValidity={confirmPasswordError}
                                value={form.repassword}
                                validateEvents={['change']}
                                onChange={changeInput.bind(null, 'repassword')} />
                        </div>
                        <footer className="login-view-footer">
                            <Button
                                type="submit"
                                variants={['fluid', 'raised', 'primary']}
                                disabled={isSubmitting}>
                                注册
                            </Button>
                            <Link href='/web/login'>
                                已有账号，去登录
                            </Link>
                        </footer>
                    </Form>
                </section>
            </div>
        );
    }

}

const {register} = require('./RegisterActions');

RegisterView = connect(
    RegisterView,
    true,
    {
        register,
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

module.exports = RegisterView;
