import {
	container,
	DI
}                        from '@airport/di'
import {BlockSyncStatus} from '@airport/ground-control'
import {
	REPOSITORY_TRANSACTION_HISTORY_DAO,
	REPOSITORY_DAO
}                        from '@airport/holding-pattern'
import {
	DataOrigin,
	IRepositoryTransactionBlock,
	ISharingMessage,
	ISharingMessageDao,
	ISharingMessageRepoTransBlock,
	ISharingMessageRepoTransBlockDao,
	ISharingNode,
	ISharingNodeDao,
	ISharingNodeRepoTransBlockDao,
	REPO_TRANS_BLOCK_DAO,
	SHARING_MESSAGE_DAO,
	SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO,
	SHARING_NODE_DAO,
	SHARING_NODE_REPO_TRANS_BLOCK_DAO,
	SHARING_NODE_REPOSITORY_DAO,
	SHARING_NODE_TERMINAL_DAO,
	SharingNode_Id,
}                        from '@airport/moving-walkway'
import {APPLICATION_DAO}      from '@airport/airspace'
import {
	SYNCHRONIZATION_OUT_MANAGER,
}                        from '../../tokens'

export interface ISynchronizationOutManager {

}

export class SynchronizationOutManager
	implements ISynchronizationOutManager {


}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager)
