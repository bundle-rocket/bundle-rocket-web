/**
 * @file 应用列表
 * @author leon(ludafa@outlook.com)
 */

const {Page} = require('ei');

const appDAO = require('../common/dao/app');

const ListPage = Page.extend({

    view: require('./ListView'),

    reducer() {
        return {};
    },

    getInitialState() {
        return appDAO.list();
    }

});

module.exports = ListPage;
