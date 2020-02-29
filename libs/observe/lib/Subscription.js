export class Subscription {
    constructor(observable, onNext, onError, onComplete, onUnsubscribe) {
        this.observable = observable;
        this.onNext = onNext;
        this.onError = onError;
        this.onComplete = onComplete;
        this.onUnsubscribe = onUnsubscribe;
        this._closed = false;
    }
    // Cancels the subscription
    unsubscribe(onUnsubscribe) {
        if (this._closed) {
            return;
        }
        this._closed = true;
        this.observable.subscriptions = this.observable.subscriptions.filter(subscription => subscription !== this);
        this.observable.unsubscribeUpstream();
        onUnsubscribe && onUnsubscribe();
    }
    // A boolean value indicating whether the subscription is closed
    get closed() {
        return this._closed;
    }
}
//# sourceMappingURL=Subscription.js.map