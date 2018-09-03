import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	ISchema,
	SchemaESelect,
	SchemaECreateColumns,
	SchemaECreateProperties,
	SchemaEUpdateColumns,
	SchemaEUpdateProperties,
	SchemaEId,
	QSchema
} from './schema/qschema';
import {
	ISchemaColumn,
	SchemaColumnESelect,
	SchemaColumnECreateColumns,
	SchemaColumnECreateProperties,
	SchemaColumnEUpdateColumns,
	SchemaColumnEUpdateProperties,
	SchemaColumnEId,
	QSchemaColumn
} from './schema/qschemacolumn';
import {
	ISchemaEntity,
	SchemaEntityESelect,
	SchemaEntityECreateColumns,
	SchemaEntityECreateProperties,
	SchemaEntityEUpdateColumns,
	SchemaEntityEUpdateProperties,
	SchemaEntityEId,
	QSchemaEntity
} from './schema/qschemaentity';
import {
	ISchemaProperty,
	SchemaPropertyESelect,
	SchemaPropertyECreateColumns,
	SchemaPropertyECreateProperties,
	SchemaPropertyEUpdateColumns,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyEId,
	QSchemaProperty
} from './schema/qschemaproperty';
import {
	ISchemaPropertyColumn,
	SchemaPropertyColumnESelect,
	SchemaPropertyColumnECreateColumns,
	SchemaPropertyColumnECreateProperties,
	SchemaPropertyColumnEUpdateColumns,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnEId,
	QSchemaPropertyColumn
} from './schema/qschemapropertycolumn';
import {
	ISchemaReference,
	SchemaReferenceESelect,
	SchemaReferenceECreateColumns,
	SchemaReferenceECreateProperties,
	SchemaReferenceEUpdateColumns,
	SchemaReferenceEUpdateProperties,
	SchemaReferenceEId,
	QSchemaReference
} from './schema/qschemareference';
import {
	ISchemaRelation,
	SchemaRelationESelect,
	SchemaRelationECreateColumns,
	SchemaRelationECreateProperties,
	SchemaRelationEUpdateColumns,
	SchemaRelationEUpdateProperties,
	SchemaRelationEId,
	QSchemaRelation
} from './schema/qschemarelation';
import {
	ISchemaRelationColumn,
	SchemaRelationColumnESelect,
	SchemaRelationColumnECreateColumns,
	SchemaRelationColumnECreateProperties,
	SchemaRelationColumnEUpdateColumns,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnEId,
	QSchemaRelationColumn
} from './schema/qschemarelationcolumn';
import {
	ISchemaVersion,
	SchemaVersionESelect,
	SchemaVersionECreateColumns,
	SchemaVersionECreateProperties,
	SchemaVersionEUpdateColumns,
	SchemaVersionEUpdateProperties,
	SchemaVersionEId,
	QSchemaVersion
} from './schema/qschemaversion';
import {
	ITestA,
	TestAESelect,
	TestAECreateColumns,
	TestAECreateProperties,
	TestAEUpdateColumns,
	TestAEUpdateProperties,
	TestAEId,
	QTestA
} from './test/qtesta';
import {
	ITestB,
	TestBESelect,
	TestBECreateColumns,
	TestBECreateProperties,
	TestBEUpdateColumns,
	TestBEUpdateProperties,
	TestBEId,
	QTestB
} from './test/qtestb';
import {
	ITestC,
	TestCESelect,
	TestCECreateColumns,
	TestCECreateProperties,
	TestCEUpdateColumns,
	TestCEUpdateProperties,
	TestCEId,
	QTestC
} from './test/qtestc';
import {
	IVersionedSchemaObject,
	VersionedSchemaObjectESelect,
	VersionedSchemaObjectECreateColumns,
	VersionedSchemaObjectECreateProperties,
	VersionedSchemaObjectEUpdateColumns,
	VersionedSchemaObjectEUpdateProperties,
	VersionedSchemaObjectEId,
	QVersionedSchemaObject
} from './schema/qversionedschemaobject';


