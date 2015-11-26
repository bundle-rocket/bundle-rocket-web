/**
 * @file 通过 history api 来操作 navigator 的 link
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const Link = require('melon/Link');
const cx = require('melon/common/util/cxBuilder').create('Link');

class HistoryLink extends React.Component {

    static displayName = 'Link';

    render() {

        const {children, onClick, href} = this.props;
        const {locator} = this.context;

        return (
            <Link
                href={href}
                onClick={(e) => {

                    if (onClick) {
                        onClick(e);
                    }

                    if (!e.defaultPrevented) {
                        e.preventDefault();
                        locator.redirect(href);
                    }

                }}>
                {children}
            </Link>
        );

    }

}

const {PropTypes} = React;

HistoryLink.propTypes = {
    ...Link.propTypes
};

HistoryLink.contextTypes = {
    locator: PropTypes.object.isRequired
};

module.exports = HistoryLink;
