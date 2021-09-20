import { Parent } from "../client";
import { DeepPartial } from "@airport/pressurization";
export interface IDemoApi {
    findAllParentsWithChildren(): Promise<DeepPartial<Parent>[]>;
    saveChanges(records: DeepPartial<Parent>[]): Promise<void>;
}
export declare class DemoApi implements IDemoApi {
    findAllParentsWithChildren(): Promise<DeepPartial<Parent>[]>;
    saveChanges(records: DeepPartial<Parent>[]): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map