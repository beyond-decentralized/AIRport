import { ILibrary } from './Library';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    sequence: number;
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    sequence: number;
    constructor(library: ILibrary, name: string, sequence: number);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map