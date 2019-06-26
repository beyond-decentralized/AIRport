"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/3/2019.
 */
function transact() {
    return di_1.DI.get(ground_control_1.TRANS_CONNECTOR).then(transConnector => transConnector.transact());
}
exports.transact = transact;
function commit() {
    return di_1.DI.get(ground_control_1.TRANS_CONNECTOR).then(transConnector => transConnector.commit());
}
exports.commit = commit;
function rollback() {
    return di_1.DI.get(ground_control_1.TRANS_CONNECTOR).then(transConnector => transConnector.rollback());
}
exports.rollback = rollback;
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
function transactional(callback, keepAlive) {
    let transactionStarted = false;
    let transactionalConnector;
    let result;
    return di_1.DI.get(ground_control_1.TRANS_CONNECTOR).then(transConnector => {
        transactionalConnector = transConnector;
        return transConnector.transact();
    }).then(_ => {
        transactionStarted = true;
        return callback();
    }).then(returnValue => {
        result = returnValue;
        return transactionalConnector.commit();
    }).then(_ => result)
        .catch(e => {
        if (transactionStarted) {
            return;
        }
        return transactionalConnector.rollback()
            .then()
            .catch(_ => {
            // do nothing - no need to report the rollback error, since it was the
            // error that causes a rollback
        }).then(_ => {
            throw e;
        });
    });
}
exports.transactional = transactional;
//# sourceMappingURL=transactional.js.map