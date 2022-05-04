export var ContextType;
(function (ContextType) {
    ContextType["DB"] = "DB";
    ContextType["UI"] = "UI";
})(ContextType || (ContextType = {}));
export class Context {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}
//# sourceMappingURL=Context.js.map