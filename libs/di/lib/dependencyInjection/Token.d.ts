import { ILibrary } from './Library';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    autopilot: boolean;
    library: ILibrary;
    name: string;
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    autopilot: boolean;
    constructor(library: ILibrary, name: string, autopilot: boolean);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map