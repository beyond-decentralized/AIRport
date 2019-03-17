"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("./Observable");
class Subject extends Observable_1.Observable {
    // complete(): void {
    // }
    error(errorValue) {
        this.exec(errorValue, 'onError');
    }
    next(value) {
        this.exec(value, 'onNext');
    }
}
exports.Subject = Subject;
//# sourceMappingURL=Subject.js.map