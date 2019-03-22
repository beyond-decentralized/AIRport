import {DI}                from '@airport/di'
import {REPOSITORY_DAO}    from '../../diTokens'
import {BaseRepositoryDao} from '../../generated/baseDaos'

export interface IRepositoryDao {

}

export class RepositoryDao
	extends BaseRepositoryDao
	implements IRepositoryDao {

}

DI.set(REPOSITORY_DAO, RepositoryDao)