import { IInjectionDomain } from './InjectionDomain';
import { GenericDependencyInjectionError, IDiToken } from './Token';
export interface IInjectionApplication {
    autopilot: boolean;
    name: string;
    domain: IInjectionDomain;
    tokenMap: Map<string, IDiToken<any>>;
    token<T = GenericDependencyInjectionError>(name: string, autopilot?: boolean): IDiToken<T>;
}
export declare class InjectionApplication implements IInjectionApplication {
    name: string;
    domain: IInjectionDomain;
    tokenMap: Map<string, IDiToken<any>>;
    autopilot: boolean;
    constructor(name: string, domain: IInjectionDomain);
    token<T = GenericDependencyInjectionError>(name: string): IDiToken<T>;
}
export declare function lib(libraryName: string): IInjectionApplication;
//# sourceMappingURL=InjectionApplication.d.ts.map