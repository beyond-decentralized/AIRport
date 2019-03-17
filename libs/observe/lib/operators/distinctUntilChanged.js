"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distinctUntilChanged(value, context) {
    if (value === context.lastValue) {
        return undefined;
    }
    return value;
}
exports.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map