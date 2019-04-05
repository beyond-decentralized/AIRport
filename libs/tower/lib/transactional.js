"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 4/3/2019.
 */
/**
 * One transaction execution to one at a time, so a way to track existing
 * transactional context is required.  Zone.js can be used as a thread local context for
 * that.
 */
async function transactional(callback, keepAlive) {
    const [storeDriver] = await di_1.DI.getP(ground_control_1.STORE_DRIVER);
    let transactionStarted = false;
    try {
        await storeDriver.transact(keepAlive);
        transactionStarted = true;
        const returnValue = await callback();
        await storeDriver.commit();
        return returnValue;
    }
    catch (e) {
        if (transactionStarted) {
            await storeDriver.rollback();
        }
        throw e;
    }
}
exports.transactional = transactional;
//# sourceMappingURL=transactional.js.map