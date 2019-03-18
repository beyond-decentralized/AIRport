import {DI}          from '@airport/di'
import {
	BasePackageDao,
	IBasePackageDao
}                    from '../generated/baseDaos'
import {PACKAGE_DAO} from '../diTokens'

export interface IPackageDao
	extends IBasePackageDao {

}

export class PackageDao
	extends BasePackageDao
	implements IPackageDao {

}

DI.set(PACKAGE_DAO, PackageDao)
