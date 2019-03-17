"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subscription {
    constructor(observable, onNext, onError, onComplete) {
        this.observable = observable;
        this.onNext = onNext;
        this.onError = onError;
        this.onComplete = onComplete;
        this._closed = false;
    }
    // Cancels the subscription
    unsubscribe(onUnsubscribe) {
        if (this._closed) {
            return;
        }
        this._closed = true;
        this.observable.subscriptions = this.observable.subscriptions.filter(subscription => subscription !== this);
        onUnsubscribe();
    }
    // A boolean value indicating whether the subscription is closed
    get closed() {
        return this._closed;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map