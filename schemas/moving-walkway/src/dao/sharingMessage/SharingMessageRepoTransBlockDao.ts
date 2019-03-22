import {DI}                                   from '@airport/di'
import {SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO} from '../../diTokens'
import {
	BaseSharingMessageRepoTransBlockDao,
	IBaseSharingMessageRepoTransBlockDao,
}                                             from '../../generated/generated'

export interface ISharingMessageRepoTransBlockDao
	extends IBaseSharingMessageRepoTransBlockDao {

}

export class SharingMessageRepoTransBlockDao
	extends BaseSharingMessageRepoTransBlockDao
	implements ISharingMessageRepoTransBlockDao {

}

DI.set(SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SharingMessageRepoTransBlockDao)
