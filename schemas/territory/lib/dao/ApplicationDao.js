import { DI } from '@airport/di';
import { BaseApplicationDao } from '../generated/baseDaos';
import { APPLICATION_DAO } from '../tokens';
export class ApplicationDao extends BaseApplicationDao {
}
DI.set(APPLICATION_DAO, ApplicationDao);
//# sourceMappingURL=ApplicationDao.js.map