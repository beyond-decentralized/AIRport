import { ILibrary } from './Library';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    constructor(library: ILibrary, name: string);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map