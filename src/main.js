/**
 * @file bundle rocket web main 模块
 * @author leon(ludafa@outlook.com)
 */

require('./common/util/interceptors');

const locator = require('./locator');
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./common/component/App');
const Page = require('./common/component/Page');
const routes = require('./routes');

exports.init = () => {

    const main = document.getElementById('main');

    locator
        .on((location) => {

            ReactDOM.render(
                <App routes={routes} locator={locator} >
                    <Page request={location} />
                </App>,
                main
            );

        })
        .start();

};
