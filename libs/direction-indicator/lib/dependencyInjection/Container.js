import { domain } from './InjectionDomain';
import { lib } from './InjectionApplication';
import { RootContainer } from './RootContainer';
import { InversionOfControl } from './InversionOfControl';
export class Container {
    set(token, aClass) {
        token.descriptor.class = aClass;
    }
}
export const DEPENDENCY_INJECTION = new RootContainer();
if (typeof window !== 'undefined') {
    window.DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
    window.lib = lib;
    window.domain = domain;
}
export const IOC = new InversionOfControl();
//# sourceMappingURL=Container.js.map