/**
 * @file Fetch Error
 * @author leon(ludafa@outlook.com)
 */

class FetchError extends Error {

    constructor(status, message) {
        super(message);
        this.status = status;
    }

}

module.exports = FetchError;
