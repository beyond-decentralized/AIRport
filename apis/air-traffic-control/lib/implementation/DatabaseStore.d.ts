import { QApplication } from "@airport/aviation-communication";
import { DbApplication } from "@airport/ground-control";
import { FunctionsAndOperators } from "@airport/tarmaq-query";
import { IEntityRecord } from "../definition/AirportDatabase";
import { IDatabaseState } from "../definition/DatabaseState";
export declare class DatabaseStore implements IDatabaseState {
    databaseState: IDatabaseState;
    get applications(): DbApplication[];
    get entityMap(): Map<any, IEntityRecord>;
    get functions(): FunctionsAndOperators;
    get qApplications(): QApplication[];
    get QM(): {
        [name: string]: QApplication;
    };
}
//# sourceMappingURL=DatabaseStore.d.ts.map