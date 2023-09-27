import { QApp } from "@airport/aviation-communication";
import { IApplication } from "@airport/ground-control";
import { IFunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "./IAirportDatabase";

export interface IDatabaseState {
    applications: IApplication[]
    entityMap: Map<any, IEntityRecord>
    functions: IFunctionsAndOperators
    qApplications: QApp[]
    QM: { [name: string]: QApp }
}