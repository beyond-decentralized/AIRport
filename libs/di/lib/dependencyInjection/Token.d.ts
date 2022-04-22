import { IInjectionApplication } from './InjectionApplication';
export declare type IDiTokenName = string;
export interface ITokenDependencyConfiguration {
    [propertyName: string]: IDependencyInjectionToken<any>;
}
export interface IDependencyInjectionTokenDescriptor {
    class: any;
    interface: string;
    token: string;
    isApi?: boolean;
}
export interface IDependencyInjectionToken<Injectable> {
    application: IInjectionApplication;
    dependencyConfiguration: ITokenDependencyConfiguration;
    descriptor: IDependencyInjectionTokenDescriptor;
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
}
export declare class DependencyInjectionToken<Injectable> implements IDependencyInjectionToken<Injectable> {
    application: IInjectionApplication;
    descriptor: IDependencyInjectionTokenDescriptor;
    dependencyConfiguration: ITokenDependencyConfiguration;
    constructor(application: IInjectionApplication, descriptor: IDependencyInjectionTokenDescriptor);
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map