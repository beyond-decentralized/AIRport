import { IInjectionApplication } from './InjectionApplication';
export interface IInjectionDomain {
    name: string;
    app(libraryName: string): IInjectionApplication;
    getApp(libraryName: string): IInjectionApplication;
    getAppBySignature(signature: string): IInjectionApplication;
    mapApplicationBySignature(libraryName: string, signature: string): void;
}
export declare class InjectionDomain implements IInjectionDomain {
    name: string;
    private applicationMap;
    private applicationMapBySignature;
    constructor(name: string);
    app(libraryName: string): IInjectionApplication;
    getApp(libraryName: string): IInjectionApplication;
    getAppBySignature(signature: string): IInjectionApplication;
    mapApplicationBySignature(libraryName: string, signature: string): void;
}
export declare function domain(domainName: string): IInjectionDomain;
export declare const AIRPORT_DOMAIN: IInjectionDomain;
//# sourceMappingURL=InjectionDomain.d.ts.map