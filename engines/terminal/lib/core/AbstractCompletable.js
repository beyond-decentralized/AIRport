"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractCompletable {
    constructor() {
        this.subsriptions = [];
    }
    async tearDown( //
    ) {
        this.subsriptions.forEach(subscription => subscription.unsubscribe());
    }
    record(subscription) {
        this.subsriptions.push(subscription);
    }
}
exports.AbstractCompletable = AbstractCompletable;
//# sourceMappingURL=AbstractCompletable.js.map