/**
 * @file common/comopnent/Alert
 * @author leon(ludafa@outlook.com)
 */

const {Promise} = require('es6-promise');
const Alert = require('melon/dialog/Alert');
const React = require('react');
const ReactDOM = require('react-dom');

let guid = 0;

exports.show = function alert(message) {

    return new Promise((resolve) => {

        let container = document.createElement('div');

        container.id = ++guid;

        document.body.appendChild(container);

        ReactDOM.render(
            (
                <Alert open={true} onHide={() => {
                    ReactDOM.unmountComponentAtNode(container);
                    document.body.removeChild(container);
                    container = null;
                    resolve();
                }}>
                    {message}
                </Alert>
            ),
            container
        );

    });

};
