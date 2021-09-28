import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../ddl/Level1";
export declare class DemoApi {
    getAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
    updateAllBoolValues(newBoolValue: boolean): Promise<void>;
    updateAllNumValues(newNumValue: number): Promise<void>;
    updateAllStrValues(newStrValue: string): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map