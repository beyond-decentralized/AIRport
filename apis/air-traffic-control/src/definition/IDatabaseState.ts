import { QApp } from "@airport/aviation-communication";
import { DbApplication } from "@airport/ground-control";
import { IFunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "./IAirportDatabase";

export interface IDatabaseState {
    applications: DbApplication[]
    entityMap: Map<any, IEntityRecord>
    functions: IFunctionsAndOperators
    qApplications: QApp[]
    QM: { [name: string]: QApp }
}