import { DI } from "@airport/di";
import { BaseLevel2Dao } from "../generated/generated";
import { LEVEL_2_DAO } from "../server-tokens";
export class Level2Dao extends BaseLevel2Dao {
}
DI.set(LEVEL_2_DAO, Level2Dao);
//# sourceMappingURL=Level2Dao.js.map