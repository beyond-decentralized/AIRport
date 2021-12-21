import { IInjectionApplication } from './InjectionApplication';
export interface IInjectionDomain {
    name: string;
    app(applicationName: string): IInjectionApplication;
    getApp(applicationName: string): IInjectionApplication;
}
export declare class InjectionDomain implements IInjectionDomain {
    name: string;
    private applicationMap;
    constructor(name: string);
    app(applicationName: string): IInjectionApplication;
    getApp(applicationName: string): IInjectionApplication;
}
export declare function domain(domainName: string): IInjectionDomain;
export declare const AIRPORT_DOMAIN: IInjectionDomain;
//# sourceMappingURL=InjectionDomain.d.ts.map