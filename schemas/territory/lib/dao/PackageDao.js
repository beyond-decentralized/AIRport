import { DI } from '@airport/di';
import { BasePackageDao } from '../generated/baseDaos';
import { PACKAGE_DAO } from '../tokens';
export class PackageDao extends BasePackageDao {
}
DI.set(PACKAGE_DAO, PackageDao);
//# sourceMappingURL=PackageDao.js.map