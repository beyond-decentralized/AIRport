import { QApp } from "@airport/aviation-communication";
import { Injected } from "@airport/direction-indicator";
import { DbApplication } from "@airport/ground-control";
import { IFunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "../definition/IAirportDatabase";
import { IDatabaseState } from "../definition/IDatabaseState";
import { databaseState as theDatabaseState } from "./databaseState";

@Injected()
export class DatabaseStore
    implements IDatabaseState {

    databaseState = theDatabaseState

    get applications(): DbApplication[] {
        return this.databaseState.applications
    }
    get entityMap(): Map<any, IEntityRecord> {
        return this.databaseState.entityMap
    }
    get functions(): IFunctionsAndOperators {
        return this.databaseState.functions
    }
    get qApplications(): QApp[] {
        return this.databaseState.qApplications
    }
    get QM(): { [name: string]: QApp } {
        return this.databaseState.QM
    }

}