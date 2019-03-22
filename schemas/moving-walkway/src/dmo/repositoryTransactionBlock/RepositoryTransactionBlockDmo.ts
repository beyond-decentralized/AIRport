import {DI}                   from '@airport/di'
import {REPO_TRANS_BLOCK_DMO} from '../../diTokens'
import {
	BaseRepositoryTransactionBlockDmo,
	IBaseRepositoryTransactionBlockDmo
}                             from '../../generated/generated'

export interface IRepositoryTransactionBlockDmo
	extends IBaseRepositoryTransactionBlockDmo {
}

export class RepositoryTransactionBlockDmo
	extends BaseRepositoryTransactionBlockDmo
	implements IRepositoryTransactionBlockDmo {

}

DI.set(REPO_TRANS_BLOCK_DMO, RepositoryTransactionBlockDmo)
