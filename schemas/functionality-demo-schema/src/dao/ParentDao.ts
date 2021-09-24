import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { DeepPartial } from "@airport/pressurization";
import { Parent } from "../client";
import { BaseParentDao } from "../generated/baseDaos";
import { IParent } from "../generated/parent";
import { PARENT_DAO } from "../server-tokens";

export interface IParentDao {

    findAllWithChildren(): Promise<IParent[]>

    saveChanges(
        records: DeepPartial<Parent>[]
    ): Promise<void>

}

export class ParentDao
    extends BaseParentDao
    implements IParentDao {

    async findAllWithChildren(): Promise<IParent[]> {
        let parentRecords = []
        try {
            parentRecords = await this.db.find.tree({
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
        } catch (e) {
            console.log(e)
        }

        return parentRecords
    }

    async saveChanges(
        records: DeepPartial<Parent>[]
    ): Promise<void> {
        await this.save(records)
    }

}
DI.set(PARENT_DAO, ParentDao)