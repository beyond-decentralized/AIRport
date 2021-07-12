import { ISystem } from './System';
import { GenericDependencyInjectionError, IDiToken } from './Token';
export interface ILibrary {
    name: string;
    system: ISystem;
    tokens: IDiToken<any>[];
    token<T = GenericDependencyInjectionError>(name: string, autopilot?: boolean): IDiToken<T>;
}
export declare class Library implements ILibrary {
    name: string;
    system: ISystem;
    tokens: IDiToken<any>[];
    constructor(name: string, system: ISystem);
    token<T = GenericDependencyInjectionError>(name: string, autopilot?: boolean): IDiToken<T>;
}
export declare const AUTOPILOT = true;
//# sourceMappingURL=Library.d.ts.map