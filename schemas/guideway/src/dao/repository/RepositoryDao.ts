import {DI}             from '@airport/di'
import {REPOSITORY_DAO} from '../../tokens'
import {
	BaseRepositoryDao,
	IBaseRepositoryDao
}                       from '../../generated/baseDaos'

export interface IRepositoryDao
	extends IBaseRepositoryDao {

}

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

}

DI.set(REPOSITORY_DAO, RepositoryDao)
