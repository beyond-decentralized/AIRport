import { DI } from '@airport/di';
import { APPLICATION_PACKAGE_DAO } from '../tokens';
import { BaseApplicationPackageDao } from '../generated/baseDaos';
export class ApplicationPackageDao extends BaseApplicationPackageDao {
}
DI.set(APPLICATION_PACKAGE_DAO, ApplicationPackageDao);
//# sourceMappingURL=ApplicationPackageDao.js.map