import { IDependencyInjectionToken } from './Token';
import { IContainer } from './interfaces/IContainer';
export declare class Container implements IContainer {
    set<I>(token: IDependencyInjectionToken<I>, aClass: new () => I): void;
}
//# sourceMappingURL=Container.d.ts.map