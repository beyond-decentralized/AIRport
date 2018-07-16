import { DbSchema, QSchema as AirportQSchema } from '@airport/air-control';
import { Application } from '../ddl/Application';
import { QApplication } from './qapplication';
import { ApplicationPackage } from '../ddl/ApplicationPackage';
import { QApplicationPackage } from './qapplicationpackage';
import { Domain } from '../ddl/Domain';
import { QDomain } from './qdomain';
import { Package } from '../ddl/Package';
import { QPackage } from './qpackage';
import { PackagedUnit } from '../ddl/PackagedUnit';
import { QPackagedUnit } from './qpackagedunit';

import {
	IBaseApplicationDmo,
	IBaseApplicationPackageDmo,
	IBaseDomainDmo,
	IBasePackageDmo,
	IBasePackagedUnitDmo
} from './baseDmos';

import {
	IBaseApplicationDao,
	IBaseApplicationPackageDao,
	IBaseDomainDao,
	IBasePackageDao,
	IBasePackagedUnitDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Application: IBaseApplicationDmo;
		ApplicationPackage: IBaseApplicationPackageDmo;
		Domain: IBaseDomainDmo;
		Package: IBasePackageDmo;
		PackagedUnit: IBasePackagedUnitDmo;
	}

	dao: {
		Application: IBaseApplicationDao;
		ApplicationPackage: IBaseApplicationPackageDao;
		Domain: IBaseDomainDao;
		Package: IBasePackageDao;
		PackagedUnit: IBasePackagedUnitDao;
	}
	
	Application: QApplication;
	ApplicationPackage: QApplicationPackage;
	Domain: QDomain;
	Package: QPackage;
	PackagedUnit: QPackagedUnit;

}

const __constructors__ = {
	Application: Application,
	ApplicationPackage: ApplicationPackage,
	Domain: Domain,
	Package: Package,
	PackagedUnit: PackagedUnit
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
