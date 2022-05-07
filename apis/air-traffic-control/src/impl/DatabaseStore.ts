import { Injected } from "@airport/direction-indicator";
import { DbApplication } from "@airport/ground-control";
import { databaseState as theDatabaseState } from "./databaseState";
import { IEntityRecord, QApplication } from "../lingo/AirportDatabase";
import { FunctionsAndOperators } from "../lingo/core/FunctionsAndOperators";
import { IDatabaseState } from "../lingo/DatabaseState";

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