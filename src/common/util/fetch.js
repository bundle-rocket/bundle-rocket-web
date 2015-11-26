/**
 * @file 通用的 fetch api
 * @author leon(ludafa@outlook.com)
 */

const FetchError = require('./FetchError');
const {addQuery} = require('numen/util');

function normalizeHeaders(headers) {

    if (!headers) {
        return {};
    }

    return Object
        .keys(headers)
        .reduce((result, name) => {

            const normailzedName = name.split('-').reduce(
                (result, term) => {

                    if (term) {
                        result.push(
                            `${term.charAt(0).toUpperCase()}${term.slice(1)}`
                        );
                    }

                    return result;
                },
                []
            ).join('-');

            result[normailzedName] = headers[name];

            return result;

        }, {});

}

class Fetch {

    constructor() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }

    request(url, options) {

        const config = this.requestInterceptors.reduce(
            (config, intercept) => {
                return intercept(config);
            },
            {
                ...options,
                url,
                credentials: 'same-origin'
            }
        );

        let {query, headers, ...rest} = config;

        url = addQuery(config.url, query);
        headers = normalizeHeaders(headers);

        let finalOptions = {...rest, headers};

        return fetch(url, finalOptions)
            .then((response) => {

                const result = response.ok
                    ? response.json()
                    : response.text();

                return result.then((body) => {

                    if (response.ok) {
                        return body;
                    }

                    const {status, statusText} = response;

                    throw new FetchError(status, body || statusText);

                });

            })
            .then((data) => {
                return this.responseInterceptors.reduce(
                    (data, intercept) => {
                        return intercept(data);
                    },
                    data
                );
            }, (error) => {
                throw this.responseInterceptors.reduce(
                    (error, intercept) => {
                        return intercept(error);
                    },
                    error
                );
            });

    }

    get(url, options = {}) {
        return this.request(
            url,
            {
                ...options,
                method: 'GET'
            }
        );
    }

    post(url, options = {}) {
        return this.request(
            url,
            {
                ...options,
                method: 'POST'
            }
        );
    }

    addInterceptor(type, intercept) {

        if (type === 'response') {
            this.responseInterceptors = this.responseInterceptors.concat(intercept);
        }
        else {
            this.requestInterceptors = this.requestInterceptors.concat(intercept);
        }

    }

    removeInterceptor(type, intercept) {

        const filter = (a) => {
            return a !== intercept;
        };

        if (type === 'response') {
            this.responseInterceptors = this.responseInterceptors.filter(filter);
        }
        else {
            this.requestInterceptors = this.requestInterceptors.filter(filter);
        }

    }

}

const defaultFetch = new Fetch();

defaultFetch.createInstance = () => {
    return new Fetch();
};

module.exports = defaultFetch;
