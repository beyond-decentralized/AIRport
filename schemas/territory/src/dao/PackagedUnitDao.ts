import {DI} from '@airport/di'
import {
	BasePackagedUnitDao,
	IBasePackagedUnitDao
}           from "../generated/generated";
import {
	PACKAGE_UNIT_DAO
}           from '../tokens';

export interface IPackagedUnitDao
	extends IBasePackagedUnitDao {

}

export class PackagedUnitDao
	extends BasePackagedUnitDao
	implements IPackagedUnitDao {

}

DI.set(PACKAGE_UNIT_DAO, PackagedUnitDao)
