"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("./BehaviorSubject");
class Store extends BehaviorSubject_1.BehaviorSubject {
    constructor(value) {
        super(value);
    }
    next(value) {
        this.forceExec(value, 'onNext');
    }
}
exports.Store = Store;
//# sourceMappingURL=Store.js.map