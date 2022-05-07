import { IApplicationState } from "./ApplicationState";
export interface IApplicationStore {
    state: IApplicationState;
}
export declare class ApplicationStore implements IApplicationStore {
    applicationState: IApplicationState;
    get state(): IApplicationState;
}
//# sourceMappingURL=ApplicationStore.d.ts.map