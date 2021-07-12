import { ILibrary } from '../Library';
export declare type IDiTokenName = string;
export interface IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    sequence: number;
    autopilot: boolean | {
        [methodName: string]: boolean;
    };
    getPath(): string;
}
export declare class DiToken<Injectable> implements IDiToken<Injectable> {
    library: ILibrary;
    name: string;
    sequence: number;
    autopilot: boolean;
    constructor(library: ILibrary, name: string, sequence: number, autopilot?: boolean);
    getPath(): string;
}
export interface GenericDependencyInjectionError {
    DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void;
}
//# sourceMappingURL=Token.d.ts.map