"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * TODO: add Zone.js thread local context
 */
class Airport {
    static startTransaction() {
        return ++Airport.nextGlobalTransactionId;
    }
    static commitTransaction(globalTransactionId) {
        throw `Implement!`;
    }
    static rollbackTransaction(globalTransactionId) {
        throw `Implement!`;
    }
}
Airport.nextGlobalTransactionId = 0;
exports.Airport = Airport;
//# sourceMappingURL=Airport.js.map