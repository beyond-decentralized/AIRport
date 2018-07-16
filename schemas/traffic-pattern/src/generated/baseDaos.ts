import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseSchemaDao
  extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema> {
}

export class BaseSchemaDao
  extends Dao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, QSchema>
	implements IBaseSchemaDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Schema'], Q, utils);
	}
}


export interface IBaseSchemaColumnDao
  extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn> {
}

export class BaseSchemaColumnDao
  extends Dao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, QSchemaColumn>
	implements IBaseSchemaColumnDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaColumn'], Q, utils);
	}
}


export interface IBaseSchemaEntityDao
  extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity> {
}

export class BaseSchemaEntityDao
  extends Dao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, QSchemaEntity>
	implements IBaseSchemaEntityDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaEntity'], Q, utils);
	}
}


export interface IBaseSchemaPropertyDao
  extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty> {
}

export class BaseSchemaPropertyDao
  extends Dao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, QSchemaProperty>
	implements IBaseSchemaPropertyDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaProperty'], Q, utils);
	}
}


export interface IBaseSchemaPropertyColumnDao
  extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn> {
}

export class BaseSchemaPropertyColumnDao
  extends Dao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, QSchemaPropertyColumn>
	implements IBaseSchemaPropertyColumnDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaPropertyColumn'], Q, utils);
	}
}


export interface IBaseSchemaReferenceDao
  extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference> {
}

export class BaseSchemaReferenceDao
  extends Dao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, QSchemaReference>
	implements IBaseSchemaReferenceDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaReference'], Q, utils);
	}
}


export interface IBaseSchemaRelationDao
  extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation> {
}

export class BaseSchemaRelationDao
  extends Dao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, QSchemaRelation>
	implements IBaseSchemaRelationDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaRelation'], Q, utils);
	}
}


export interface IBaseSchemaRelationColumnDao
  extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn> {
}

export class BaseSchemaRelationColumnDao
  extends Dao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, QSchemaRelationColumn>
	implements IBaseSchemaRelationColumnDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaRelationColumn'], Q, utils);
	}
}


export interface IBaseSchemaVersionDao
  extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion> {
}

export class BaseSchemaVersionDao
  extends Dao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, QSchemaVersion>
	implements IBaseSchemaVersionDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SchemaVersion'], Q, utils);
	}
}
