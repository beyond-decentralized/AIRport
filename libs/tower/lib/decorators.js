"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Airport_1 = require("./core/Airport");
/**
 * Created by Papa on 4/17/2016.
 */
/**
 * Transactional context talks to a database.  In a multi-database setup the same
 * transactional method might be used to talk to different databases.  The most strait
 * forward way to specify which database to talk to is to pass in an argument to the method
 * that provides the transactional client.  However is very clumbersome from the API point
 * of view.
 *
 * Perhaps another approach is to simply setup a global marker to start a transaction
 * on the next DB operation (if one isn't set already).  And before exit from the method
 * clear that marker.  However the transaction still must be committed or rolled back
 * at the end. So, a callback approach can be taken such that a callback object provides
 * the transaction client on which to commit or rollback a transaction.
 *
 * This limits transaction execution to one at a time, so a way to track existing transactional
 * context is required.  Zone.js can be used as a thread local context for that.
 *
 * @returns {MethodDecorator}
 * @constructor
 */
exports.Transactional = function () {
    return function (target, methodName, methodDescriptor) {
        // save a reference to the original method
        // this way we keep the values currently in the
        // descriptor and don't overwrite what another
        // decorator might have done to the descr iptor.
        let originalMethod = methodDescriptor.value;
        //editing the descriptor/value parameter
        methodDescriptor.value = async function (...args) {
            // TODO: Current database should be controlled by setting TQ.setDb()
            const globalTransactionId = Airport_1.Airport.startTransaction();
            // let transactionIndex; // = client.getCurrentTransactionIndex();
            if (!globalTransactionId) {
                return await originalMethod.apply(this, args);
            }
            // transactionIndex = await client.startTransaction();
            let success = true;
            try {
                // http://blog.wolksoftware.com/decorators-reflection-javascript-typescript
                // note usage of originalMethod here
                let result;
                return await originalMethod.apply(this, args);
            }
            catch (error) {
                success = false;
            }
            finally {
                if (success) {
                    Airport_1.Airport.commitTransaction(globalTransactionId);
                }
                else {
                    Airport_1.Airport.rollbackTransaction(globalTransactionId);
                }
            }
        };
        // return edited descriptor as opposed to overwriting
        // the descriptor by returning a new descriptor
        return methodDescriptor;
    };
};
//# sourceMappingURL=decorators.js.map