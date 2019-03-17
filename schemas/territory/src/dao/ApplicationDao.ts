import {DI}              from '@airport/di'
import {
	BaseApplicationDao,
	IBaseApplicationDao
}                        from '../generated/baseDaos'
import {APPLICATION_DAO} from '../InjectionTokens'

export interface IApplicationDao
	extends IBaseApplicationDao {

}

export class ApplicationDao
	extends BaseApplicationDao
	implements IApplicationDao {

}

DI.set(APPLICATION_DAO, ApplicationDao)
