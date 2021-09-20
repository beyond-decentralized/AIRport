import { DeepPartial } from "@airport/pressurization";
import { Parent } from "../ddl/Parent";
export declare class DemoApi {
    getAllParentsWithChildren(): Promise<DeepPartial<Parent>[]>;
    saveChanges(records: DeepPartial<Parent>[]): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map