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
                from: [
                    // FIXME: create a this.Parent and type it QParent
                    parent = this.db.from,
                    // FIXME provide a utility
                    parent.children.innerJoin()
                ]
            });
        }
        catch (e) {
            console.log(e);
        }
        return parentRecords;
    }
    async saveChanges(records) {
        await this.save(records);
    }
}
DI.set(PARENT_DAO, ParentDao);
//# sourceMappingURL=ParentDao.js.map