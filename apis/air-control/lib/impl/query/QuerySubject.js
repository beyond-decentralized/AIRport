import { Subject } from "rxjs";
export class QuerySubject extends Subject {
    constructor(unsubscribeCallback) {
        super();
        this.unsubscribeCallback = unsubscribeCallback;
    }
    subscribe(observerOrNext, error, complete) {
        let subscription = super.subscribe(observerOrNext, error, complete);
        let resultsSubscription = new ResultsSubscription(subscription, this.unsubscribeCallback);
        return resultsSubscription;
    }
}
export class ResultsSubscription {
    constructor(subscription, onUnsubscribe) {
        this.subscription = subscription;
        this.onUnsubscribe = onUnsubscribe;
    }
    unsubscribe() {
        this.subscription.unsubscribe();
        this.onUnsubscribe();
    }
    get closed() {
        return this.subscription.closed;
    }
    set closed(newClosed) {
        this.subscription.closed = newClosed;
    }
    add(teardown) {
        return this.subscription.add(teardown);
    }
    remove(sub) {
        this.subscription.remove(sub);
    }
}
//# sourceMappingURL=QuerySubject.js.map