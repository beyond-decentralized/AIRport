import { IInjectionApplication } from './InjectionApplication';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    application: IInjectionApplication;
    name: string;
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    application: IInjectionApplication;
    name: string;
    constructor(application: IInjectionApplication, name: string);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map