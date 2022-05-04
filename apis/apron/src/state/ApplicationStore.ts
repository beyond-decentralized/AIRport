import { Injected } from "@airport/direction-indicator";
import { IApplicationState } from "./ApplicationState";
import { applicationState } from "./theApplicationState";

export interface IApplicationStore {

    state: IApplicationState
}

@Injected()
export class ApplicationStore
    implements IApplicationStore {

    get state(): IApplicationState {
        return applicationState
    }

}