import {
	AIR_DB,
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
import { QSchema } from './schema/qschema';
import { QSchemaColumn } from './schema/qschemacolumn';
import { QSchemaEntity } from './schema/qschemaentity';
import { QSchemaOperation } from './schema/qschemaoperation';
import { QSchemaProperty } from './schema/qschemaproperty';
import { QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { QSchemaReference } from './schema/qschemareference';
import { QSchemaRelation } from './schema/qschemarelation';
import { QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { QSchemaVersion } from './schema/qschemaversion';
import { QVersionedSchemaObject } from './schema/qversionedschemaobject';
import {
  Schema,
  SchemaColumn,
  SchemaEntity,
  SchemaOperation,
  SchemaProperty,
  SchemaPropertyColumn,
  SchemaReference,
  SchemaRelation,
  SchemaRelationColumn,
  SchemaVersion,
  VersionedSchemaObject
} from '../ddl/ddl';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Schema: QSchema;
	SchemaColumn: QSchemaColumn;
	SchemaEntity: QSchemaEntity;
	SchemaOperation: QSchemaOperation;
	SchemaProperty: QSchemaProperty;
	SchemaPropertyColumn: QSchemaPropertyColumn;
	SchemaReference: QSchemaReference;
	SchemaRelation: QSchemaRelation;
	SchemaRelationColumn: QSchemaRelationColumn;
	SchemaVersion: QSchemaVersion;
	VersionedSchemaObject: QVersionedSchemaObject;

}

const __constructors__ = {
	Schema: Schema,
	SchemaColumn: SchemaColumn,
	SchemaEntity: SchemaEntity,
	SchemaOperation: SchemaOperation,
	SchemaProperty: SchemaProperty,
	SchemaPropertyColumn: SchemaPropertyColumn,
	SchemaReference: SchemaReference,
	SchemaRelation: SchemaRelation,
	SchemaRelationColumn: SchemaRelationColumn,
	SchemaVersion: SchemaVersion,
	VersionedSchemaObject: VersionedSchemaObject
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/traffic-pattern'
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

DI.db().eventuallyGet(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
