import { AIRPORT_DOMAIN } from './InjectionDomain';
import { DependencyInjectionToken } from './Token';
export class InjectionApplication {
    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
        this.tokenMap = new Map();
        this.autopilot = false;
    }
    getFullName() {
        return `${this.domain.name}/${this.name}`;
    }
    token(descriptor) {
        const existingToken = this.tokenMap.get(descriptor.interface);
        if (existingToken) {
            throw new Error(`Token with name '${descriptor.interface}' has already been created`);
        }
        const diToken = new DependencyInjectionToken(this, descriptor);
        this.tokenMap.set(descriptor.interface, diToken);
        return diToken;
    }
}
export function lib(libraryName) {
    return AIRPORT_DOMAIN.app(libraryName);
}
//# sourceMappingURL=InjectionApplication.js.map