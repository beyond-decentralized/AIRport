export var ContextType;
(function (ContextType) {
    ContextType[ContextType["DB"] = 0] = "DB";
    ContextType[ContextType["UI"] = 1] = "UI";
})(ContextType || (ContextType = {}));
export class InjectionContext {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
//# sourceMappingURL=InjectionContext.js.map