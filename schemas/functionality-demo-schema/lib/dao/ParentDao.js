import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { BaseParentDao } from "../generated/baseDaos";
import { PARENT_DAO } from "../server-tokens";
export class ParentDao extends BaseParentDao {
    async findAllWithChildren() {
        let parentRecords = [];
        try {
            let parent;
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
                    parent.children.innerJoin()
                ]
            });
        }
        catch (e) {
            // Keep this JIK for debugging
            console.log(e);
            throw e;
        }
        return parentRecords;
    }
    async saveChanges(records) {
        await this.save(records);
    }
}
DI.set(PARENT_DAO, ParentDao);
//# sourceMappingURL=ParentDao.js.map