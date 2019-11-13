"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription_1 = require("./Subscription");
class Observable {
    constructor(onUnsubscribe) {
        this.onUnsubscribe = onUnsubscribe;
        this.operators = [];
        this.upstream = [];
        this.downstream = [];
        this.numDownstreamSubscriptions = 0;
        this.subscriptions = [];
    }
    static from(...sourceObservables) {
        // if (!(sourceObservable instanceof Observable)) {
        // 	throw new Error('only @airport/observer/Observable is supported')
        // }
        const targetObservable = new Observable();
        sourceObservables.forEach(aSourceObservable => {
            if (aSourceObservable instanceof Promise) {
                aSourceObservable.then(sourceObservable => {
                    sourceObservable.downstream.push(targetObservable);
                    targetObservable.upstream.push(sourceObservable);
                });
            }
            else {
                aSourceObservable.downstream.push(targetObservable);
                targetObservable.upstream.push(aSourceObservable);
            }
        });
        return targetObservable;
    }
    pipe(...operators) {
        // if (!(sourceObservable instanceof Observable)) {
        // 	throw new Error('only @airport/observer/Observable is supported')
        // }
        const targetObservable = Observable.from(this);
        targetObservable.operators = operators;
        return targetObservable;
    }
    exec(value, callbackName, upstreamObservable) {
        this.clear();
        if (!this.subscriptions.length && !this.numDownstreamSubscriptions || value === undefined) {
            return;
        }
        this.forceExec(value, callbackName, upstreamObservable, true);
    }
    forceExec(value, callbackName, upstreamObservable, cleared) {
        if (!cleared) {
            this.clear();
        }
        // this.lastValue = this.currentValue
        /*
        const theValue    = this.currentValue
        this.currentValue = undefined
        this.valueFromUpstream()

        if (this.currentValue === undefined) {
            this.currentValue = theValue
        }
        */
        if (this.upstream.length) {
            throw new Error('Cannot set value on a derived Observable');
        }
        this.currentValue = value;
        this.subscriptions.forEach(subscription => {
            subscription[callbackName](this.currentValue);
            // if (this.currentValue instanceof Array) {
            // 	(subscription[callbackName] as any)(...this.currentValue)
            // } else {
            // 	subscription[callbackName](this.currentValue)
            // }
        });
        this.downstream.forEach(observable => {
            observable.exec(this.currentValue, callbackName, this);
        });
    }
    // stop(): void {
    //
    // }
    // subscribe(
    // 	observer: IObserver<V>
    // ): ISubscription
    subscribe(onNext, onError, onComplete) {
        // if (!(observer instanceof Function)) {
        // 	throw new Error('Subjects can only be subscribed to with functions')
        // }
        const subscription = new Subscription_1.Subscription(this, onNext, onError, onComplete, this.onUnsubscribe);
        this.subscriptions.push(subscription);
        this.subscribeUpstream();
        onNext(this.valueFromUpstream());
        return subscription;
    }
    unsubscribeUpstream() {
        for (const up of this.upstream) {
            up.numDownstreamSubscriptions--;
            up.unsubscribeUpstream();
        }
    }
    clear() {
        this.currentValue = undefined;
        this.downstream.forEach(observable => observable.clear());
    }
    valueFromUpstream() {
        if (this.currentValue !== undefined) {
            return this.currentValue;
        }
        this.currentValue = this.upstream.map(upstreamObservable => upstreamObservable.valueFromUpstream());
        for (const operator of this.operators) {
            this.currentValue = operator.exec(this);
        }
        return this.currentValue;
    }
    subscribeUpstream() {
        for (const up of this.upstream) {
            up.numDownstreamSubscriptions++;
            up.subscribeUpstream();
        }
    }
}
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map