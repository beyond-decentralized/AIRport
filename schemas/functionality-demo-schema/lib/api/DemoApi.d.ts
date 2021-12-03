import { IRepository } from "@airport/holding-pattern";
import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../client";
export interface IDemoApi {
    addRepository(repositoryName: string): Promise<void>;
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    getRepositoryListings(): Promise<IRepository[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
    updateAllBoolValues(newBoolValue: boolean): Promise<void>;
    updateAllNumValues(newNumValue: number): Promise<void>;
    updateAllStrValues(newStrValue: string): Promise<void>;
}
export declare class DemoApi implements IDemoApi {
    addRepository(repositoryName: string): Promise<void>;
    findAllLevel1WithLevel2(): Promise<DeepPartial<Level1>[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
    updateAllBoolValues(newBoolValue: boolean): Promise<void>;
    updateAllNumValues(newNumValue: number): Promise<void>;
    updateAllStrValues(newStrValue: string): Promise<void>;
}
//# sourceMappingURL=DemoApi.d.ts.map