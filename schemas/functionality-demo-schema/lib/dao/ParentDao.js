import { Y } from "@airport/air-control";
import { DI } from "@airport/di";
import { BaseParentDao } from "../generated/baseDaos";
import { PARENT_DAO } from "../server-tokens";
export class ParentDao extends BaseParentDao {
    async findAllWithChildren() {
        let parentRecords = [];
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