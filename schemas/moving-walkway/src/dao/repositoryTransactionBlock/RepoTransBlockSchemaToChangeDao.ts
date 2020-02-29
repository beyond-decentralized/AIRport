import {DI}                                    from '@airport/di'
import {REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO} from '../../tokens'
import {
	BaseRepoTransBlockSchemaToChangeDao,
	IBaseRepoTransBlockSchemaToChangeDao
}                                              from '../../generated/generated'

export interface IRepoTransBlockSchemaToChangeDao
	extends IBaseRepoTransBlockSchemaToChangeDao {

}

export class RepoTransBlockSchemaToChangeDao
	extends BaseRepoTransBlockSchemaToChangeDao {

}

DI.set(REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, RepoTransBlockSchemaToChangeDao)
