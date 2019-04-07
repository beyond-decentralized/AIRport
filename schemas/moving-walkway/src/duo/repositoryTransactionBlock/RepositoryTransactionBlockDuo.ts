import {DI}                   from '@airport/di'
import {REPO_TRANS_BLOCK_DUO} from '../../diTokens'
import {
	BaseRepositoryTransactionBlockDuo,
	IBaseRepositoryTransactionBlockDuo
}                             from '../../generated/generated'

export interface IRepositoryTransactionBlockDuo
	extends IBaseRepositoryTransactionBlockDuo {
}

export class RepositoryTransactionBlockDuo
	extends BaseRepositoryTransactionBlockDuo
	implements IRepositoryTransactionBlockDuo {

}

DI.set(REPO_TRANS_BLOCK_DUO, RepositoryTransactionBlockDuo)
