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
import { Schema } from '../ddl/schema/schema';
import { QSchema } from './schema/qschema';
import { SchemaColumn } from '../ddl/schema/schemacolumn';
import { QSchemaColumn } from './schema/qschemacolumn';
import { SchemaEntity } from '../ddl/schema/schemaentity';
import { QSchemaEntity } from './schema/qschemaentity';
import { SchemaProperty } from '../ddl/schema/schemaproperty';
import { QSchemaProperty } from './schema/qschemaproperty';
import { SchemaPropertyColumn } from '../ddl/schema/schemapropertycolumn';
import { QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { SchemaReference } from '../ddl/schema/schemareference';
import { QSchemaReference } from './schema/qschemareference';
import { SchemaRelation } from '../ddl/schema/schemarelation';
import { QSchemaRelation } from './schema/qschemarelation';
import { SchemaRelationColumn } from '../ddl/schema/schemarelationcolumn';
import { QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { SchemaVersion } from '../ddl/schema/schemaversion';
import { QSchemaVersion } from './schema/qschemaversion';
import { VersionedSchemaObject } from '../ddl/schema/versionedschemaobject';
import { QVersionedSchemaObject } from './schema/qversionedschemaobject';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Schema: QSchema;
	SchemaColumn: QSchemaColumn;
	SchemaEntity: QSchemaEntity;
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
  domain: 'npmjs.org',
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

DI.get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
