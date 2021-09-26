export var ContextType;
(function (ContextType) {
    ContextType["DB"] = "DB";
    ContextType["UI"] = "UI";
})(ContextType || (ContextType = {}));
export class Context {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
//# sourceMappingURL=Context.js.map