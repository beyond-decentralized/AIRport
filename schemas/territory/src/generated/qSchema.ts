import {
	AIRPORT_DATABASE,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { QApplication } from './qapplication';
import { QApplicationPackage } from './qapplicationpackage';
import { QDomain } from './qdomain';
import { QPackage } from './qpackage';
import { QPackagedUnit } from './qpackagedunit';
import {
  Application,
  ApplicationPackage,
  Domain,
  Package,
  PackagedUnit
} from '../ddl/ddl';

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
	__constructors__,
  domain: 'air',
  name: '@airport/territory'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
