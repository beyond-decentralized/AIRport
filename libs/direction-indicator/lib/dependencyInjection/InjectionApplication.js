import { AIRPORT_DOMAIN } from './InjectionDomain';
import { DependencyInjectionToken } from './Token';
export class InjectionApplication {
    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
        this.tokenMap = new Map();
        this.autopilot = false;
    }
    token(descriptor) {
        const existingToken = this.tokenMap.get(descriptor.token);
        if (existingToken) {
            throw new Error(`Token with name '${name}' has already been created`);
        }
        const diToken = new DependencyInjectionToken(this, descriptor);
        this.tokenMap.set(descriptor.token, diToken);
        return diToken;
    }
}
export function lib(libraryName) {
    return AIRPORT_DOMAIN.app(libraryName);
}
//# sourceMappingURL=InjectionApplication.js.map