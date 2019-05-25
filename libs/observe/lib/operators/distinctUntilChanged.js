"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distinctUntilChanged(callback, context) {
    const $ = context.$;
    if (!$.upstream || !$.upstream.length) {
        return callback();
    }
    let up$CurVal = $.upstream[0].currentValue;
    if ($.upstream.length > 1) {
        up$CurVal = $.upstream.map(upstream$ => upstream$.currentValue);
    }
    try {
        if (!$.up$LastVal) {
            return callback(up$CurVal);
        }
        if ($.upstream.every((upstream$, index) => upstream$.currentValue === up$CurVal[index])) {
            return $.currentValue;
        }
        return callback(up$CurVal);
    }
    finally {
        $.up$LastVal = up$CurVal;
    }
}
exports.distinctUntilChanged = distinctUntilChanged;
//# sourceMappingURL=distinctUntilChanged.js.map