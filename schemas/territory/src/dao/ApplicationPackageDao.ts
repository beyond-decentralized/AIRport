import {DI}                      from '@airport/di'
import {APPLICATION_PACKAGE_DAO} from '../diTokens'
import {
	BaseApplicationPackageDao,
	IBaseApplicationPackageDao
}                                from '../generated/baseDaos'

export interface IApplicationPackageDao
	extends IBaseApplicationPackageDao {

}

export class ApplicationPackageDao
	extends BaseApplicationPackageDao
	implements IApplicationPackageDao {

}

DI.set(APPLICATION_PACKAGE_DAO, ApplicationPackageDao)
