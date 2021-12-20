import { InjectionApplication } from './InjectionApplication';
export class InjectionDomain {
    constructor(name) {
        this.name = name;
        this.applicationMap = {};
        this.applicationMapBySignature = {};
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
    getAppBySignature(signature) {
        return this.applicationMapBySignature[signature];
    }
    mapApplicationBySignature(applicationName, signature) {
        const application = this.applicationMap[applicationName];
        if (!application) {
            throw new Error(`Could not find Application: '${applicationName}', in domain: '${this.name}'`);
        }
        if (this.applicationMapBySignature[signature]) {
            throw new Error(`Domain '${this.name}' already has an Application '${applicationName}'
			for signature: ${signature}`);
        }
        this.applicationMapBySignature[signature] = application;
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