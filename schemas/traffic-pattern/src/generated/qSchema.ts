import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
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

import {
	IBaseSchemaDmo,
	IBaseSchemaColumnDmo,
	IBaseSchemaEntityDmo,
	IBaseSchemaPropertyDmo,
	IBaseSchemaPropertyColumnDmo,
	IBaseSchemaReferenceDmo,
	IBaseSchemaRelationDmo,
	IBaseSchemaRelationColumnDmo,
	IBaseSchemaVersionDmo,
	IBaseVersionedSchemaObjectDmo
} from './baseDmos';

import {
	IBaseSchemaDao,
	IBaseSchemaColumnDao,
	IBaseSchemaEntityDao,
	IBaseSchemaPropertyDao,
	IBaseSchemaPropertyColumnDao,
	IBaseSchemaReferenceDao,
	IBaseSchemaRelationDao,
	IBaseSchemaRelationColumnDao,
	IBaseSchemaVersionDao,
	IBaseVersionedSchemaObjectDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Schema: IBaseSchemaDmo;
		SchemaColumn: IBaseSchemaColumnDmo;
		SchemaEntity: IBaseSchemaEntityDmo;
		SchemaProperty: IBaseSchemaPropertyDmo;
		SchemaPropertyColumn: IBaseSchemaPropertyColumnDmo;
		SchemaReference: IBaseSchemaReferenceDmo;
		SchemaRelation: IBaseSchemaRelationDmo;
		SchemaRelationColumn: IBaseSchemaRelationColumnDmo;
		SchemaVersion: IBaseSchemaVersionDmo;
		VersionedSchemaObject: IBaseVersionedSchemaObjectDmo;
	}

	dao: {
		Schema: IBaseSchemaDao;
		SchemaColumn: IBaseSchemaColumnDao;
		SchemaEntity: IBaseSchemaEntityDao;
		SchemaProperty: IBaseSchemaPropertyDao;
		SchemaPropertyColumn: IBaseSchemaPropertyColumnDao;
		SchemaReference: IBaseSchemaReferenceDao;
		SchemaRelation: IBaseSchemaRelationDao;
		SchemaRelationColumn: IBaseSchemaRelationColumnDao;
		SchemaVersion: IBaseSchemaVersionDao;
		VersionedSchemaObject: IBaseVersionedSchemaObjectDao;
	}
	
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
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
