import { InjectionApplication } from './InjectionApplication';
export class InjectionDomain {
    constructor(name) {
        this.name = name;
        this.applicationMap = {};
    }
    app(applicationName) {
        if (this.applicationMap[applicationName]) {
            throw new Error(`
			Application already defined.
			Domain:      ${this.name}
			Application: ${applicationName}
			`);
        }
        const application = new InjectionApplication(applicationName, this);
        this.applicationMap[applicationName] = application;
        return application;
    }
    getApp(applicationName) {
        return this.applicationMap[applicationName];
    }
}
const DOMAIN_MAP = {};
export function domain(domainName) {
    if (DOMAIN_MAP[domainName]) {
        return DOMAIN_MAP[domainName];
    }
    const domain = new InjectionDomain(domainName);
    DOMAIN_MAP[domainName] = domain;
    return domain;
}
export const AIRPORT_DOMAIN = domain('turbase.app');
//# sourceMappingURL=InjectionDomain.js.map