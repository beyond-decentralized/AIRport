import { DI } from '@airport/di';
import { REPO_TRANS_BLOCK_DUO } from '../../tokens';
import { BaseRepositoryTransactionBlockDuo } from '../../generated/generated';
export class RepositoryTransactionBlockDuo extends BaseRepositoryTransactionBlockDuo {
}
DI.set(REPO_TRANS_BLOCK_DUO, RepositoryTransactionBlockDuo);
//# sourceMappingURL=RepositoryTransactionBlockDuo.js.map