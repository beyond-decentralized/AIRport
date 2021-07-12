import { ILibrary } from './dependencyInjection/Library';
export interface ISystem {
    libraryMap: {
        [libraryName: string]: ILibrary;
    };
    name: string;
    lib(libraryName: string): ILibrary;
}
export declare class System implements ISystem {
    name: string;
    libraryMap: {
        [libraryName: string]: ILibrary;
    };
    constructor(name: string);
    lib(libraryName: string): ILibrary;
}
export declare function system(systemName: any): ISystem;
//# sourceMappingURL=System.d.ts.map