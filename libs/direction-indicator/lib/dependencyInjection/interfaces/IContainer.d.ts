import { IDependencyInjectionToken } from "../Token";
export interface IContainer {
    set<I>(token: IDependencyInjectionToken<I>, clazz: new () => I): void;
}
//# sourceMappingURL=IContainer.d.ts.map