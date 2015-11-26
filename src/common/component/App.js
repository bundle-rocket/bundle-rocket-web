/**
 * @file app
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const ei = require('ei');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.app = new ei.App({
            routes: this.props.routes
        });
    }

    getChildContext() {
        return {
            app: this.app,
            locator: this.props.locator
        };
    }

    render() {
        return (
            <div className="ui-app">{this.props.children}</div>
        );
    }

}

let {PropTypes} = React;

App.propTypes = {
    routes: PropTypes.array.isRequired,
    locator: PropTypes.object.isRequired
};

App.childContextTypes = {
    app: PropTypes.object.isRequired,
    locator: PropTypes.object.isRequired
};

module.exports = App;
