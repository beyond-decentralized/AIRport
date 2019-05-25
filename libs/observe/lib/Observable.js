"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription_1 = require("./Subscription");
class Observable {
    constructor(onUnsubscribe) {
        this.onUnsubscribe = onUnsubscribe;
        this.upstream = [];
        this.downstream = [];
        this.numDownstreamSubscriptions = 0;
        this.subscriptions = [];
    }
    static from(...sourceObservables) {
        // if (!(sourceObservable instanceof Observable)) {
        // 	throw 'only @airport/observer/Observable is supported'
        // }
        const targetObservable = new Observable();
        sourceObservables.forEach(aSourceObservable => {
            aSourceObservable.downstream.push(targetObservable);
        });
        targetObservable.upstream = sourceObservables;
        return targetObservable;
    }
    exec(value, callbackName, upstreamObservable, context = this.getDefaultContext()) {
        if (!this.subscriptions.length
            && !this.numDownstreamSubscriptions
            || value === undefined) {
            return;
        }
        // this.lastValue = this.currentValue
        if (this.callback) {
            const value = this.currentValue;
            this.currentValue = undefined;
            this.currentValue = this.valueFromUpstream();
            if (this.currentValue === undefined) {
                this.currentValue = value;
            }
        }
        else {
            this.currentValue = value;
        }
        this.subscriptions.forEach(subscription => {
            subscription[callbackName](this.currentValue);
            // if (this.currentValue instanceof Array) {
            // 	(subscription[callbackName] as any)(...this.currentValue)
            // } else {
            // 	subscription[callbackName](this.currentValue)
            // }
        });
        this.downstream.forEach(observable => {
            context.currentValue = this.currentValue;
            // context.lastValue    = this.lastValue
            context.observable = observable;
            // if (observable.exec) {
            observable.exec(this.currentValue, callbackName, this, context);
            // }
        });
    }
    // subscribe(
    // 	observer: IObserver<V>
    // ): ISubscription
    subscribe(onNext, onError, onComplete) {
        // if (!(observer instanceof Function)) {
        // 	throw 'Subjects can only be subscribed to with functions'
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
    valueFromUpstream() {
        if (this.currentValue !== undefined) {
            return this.currentValue;
        }
        const values = this.upstream.map(upstreamObservable => upstreamObservable.valueFromUpstream());
        switch (values.length) {
            case 0:
                break;
            case 1: {
                if (this.callback) {
                    this.currentValue = this.callback(...[...values, this.getDefaultContext()]);
                }
                else {
                    this.currentValue = values;
                }
                break;
            }
            default: {
                if (this.callback) {
                    this.currentValue = this.callback(values, this.getDefaultContext());
                }
                else {
                    this.currentValue = values;
                }
                break;
            }
        }
        return this.currentValue;
    }
    getDefaultContext() {
        return {
            $: this
        };
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