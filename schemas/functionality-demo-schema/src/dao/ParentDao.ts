import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { BaseParentDao } from "../generated/baseDaos";
import { IParent } from "../generated/parent";
import { PARENT_DAO } from "../tokens";

export interface IParentDao {

    findAllWithChildren(): Promise<IParent[]>

}

export class ParentDao
    extends BaseParentDao
    implements IParentDao {

    async findAllWithChildren(): Promise<IParent[]> {
        return await this.db.find.tree({
            select: {
                bool: Y,
                children: {
                    bool: Y,
                    id: Y,
                    num: Y,
                    str: Y
                },
                id: Y,
                num: Y,
                str: Y
            }
        })
    }

}
DI.set(PARENT_DAO, ParentDao)