import { Injected } from "@airport/direction-indicator";
import { DbApplication } from "@airport/ground-control";
import { databaseState } from "../impl/databaseState";
import { IEntityRecord, QApplication } from "./AirportDatabase";
import { FunctionsAndOperators } from "./core/FunctionsAndOperators";
import { IDatabaseState } from "./DatabaseState";

@Injected()
export class DatabaseStore
    implements IDatabaseState {

    get applications(): DbApplication[] {
        return databaseState.applications
    }
    get entityMap(): Map<any, IEntityRecord> {
        return databaseState.entityMap
    }
    get functions(): FunctionsAndOperators {
        return databaseState.functions
    }
    get qApplications(): QApplication[] {
        return databaseState.qApplications
    }
    get QM(): { [name: string]: QApplication } {
        return databaseState.QM
    }

}