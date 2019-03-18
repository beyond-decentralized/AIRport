import {DI}                      from '@airport/di'
import {
	BaseApplicationPackageDao,
	IBaseApplicationDao
}                                from '../generated/baseDaos'
import {APPLICATION_PACKAGE_DAO} from '../diTokens'

export interface IApplicationPackageDao
	extends IBaseApplicationDao {

}

export class ApplicationPackageDao
	extends BaseApplicationPackageDao
	implements IApplicationPackageDao {

}

DI.set(APPLICATION_PACKAGE_DAO, ApplicationPackageDao)