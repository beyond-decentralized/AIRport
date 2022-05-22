import { QApplication } from "@airport/aviation-communication";
import { DbApplication } from "@airport/ground-control";
import { IEntityRecord } from "./AirportDatabase";
import { FunctionsAndOperators } from "./core/FunctionsAndOperators";

export interface IDatabaseState {
    applications: DbApplication[]
    entityMap: Map<any, IEntityRecord>
    functions: FunctionsAndOperators
    qApplications: QApplication[]
    QM: { [name: string]: QApplication }
}