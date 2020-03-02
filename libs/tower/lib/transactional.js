"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/3/2019.
 */
var transactionInProgress = false;
async function transact() {
    const transConnector = await di_1.DI.db().get(ground_control_1.TRANS_CONNECTOR);
    await transConnector.transact();
    transactionInProgress = true;
}
exports.transact = transact;
async function commit() {
    if (!transactionInProgress) {
        throw new Error('Cannot commit - no transaction in progress');
    }
    try {
        const transConnector = await di_1.DI.db().get(ground_control_1.TRANS_CONNECTOR);
        await transConnector.commit();
    }
    finally {
        transactionInProgress = false;
    }
}
exports.commit = commit;
async function rollback() {
    if (!transactionInProgress) {
        throw new Error('Cannot rollback - no transaction in progress');
    }
    try {
        const transConnector = await di_1.DI.db().get(ground_control_1.TRANS_CONNECTOR);
        await transConnector.rollback();
    }
    finally {
        transactionInProgress = false;
    }
}
exports.rollback = rollback;
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
async function transactional(callback, keepAlive) {
    if (transactionInProgress) {
        await callback();
        return;
    }
    const transConnector = await di_1.DI.db().get(ground_control_1.TRANS_CONNECTOR);
    try {
        await transConnector.transact();
        transactionInProgress = true;
        const returnValue = await callback();
        await transConnector.commit();
        return returnValue;
    }
    catch (e) {
        try {
            if (transactionInProgress) {
                await transConnector.rollback();
            }
        }
        catch (rollbackError) {
            // do nothing - no need to report the rollback error, since it was the
            // error that causes a rollback
        }
        finally {
            throw e;
        }
    }
    finally {
        transactionInProgress = false;
    }
}
exports.transactional = transactional;
//# sourceMappingURL=transactional.js.map