import { DI } from "@airport/di";
import { BaseChildDao } from "../generated/baseDaos";
import { CHILD_DAO } from "../server-tokens";
export class ChildDao extends BaseChildDao {
}
DI.set(CHILD_DAO, ChildDao);
//# sourceMappingURL=ChildDao.js.map