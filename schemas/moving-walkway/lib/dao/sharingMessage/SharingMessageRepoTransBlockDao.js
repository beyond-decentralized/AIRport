import { DI } from '@airport/di';
import { SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO } from '../../tokens';
import { BaseSharingMessageRepoTransBlockDao, } from '../../generated/generated';
export class SharingMessageRepoTransBlockDao extends BaseSharingMessageRepoTransBlockDao {
}
DI.set(SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SharingMessageRepoTransBlockDao);
//# sourceMappingURL=SharingMessageRepoTransBlockDao.js.map