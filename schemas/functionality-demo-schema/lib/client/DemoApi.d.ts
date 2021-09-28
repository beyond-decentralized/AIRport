import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../ddl/Level1";
export declare class DemoApi {
    getAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map