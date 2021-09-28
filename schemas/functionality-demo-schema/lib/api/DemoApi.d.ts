import { Level1 } from "../client";
import { DeepPartial } from "@airport/pressurization";
export interface IDemoApi {
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
    updateAllBoolValues(newBoolValue: boolean): Promise<void>;
    updateAllNumValues(newNumValue: number): Promise<void>;
    updateAllStrValues(newStrValue: string): Promise<void>;
}
export declare class DemoApi implements IDemoApi {
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
    updateAllBoolValues(newBoolValue: boolean): Promise<void>;
    updateAllNumValues(newNumValue: number): Promise<void>;
    updateAllStrValues(newStrValue: string): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map