import { IInjectionApplication } from './InjectionApplication';
export declare type IDiTokenName = string;
export interface ITokenDependencyConfiguration {
    [propertyName: string]: IDiToken<any>;
}
export interface IDiToken<Injectable> {
    application: IInjectionApplication;
    dependencyConfiguration: ITokenDependencyConfiguration;
    name: string;
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    application: IInjectionApplication;
    name: string;
    dependencyConfiguration: ITokenDependencyConfiguration;
    constructor(application: IInjectionApplication, name: string);
    getPath(): string;
    setDependencies(dependencyConfiguration: ITokenDependencyConfiguration): void;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map