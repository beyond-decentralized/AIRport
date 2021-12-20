import { IInjectionApplication } from './InjectionApplication';
export interface IInjectionDomain {
    name: string;
    app(applicationName: string): IInjectionApplication;
    getApp(applicationName: string): IInjectionApplication;
    getAppBySignature(signature: string): IInjectionApplication;
    mapApplicationBySignature(applicationName: string, signature: string): void;
}
export declare class InjectionDomain implements IInjectionDomain {
    name: string;
    private applicationMap;
    private applicationMapBySignature;
    constructor(name: string);
    app(applicationName: string): IInjectionApplication;
    getApp(applicationName: string): IInjectionApplication;
    getAppBySignature(signature: string): IInjectionApplication;
    mapApplicationBySignature(applicationName: string, signature: string): void;
}
export declare function domain(domainName: string): IInjectionDomain;
export declare const AIRPORT_DOMAIN: IInjectionDomain;
//# sourceMappingURL=InjectionDomain.d.ts.map