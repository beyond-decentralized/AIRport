export interface IContext {
    lastOUID?: number;
    repository?: {
        source: string;
        uuId?: string;
    };
    repositoryExistenceChecked?: boolean;
    startedAt?: Date;
    [propertyName: string]: any;
}
export interface IInjectionContext extends IContext {
    inAIRportApp?: boolean;
    id: string;
    type: ContextType;
}
export declare enum ContextType {
    DB = "DB",
    UI = "UI"
}
export declare class Context implements IInjectionContext {
    id: string;
    type: ContextType;
    constructor(id: string, type: ContextType);
}
//# sourceMappingURL=Context.d.ts.map