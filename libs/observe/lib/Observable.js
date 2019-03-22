"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription_1 = require("./Subscription");
class Observable {
    constructor(onUnsubscribe) {
        this.onUnsubscribe = onUnsubscribe;
        this.children = [];
        this.subscriptions = [];
    }
    static from(sourceObservable) {
        // if (!(sourceObservable instanceof Observable)) {
        // 	throw 'only @airport/observer/Observable is supported'
        // }
        const targetObservable = new Observable();
        sourceObservable.children.push(targetObservable);
        return targetObservable;
    }
    exec(value, callbackName, context = {
        combineLatestCounter: -1,
        currentValue: this.currentValue,
        lastValue: this.lastValue,
        observable: this
    }) {
        if (!this.subscriptions.length) {
            return;
        }
        if (value === undefined) {
            return;
        }
        const lastValue = this.currentValue;
        if (this.callback) {
            value = this.callback(value, context);
        }
        else {
            value = value;
        }
        if (value === undefined) {
            return;
        }
        this.lastValue = lastValue;
        this.currentValue = value;
        this.subscriptions.forEach(subscription => {
            subscription[callbackName](value);
        });
        this.children.forEach(observable => {
            context.combineLatestCounter = -1;
            context.currentValue = this.currentValue;
            context.lastValue = this.lastValue;
            context.observable = observable;
            if (observable.exec)
                observable.exec(value, context, callbackName);
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
        if (this.currentValue !== undefined) {
            this.exec(this.currentValue, 'onNext');
        }
        return subscription;
    }
}
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map