export interface IContext {
    name: string;
    type: ContextType;
}
export declare enum ContextType {
    DB = 0,
    UI = 1
}
export declare class Context implements IContext {
    name: string;
    type: ContextType;
    constructor(name: string, type: ContextType);
}