export interface IBaseSchemaDmo
  extends IDmo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema> {
}

export class BaseSchemaDmo
  extends Dmo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateProperties, SchemaEId, QSchema>
	implements IBaseSchemaDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Schema']);
	}
}


export interface IBaseSchemaColumnDmo
  extends IDmo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> {
}

export class BaseSchemaColumnDmo
  extends Dmo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn>
	implements IBaseSchemaColumnDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaColumn']);
	}
}


export interface IBaseSchemaEntityDmo
  extends IDmo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> {
}

export class BaseSchemaEntityDmo
  extends Dmo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity>
	implements IBaseSchemaEntityDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaEntity']);
	}
}


export interface IBaseSchemaPropertyDmo
  extends IDmo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> {
}

export class BaseSchemaPropertyDmo
  extends Dmo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty>
	implements IBaseSchemaPropertyDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaProperty']);
	}
}


export interface IBaseSchemaPropertyColumnDmo
  extends IDmo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> {
}

export class BaseSchemaPropertyColumnDmo
  extends Dmo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn>
	implements IBaseSchemaPropertyColumnDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaPropertyColumn']);
	}
}


export interface IBaseSchemaReferenceDmo
  extends IDmo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> {
}

export class BaseSchemaReferenceDmo
  extends Dmo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference>
	implements IBaseSchemaReferenceDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaReference']);
	}
}


export interface IBaseSchemaRelationDmo
  extends IDmo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> {
}

export class BaseSchemaRelationDmo
  extends Dmo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation>
	implements IBaseSchemaRelationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaRelation']);
	}
}


export interface IBaseSchemaRelationColumnDmo
  extends IDmo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> {
}

export class BaseSchemaRelationColumnDmo
  extends Dmo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn>
	implements IBaseSchemaRelationColumnDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaRelationColumn']);
	}
}


export interface IBaseSchemaVersionDmo
  extends IDmo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> {
}

export class BaseSchemaVersionDmo
  extends Dmo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion>
	implements IBaseSchemaVersionDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SchemaVersion']);
	}
}


export interface IBaseTestADmo
  extends IDmo<ITestA, TestAESelect, TestAECreateProperties, TestAEUpdateProperties, TestAEId, QTestA> {
}

export class BaseTestADmo
  extends Dmo<ITestA, TestAESelect, TestAECreateProperties, TestAEUpdateProperties, TestAEId, QTestA>
	implements IBaseTestADmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TestA']);
	}
}


export interface IBaseTestBDmo
  extends IDmo<ITestB, TestBESelect, TestBECreateProperties, TestBEUpdateProperties, TestBEId, QTestB> {
}

export class BaseTestBDmo
  extends Dmo<ITestB, TestBESelect, TestBECreateProperties, TestBEUpdateProperties, TestBEId, QTestB>
	implements IBaseTestBDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TestB']);
	}
}


export interface IBaseTestCDmo
  extends IDmo<ITestC, TestCESelect, TestCECreateProperties, TestCEUpdateProperties, TestCEId, QTestC> {
}

export class BaseTestCDmo
  extends Dmo<ITestC, TestCESelect, TestCECreateProperties, TestCEUpdateProperties, TestCEId, QTestC>
	implements IBaseTestCDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TestC']);
	}
}


export interface IBaseVersionedSchemaObjectDmo
  extends IDmo<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject> {
}

export class BaseVersionedSchemaObjectDmo
  extends Dmo<IVersionedSchemaObject, VersionedSchemaObjectESelect, VersionedSchemaObjectECreateProperties, VersionedSchemaObjectEUpdateProperties, VersionedSchemaObjectEId, QVersionedSchemaObject>
	implements IBaseVersionedSchemaObjectDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['VersionedSchemaObject']);
	}
}
