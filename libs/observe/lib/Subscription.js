"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subscription {
    constructor(onUnsubscribe) {
        this.onUnsubscribe = onUnsubscribe;
        this._closed = false;
    }
    // Cancels the subscription
    unsubscribe() {
        this.onUnsubscribe();
    }
    // A boolean value indicating whether the subscription is closed
    get closed() {
        return this._closed;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map