import { QApp } from "@airport/aviation-communication";
import { DbApplication } from "@airport/ground-control";
import { FunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "./AirportDatabase";

export interface IDatabaseState {
    applications: DbApplication[]
    entityMap: Map<any, IEntityRecord>
    functions: FunctionsAndOperators
    qApplications: QApp[]
    QM: { [name: string]: QApp }
}