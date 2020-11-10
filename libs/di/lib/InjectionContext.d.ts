export interface IContext {
    [propertyName: string]: any;
}
export interface IInjectionContext {
    name: string;
    type: ContextType;
}
export declare enum ContextType {
    DB = 0,
    UI = 1
}
export declare class InjectionContext implements IInjectionContext {
    name: string;
    type: ContextType;
    constructor(name: string, type: ContextType);
}
//# sourceMappingURL=InjectionContext.d.ts.map