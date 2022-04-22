import { IInjectionDomain } from './InjectionDomain';
import { GenericDependencyInjectionError, IDependencyInjectionToken, IDependencyInjectionTokenDescriptor } from './Token';
export interface IInjectionApplication {
    autopilot: boolean;
    name: string;
    domain: IInjectionDomain;
    tokenMap: Map<string, IDependencyInjectionToken<any>>;
    token<T = GenericDependencyInjectionError>(descriptor: IDependencyInjectionTokenDescriptor, autopilot?: boolean): IDependencyInjectionToken<T>;
}
export declare class InjectionApplication implements IInjectionApplication {
    name: string;
    domain: IInjectionDomain;
    tokenMap: Map<string, IDependencyInjectionToken<any>>;
    autopilot: boolean;
    constructor(name: string, domain: IInjectionDomain);
    token<T = GenericDependencyInjectionError>(descriptor: IDependencyInjectionTokenDescriptor): IDependencyInjectionToken<T>;
}
export declare function lib(libraryName: string): IInjectionApplication;
//# sourceMappingURL=InjectionApplication.d.ts.map