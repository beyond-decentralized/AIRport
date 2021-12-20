import { AIRPORT_DOMAIN } from './InjectionDomain';
import { DiToken } from './Token';
export class InjectionApplication {
    constructor(name, domain) {
        this.name = name;
        this.domain = domain;
        this.tokenMap = new Map();
        this.autopilot = false;
    }
    token(name) {
        const existingToken = this.tokenMap.get(name);
        if (existingToken) {
            throw new Error(`Token with name '${name}' has already been created`);
        }
        const diToken = new DiToken(this, name);
        this.tokenMap.set(name, diToken);
        return diToken;
    }
}
export function lib(libraryName) {
    return AIRPORT_DOMAIN.app(libraryName);
}
//# sourceMappingURL=InjectionApplication.js.map