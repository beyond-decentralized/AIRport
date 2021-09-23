export interface IContext {
    startedAt?: Date;
    [propertyName: string]: any;
}
export interface IInjectionContext extends IContext {
    inAIRportApp?: boolean;
    name: string;
    type: ContextType;
}
export declare enum ContextType {
    DB = 0,
    UI = 1
}
export declare class Context implements IInjectionContext {
    name: string;
    type: ContextType;
    constructor(name: string, type: ContextType);
}
//# sourceMappingURL=Context.d.ts.map