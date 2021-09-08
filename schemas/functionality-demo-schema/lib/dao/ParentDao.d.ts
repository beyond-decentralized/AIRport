import { BaseParentDao } from "../generated/baseDaos";
import { IParent } from "../generated/parent";
export interface IParentDao {
    findAllWithChildren(): Promise<IParent[]>;
}
export declare class ParentDao extends BaseParentDao implements IParentDao {
    findAllWithChildren(): Promise<IParent[]>;
}
//# sourceMappingURL=ParentDao.d.ts.map