/**
 * @file 是否正在执行一个异步操作的 reducer
 * @author leon(ludafa@outlook.com)
 */

const ReducerBuilder = require('./ReducerBuilder');

function bindActions(builder, types, reducer) {

    return types.reduce(
        (builder, type) => {
            return builder.add(type, reducer);
        },
        builder
    );

}

function isActing() {
    return true;
}

function notActing() {
    return false;
}

module.exports = (startActions, endActions) => {

    const builder = new ReducerBuilder();

    bindActions(builder, startActions, isActing);
    bindActions(builder, endActions, notActing);

    return builder.toReducer();

};
