"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContextType;
(function (ContextType) {
    ContextType[ContextType["DB"] = 0] = "DB";
    ContextType[ContextType["UI"] = 1] = "UI";
})(ContextType = exports.ContextType || (exports.ContextType = {}));
class Context {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
exports.Context = Context;
//# sourceMappingURL=Context.js.map