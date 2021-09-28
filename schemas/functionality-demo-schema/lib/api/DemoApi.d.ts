import { Level1 } from "../client";
import { DeepPartial } from "@airport/pressurization";
export interface IDemoApi {
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
}
export declare class DemoApi implements IDemoApi {
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map