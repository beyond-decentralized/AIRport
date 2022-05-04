import { IDependencyInjectionToken } from './Token';
import { IContainer } from './interfaces/IContainer';
import { IRootContainer } from './interfaces/IRootContainer';
import { InversionOfControl } from './InversionOfControl';
export declare class Container implements IContainer {
    set<I>(token: IDependencyInjectionToken<I>, aClass: new () => I): void;
}
export declare const DEPENDENCY_INJECTION: IRootContainer;
export declare const IOC: InversionOfControl;
//# sourceMappingURL=Container.d.ts.map