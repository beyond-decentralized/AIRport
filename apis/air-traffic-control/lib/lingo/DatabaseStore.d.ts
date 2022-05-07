import { DbApplication } from "@airport/ground-control";
import { IEntityRecord, QApplication } from "./AirportDatabase";
import { FunctionsAndOperators } from "./core/FunctionsAndOperators";
import { IDatabaseState } from "./DatabaseState";
export declare class DatabaseStore implements IDatabaseState {
    get applications(): DbApplication[];
    get entityMap(): Map<any, IEntityRecord>;
    get functions(): FunctionsAndOperators;
    get qApplications(): QApplication[];
    get QM(): {
        [name: string]: QApplication;
    };
}
//# sourceMappingURL=DatabaseStore.d.ts.map