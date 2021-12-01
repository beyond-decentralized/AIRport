import { DI } from '@airport/di'
import { REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO } from '../../tokens'
import {
	BaseRepoTransBlockApplicationToChangeDao,
	IBaseRepoTransBlockApplicationToChangeDao
} from '../../generated/generated'

export interface IRepoTransBlockApplicationToChangeDao
	extends IBaseRepoTransBlockApplicationToChangeDao {

}

export class RepoTransBlockApplicationToChangeDao
	extends BaseRepoTransBlockApplicationToChangeDao
	implements IRepoTransBlockApplicationToChangeDao {

}

DI.set(REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, RepoTransBlockApplicationToChangeDao)
