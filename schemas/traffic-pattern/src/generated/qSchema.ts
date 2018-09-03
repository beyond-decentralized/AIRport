import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { Schema } from '../ddl/schema/Schema';
import { QSchema } from './schema/qschema';
import { SchemaColumn } from '../ddl/schema/SchemaColumn';
import { QSchemaColumn } from './schema/qschemacolumn';
import { SchemaEntity } from '../ddl/schema/SchemaEntity';
import { QSchemaEntity } from './schema/qschemaentity';
import { SchemaProperty } from '../ddl/schema/SchemaProperty';
import { QSchemaProperty } from './schema/qschemaproperty';
import { SchemaPropertyColumn } from '../ddl/schema/SchemaPropertyColumn';
import { QSchemaPropertyColumn } from './schema/qschemapropertycolumn';
import { SchemaReference } from '../ddl/schema/SchemaReference';
import { QSchemaReference } from './schema/qschemareference';
import { SchemaRelation } from '../ddl/schema/SchemaRelation';
import { QSchemaRelation } from './schema/qschemarelation';
import { SchemaRelationColumn } from '../ddl/schema/SchemaRelationColumn';
import { QSchemaRelationColumn } from './schema/qschemarelationcolumn';
import { SchemaVersion } from '../ddl/schema/SchemaVersion';
import { QSchemaVersion } from './schema/qschemaversion';
import { TestA } from '../ddl/test/TestA';
import { QTestA } from './test/qtesta';
import { TestB } from '../ddl/test/TestB';
import { QTestB } from './test/qtestb';
import { TestC } from '../ddl/test/TestC';
import { QTestC } from './test/qtestc';
import { VersionedSchemaObject } from '../ddl/schema/VersionedSchemaObject';
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
	IBaseTestADmo,
	IBaseTestBDmo,
	IBaseTestCDmo,
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
	IBaseTestADao,
	IBaseTestBDao,
	IBaseTestCDao,
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
		TestA: IBaseTestADmo;
		TestB: IBaseTestBDmo;
		TestC: IBaseTestCDmo;
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
		TestA: IBaseTestADao;
		TestB: IBaseTestBDao;
		TestC: IBaseTestCDao;
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
	TestA: QTestA;
	TestB: QTestB;
	TestC: QTestC;
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
	TestA: TestA,
	TestB: TestB,
	TestC: TestC,
	VersionedSchemaObject: VersionedSchemaObject
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
