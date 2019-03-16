"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Subject {
    constructor(unsubscribeCallback) {
        this.unsubscribeCallback = unsubscribeCallback;
    }
    complete() {
    }
    error(errorValue) {
    }
    next(value) {
    }
    start(subscription) {
    }
    subscribe(observer, onError, onComplete) {
        if (!(observer instanceof Function)) {
            throw 'Subjects can only be subscribed to with functions';
        }
        return undefined;
    }
}
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map