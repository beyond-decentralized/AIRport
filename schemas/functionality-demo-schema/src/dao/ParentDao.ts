import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { DeepPartial } from "@airport/pressurization";
import { Parent } from "../client";
import { BaseParentDao } from "../generated/baseDaos";
import { IParent } from "../generated/parent";
import { QParent } from "../server";
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
            let parent: QParent
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
                },
                // FIXME: automatically derive FROM clause using SELECT clause if no FROM is provided
                from: [
                    // FIXME: create a this.Parent and type it QParent
                    parent = this.db.from,
                    parent.children.leftJoin()
                ]
            })
        } catch (e) {
            // Keep this JIK for debugging
            console.log(e)
            throw e
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