"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/3/2019.
 */
async function transact() {
    const transConnector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
    await transConnector.transact();
}
exports.transact = transact;
async function commit() {
    const transConnector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
    await transConnector.commit();
}
exports.commit = commit;
async function rollback() {
    const transConnector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
    await transConnector.rollback();
}
exports.rollback = rollback;
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
async function transactional(callback, keepAlive) {
    const transConnector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
    let transactionStarted = false;
    try {
        await transConnector.transact();
        transactionStarted = true;
        const returnValue = await callback();
        await transConnector.commit();
        return returnValue;
    }
    catch (e) {
        try {
            if (transactionStarted) {
                await transConnector.rollback();
            }
        }
        catch (e) {
            // do nothing - no need to report the rollback error, since it was the
            // error that causes a rollback
        }
        finally {
            throw e;
        }
    }
}
exports.transactional = transactional;
//# sourceMappingURL=transactional.js.map