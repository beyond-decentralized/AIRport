import { IInjectionApplication } from './InjectionApplication';
export declare type IDependencyInjectionTokenName = string;
export interface ITokenDependencyConfiguration {
    [propertyName: string]: IDependencyInjectionToken<any>;
}
export interface IDependencyInjectionTokenDescriptor {
    class: any;
    interface: string;
    token: string;
    isApi?: boolean;
}
export interface IDependencyInjectionToken<Injected> {
    application: IInjectionApplication;
    dependencyConfiguration: ITokenDependencyConfiguration;
    descriptor: IDependencyInjectionTokenDescriptor;
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
    setClass(aClass: any): void;
}
export declare class DependencyInjectionToken<Injected> implements IDependencyInjectionToken<Injected> {
    application: IInjectionApplication;
    descriptor: IDependencyInjectionTokenDescriptor;
    private _dependencyConfiguration;
    get dependencyConfiguration(): ITokenDependencyConfiguration;
    constructor(application: IInjectionApplication, descriptor: IDependencyInjectionTokenDescriptor);
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
    setClass(aClass: any): void;
    private getInheritedDependencyConfiguration;
}
export interface GenericDependencyInjectionError {
    DependencyInjectionTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map