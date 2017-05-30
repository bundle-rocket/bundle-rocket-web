/**
 * @file 应用列表视图
 * @author leon(ludafa@outlook.com)
 */

const React = require('react');
const ToolBar = require('melon/ToolBar');
const Button = require('melon/Button');
const Icon = require('melon/Icon');
const Title = require('melon/Title');
const Card = require('melon/Card');

class AppListView extends React.Component {

    static displayName = 'AppListView';

    render() {
        return (
            <div className="app-view">
                <ToolBar>
                    <Button size="xl"><Icon icon="menu"/></Button>
                    <Title level={4} className="flex">My Apps</Title>
                    <Button size="xl"><Icon icon="power-settings-new" /></Button>
                </ToolBar>
                <Card>
                    <div className="ui-card-title">
                        应用列表
                    </div>
                    <div className="ui-card-content">
                        list...
                    </div>
                </Card>
                <Button size="xxl" variants={['floating', 'primary']}>
                    <Icon icon="add" />
                </Button>
            </div>
        );
    }

}

module.exports = AppListView;
