"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class Subject {
    constructor(onFinalUnsubscribeCallback) {
        super();
        this.onFinalUnsubscribeCallback = onFinalUnsubscribeCallback;
        this.subscriptions = 0;
    }
    next(value) {
        const { destination } = this;
        if (destination && destination.next) {
            destination.next(value);
        }
    }
    subscribe(observerOrNext, error, complete) {
        this.numSubscriptions++;
        return super.subscribe(observerOrNext, error, complete);
    }
    isFinalUnsubscribe() {
        this.numSubscriptions--;
        if (!this.numSubscriptions) {
            this.onFinalUnsubscribeCallback();
        }
        return !this.numSubscriptions;
    }
}
exports.Subject = Subject;
class APSubscription extends rxjs_1.Subscription {
    setApSubject(subject) {
        this.subject = subject;
    }
    unsubscribe() {
        super.unsubscribe();
        if (this.subject.isFinalUnsubscribe()) {
            this.subject = null;
        }
    }
}
exports.APSubscription = APSubscription;
//# sourceMappingURL=Subject.js.map