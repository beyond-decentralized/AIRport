import { DI } from '@airport/di';
import { REPOSITORY_DAO } from '../../tokens';
import { BaseRepositoryDao } from '../../generated/baseDaos';
export class RepositoryDao extends BaseRepositoryDao {
}
DI.set(REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map