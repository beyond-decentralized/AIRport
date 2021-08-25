import { ISystem } from './System';
import { GenericDependencyInjectionError, IDiToken } from './Token';
export interface ILibrary {
    uniqueHash: string;
    name: string;
    system: ISystem;
    tokenMap: Map<string, IDiToken<any>>;
    token<T = GenericDependencyInjectionError>(name: string, autopilot?: boolean): IDiToken<T>;
}
export declare class Library implements ILibrary {
    name: string;
    system: ISystem;
    uniqueHash: string;
    tokenMap: Map<string, IDiToken<any>>;
    constructor(name: string, system: ISystem);
    hash(uniqueHash: string): ILibrary;
    token<T = GenericDependencyInjectionError>(name: string, autopilot?: boolean): IDiToken<T>;
}
export declare const AUTOPILOT = true;
//# sourceMappingURL=Library.d.ts.map