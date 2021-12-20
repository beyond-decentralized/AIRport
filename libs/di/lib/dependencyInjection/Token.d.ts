import { IInjectionApplication } from './InjectionApplication';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    library: IInjectionApplication;
    name: string;
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: IInjectionApplication;
    name: string;
    constructor(library: IInjectionApplication, name: string);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map