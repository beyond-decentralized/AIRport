import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import {
	Dao
} from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	diSet
} from './qSchema'
import {
	ISchema,
	SchemaESelect,
	SchemaECascadeGraph,
	SchemaECreateColumns,
	SchemaECreateProperties,
	SchemaEUpdateColumns,
	SchemaEUpdateProperties,
	SchemaEId,
	QSchema
} from './schema/qschema'
import {
	ISchemaColumn,
	SchemaColumnESelect,
	SchemaColumnECascadeGraph,
	SchemaColumnECreateColumns,
	SchemaColumnECreateProperties,
	SchemaColumnEUpdateColumns,
	SchemaColumnEUpdateProperties,
	SchemaColumnEId,
	QSchemaColumn
} from './schema/qschemacolumn'
import {
	ISchemaEntity,
	SchemaEntityESelect,
	SchemaEntityECascadeGraph,
	SchemaEntityECreateColumns,
	SchemaEntityECreateProperties,
	SchemaEntityEUpdateColumns,
	SchemaEntityEUpdateProperties,
	SchemaEntityEId,
	QSchemaEntity
} from './schema/qschemaentity'
import {
	ISchemaProperty,
	SchemaPropertyESelect,
	SchemaPropertyECascadeGraph,
	SchemaPropertyECreateColumns,
	SchemaPropertyECreateProperties,
	SchemaPropertyEUpdateColumns,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyEId,
	QSchemaProperty
} from './schema/qschemaproperty'
import {
	ISchemaPropertyColumn,
	SchemaPropertyColumnESelect,
	SchemaPropertyColumnECascadeGraph,
	SchemaPropertyColumnECreateColumns,
	SchemaPropertyColumnECreateProperties,
	SchemaPropertyColumnEUpdateColumns,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnEId,
	QSchemaPropertyColumn
} from './schema/qschemapropertycolumn'
import {
	ISchemaReference,
	SchemaReferenceESelect,
	SchemaReferenceECascadeGraph,
	SchemaReferenceECreateColumns,
	SchemaReferenceECreateProperties,
	SchemaReferenceEUpdateColumns,
	SchemaReferenceEUpdateProperties,
	SchemaReferenceEId,
	QSchemaReference
} from './schema/qschemareference'
import {
	ISchemaRelation,
	SchemaRelationESelect,
	SchemaRelationECascadeGraph,
	SchemaRelationECreateColumns,
	SchemaRelationECreateProperties,
	SchemaRelationEUpdateColumns,
	SchemaRelationEUpdateProperties,
	SchemaRelationEId,
	QSchemaRelation
} from './schema/qschemarelation'
import {
	ISchemaRelationColumn,
	SchemaRelationColumnESelect,
	SchemaRelationColumnECascadeGraph,
	SchemaRelationColumnECreateColumns,
	SchemaRelationColumnECreateProperties,
	SchemaRelationColumnEUpdateColumns,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnEId,
	QSchemaRelationColumn
} from './schema/qschemarelationcolumn'
import {
	ISchemaVersion,
	SchemaVersionESelect,
	SchemaVersionECascadeGraph,
	SchemaVersionECreateColumns,
	SchemaVersionECreateProperties,
	SchemaVersionEUpdateColumns,
	SchemaVersionEUpdateProperties,
	SchemaVersionEId,
	QSchemaVersion
} from './schema/qschemaversion'

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseSchemaDao
  extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema> {
}

export class BaseSchemaDao
  extends SQDIDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema>
	implements IBaseSchemaDao {

	static diSet(): boolean {
		return diSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSchemaColumnDao
  extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn> {
}

export class BaseSchemaColumnDao
  extends SQDIDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn>
	implements IBaseSchemaColumnDao {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSchemaEntityDao
  extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity> {
}

export class BaseSchemaEntityDao
  extends SQDIDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity>
	implements IBaseSchemaEntityDao {

	static diSet(): boolean {
		return diSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseSchemaPropertyDao
  extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty> {
}

export class BaseSchemaPropertyDao
  extends SQDIDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty>
	implements IBaseSchemaPropertyDao {

	static diSet(): boolean {
		return diSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSchemaPropertyColumnDao
  extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn> {
}

export class BaseSchemaPropertyColumnDao
  extends SQDIDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn>
	implements IBaseSchemaPropertyColumnDao {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSchemaReferenceDao
  extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference> {
}

export class BaseSchemaReferenceDao
  extends SQDIDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference>
	implements IBaseSchemaReferenceDao {

	static diSet(): boolean {
		return diSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSchemaRelationDao
  extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation> {
}

export class BaseSchemaRelationDao
  extends SQDIDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation>
	implements IBaseSchemaRelationDao {

	static diSet(): boolean {
		return diSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSchemaRelationColumnDao
  extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn> {
}

export class BaseSchemaRelationColumnDao
  extends SQDIDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn>
	implements IBaseSchemaRelationColumnDao {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSchemaVersionDao
  extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion> {
}

export class BaseSchemaVersionDao
  extends SQDIDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion>
	implements IBaseSchemaVersionDao {

	static diSet(): boolean {
		return diSet(7)
	}
	
	constructor() {
		super(7)
	}
}
