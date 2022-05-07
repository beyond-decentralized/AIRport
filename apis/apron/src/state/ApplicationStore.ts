import { Injected } from "@airport/direction-indicator";
import { IApplicationState } from "./ApplicationState";
import { applicationState as theApplicationState } from "./theApplicationState";

export interface IApplicationStore {

    state: IApplicationState
}

@Injected()
export class ApplicationStore
    implements IApplicationStore {

    applicationState = theApplicationState

    get state(): IApplicationState {
        return this.applicationState
    }

}