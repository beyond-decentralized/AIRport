import { DI } from '@airport/di';
import { BasePackagedUnitDao } from "../generated/generated";
import { PACKAGE_UNIT_DAO } from '../tokens';
export class PackagedUnitDao extends BasePackagedUnitDao {
}
DI.set(PACKAGE_UNIT_DAO, PackagedUnitDao);
//# sourceMappingURL=PackagedUnitDao.js.map