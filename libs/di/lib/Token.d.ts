import { ILibrary } from './Library';
export interface IDiToken<Injectable> {
    library: ILibrary;
    sequence: number;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: ILibrary;
    sequence: number;
    constructor(library: ILibrary, sequence: number);
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map