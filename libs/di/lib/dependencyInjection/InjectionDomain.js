import { InjectionApplication } from './InjectionApplication';
export class InjectionDomain {
    constructor(name) {
        this.name = name;
        this.applicationMap = {};
        this.applicationMapBySignature = {};
    }
    app(libraryName) {
        if (this.applicationMap[libraryName]) {
            throw new Error(`
			Application already defined.
			Domain:      ${this.name}
			Application: ${libraryName}
			`);
        }
        const library = new InjectionApplication(libraryName, this);
        this.applicationMap[libraryName] = library;
        return library;
    }
    getApp(libraryName) {
        return this.applicationMap[libraryName];
    }
    getAppBySignature(signature) {
        return this.applicationMapBySignature[signature];
    }
    mapApplicationBySignature(libraryName, signature) {
        const library = this.applicationMap[libraryName];
        if (!library) {
            throw new Error(`Could not find library: '${libraryName}', in domain: '${this.name}'`);
        }
        if (this.applicationMapBySignature[signature]) {
            throw new Error(`System '${this.name}' already has a library '${libraryName}'
			for signature: ${signature}`);
        }
        this.applicationMapBySignature[signature] = library;
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