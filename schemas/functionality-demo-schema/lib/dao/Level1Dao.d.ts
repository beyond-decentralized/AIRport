import { DeepPartial } from "@airport/pressurization";
import { Level1 } from "../client";
import { ILevel1 } from "../generated/level1";
import { BaseLevel1Dao } from "../generated/generated";
export interface ILevel1Dao {
    findAllWithLevel2(): Promise<ILevel1[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
}
export declare class Level1Dao extends BaseLevel1Dao implements ILevel1Dao {
    findAllWithLevel2(): Promise<ILevel1[]>;
    saveChanges(records: DeepPartial<Level1>[]): Promise<void>;
}
//# sourceMappingURL=Level1Dao.d.ts.map