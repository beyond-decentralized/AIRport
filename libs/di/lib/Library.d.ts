import { ISystem } from './System';
import { GenericDependencyInjectionError, IDiToken } from './Token';
export interface ILibrary {
    name: string;
    system: ISystem;
    tokens: IDiToken<any>[];
    token<T = GenericDependencyInjectionError>(): IDiToken<T>;
}
export declare class Library implements ILibrary {
    name: string;
    system: ISystem;
    tokens: IDiToken<any>[];
    constructor(name: string, system: ISystem);
    token<T = GenericDependencyInjectionError>(): IDiToken<T>;
}
//# sourceMappingURL=Library.d.ts.map