export var ContextType;
(function (ContextType) {
    ContextType[ContextType["DB"] = 0] = "DB";
    ContextType[ContextType["UI"] = 1] = "UI";
})(ContextType || (ContextType = {}));
export class Context {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
//# sourceMappingURL=Context.js.map