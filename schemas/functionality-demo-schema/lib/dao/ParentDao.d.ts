import { DeepPartial } from "@airport/pressurization";
import { Parent } from "../client";
import { BaseParentDao } from "../generated/baseDaos";
import { IParent } from "../generated/parent";
export interface IParentDao {
    findAllWithChildren(): Promise<IParent[]>;
    saveChanges(records: DeepPartial<Parent>[]): Promise<void>;
}
export declare class ParentDao extends BaseParentDao implements IParentDao {
    findAllWithChildren(): Promise<IParent[]>;
    saveChanges(records: DeepPartial<Parent>[]): Promise<void>;
}
//# sourceMappingURL=ParentDao.d.ts.map