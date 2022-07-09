import { QApplication } from "@airport/aviation-communication";
import { Injected } from "@airport/direction-indicator";
import { DbApplication } from "@airport/ground-control";
import { FunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "../definition/AirportDatabase";
import { IDatabaseState } from "../definition/DatabaseState";
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
    get functions(): FunctionsAndOperators {
        return this.databaseState.functions
    }
    get qApplications(): QApplication[] {
        return this.databaseState.qApplications
    }
    get QM(): { [name: string]: QApplication } {
        return this.databaseState.QM
    }

}