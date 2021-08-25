import { ILibrary } from './Library';
export interface ISystem {
    name: string;
    lib(libraryName: string): ILibrary;
    getLib(libraryName: string): ILibrary;
    getLibBySignature(signature: string): ILibrary;
    mapLibraryBySignature(libraryName: string, signature: string): void;
}
export declare class System implements ISystem {
    name: string;
    private libraryMap;
    private libraryMapBySignature;
    constructor(name: string);
    lib(libraryName: string): ILibrary;
    getLib(libraryName: string): ILibrary;
    getLibBySignature(signature: string): ILibrary;
    mapLibraryBySignature(libraryName: string, signature: string): void;
}
export declare function system(systemName: any): ISystem;
export declare const SYSTEM: ISystem;
//# sourceMappingURL=System.d.ts.map