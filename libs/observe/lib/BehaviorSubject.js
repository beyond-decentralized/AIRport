"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("./Subject");
class BehaviorSubject extends Subject_1.Subject {
    constructor(value) {
        super();
        this.currentValue = value;
    }
    next(value) {
        this.currentValue = value;
        this.exec(value, 'onNext');
    }
    clear() {
    }
}
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map