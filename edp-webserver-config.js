/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, header, redirect, content, empty, autocss, file, less, stylus, proxyNoneExists */


exports.port = 8848;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

const babel = require('babel-core');
const path = require('path');
const nib = require('nib');

exports.stylus = require('stylus');

exports.getLocations = function () {
    return [
        {
            location: function (context) {
                return /^\/(src).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel
                            .transform(context.content, {
                                presets: ['es2015', 'react'],
                                plugins: [
                                    'transform-object-rest-spread',
                                    'transform-class-properties',
                                    'syntax-class-properties',
                                    'syntax-object-rest-spread'
                                ]
                            })
                            .code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                },
                function (context) {
                    context.content = ''
                        + 'define(function (require, exports, module) {\n\n'
                        +     context.content
                        + '\n\n});';
                }
            ]
        },
        {
            location: /\.(ttf|woff|eot|svg)($|\?)/,
            handler: [
                header({
                    'Access-Control-Allow-Origin': '*'
                }),
                file()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    'use': nib(),
                    'resolve url': true,
                    'paths': [path.join(__dirname, 'dep')]
                })
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
