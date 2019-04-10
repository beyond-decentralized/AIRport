import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { Application } from '../ddl/application';
import { QApplication } from './qapplication';
import { ApplicationPackage } from '../ddl/applicationpackage';
import { QApplicationPackage } from './qapplicationpackage';
import { Domain } from '../ddl/domain';
import { QDomain } from './qdomain';
import { Package } from '../ddl/package';
import { QPackage } from './qpackage';
import { PackagedUnit } from '../ddl/packagedunit';
import { QPackagedUnit } from './qpackagedunit';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

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
