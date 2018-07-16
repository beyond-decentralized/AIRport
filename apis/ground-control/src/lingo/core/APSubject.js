import { Subject, Subscription } from 'rxjs';
export class APSubject extends Subject {
    constructor(onFinalUnsubscribeCallback) {
        super();
        this.onFinalUnsubscribeCallback = onFinalUnsubscribeCallback;
        this.numSubscriptions = 0;
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
export class APSubscription extends Subscription {
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
//# sourceMappingURL=APSubject.js.map