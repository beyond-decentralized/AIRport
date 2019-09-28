import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	ISchema
} from './schema/schema'
import {
	SchemaESelect,
	SchemaECreateColumns,
	SchemaECreateProperties,
	SchemaEUpdateColumns,
	SchemaEUpdateProperties,
	SchemaEId,
	SchemaECascadeGraph,
	QSchema
} from './schema/qschema'
import {
	ISchemaColumn
} from './schema/schemacolumn'
import {
	SchemaColumnESelect,
	SchemaColumnECreateColumns,
	SchemaColumnECreateProperties,
	SchemaColumnEUpdateColumns,
	SchemaColumnEUpdateProperties,
	SchemaColumnEId,
	SchemaColumnECascadeGraph,
	QSchemaColumn
} from './schema/qschemacolumn'
import {
	ISchemaEntity
} from './schema/schemaentity'
import {
	SchemaEntityESelect,
	SchemaEntityECreateColumns,
	SchemaEntityECreateProperties,
	SchemaEntityEUpdateColumns,
	SchemaEntityEUpdateProperties,
	SchemaEntityEId,
	SchemaEntityECascadeGraph,
	QSchemaEntity
} from './schema/qschemaentity'
import {
	ISchemaProperty
} from './schema/schemaproperty'
import {
	SchemaPropertyESelect,
	SchemaPropertyECreateColumns,
	SchemaPropertyECreateProperties,
	SchemaPropertyEUpdateColumns,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyEId,
	SchemaPropertyECascadeGraph,
	QSchemaProperty
} from './schema/qschemaproperty'
import {
	ISchemaPropertyColumn
} from './schema/schemapropertycolumn'
import {
	SchemaPropertyColumnESelect,
	SchemaPropertyColumnECreateColumns,
	SchemaPropertyColumnECreateProperties,
	SchemaPropertyColumnEUpdateColumns,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnEId,
	SchemaPropertyColumnECascadeGraph,
	QSchemaPropertyColumn
} from './schema/qschemapropertycolumn'
import {
	ISchemaReference
} from './schema/schemareference'
import {
	SchemaReferenceESelect,
	SchemaReferenceECreateColumns,
	SchemaReferenceECreateProperties,
	SchemaReferenceEUpdateColumns,
	SchemaReferenceEUpdateProperties,
	SchemaReferenceEId,
	SchemaReferenceECascadeGraph,
	QSchemaReference
} from './schema/qschemareference'
import {
	ISchemaRelation
} from './schema/schemarelation'
import {
	SchemaRelationESelect,
	SchemaRelationECreateColumns,
	SchemaRelationECreateProperties,
	SchemaRelationEUpdateColumns,
	SchemaRelationEUpdateProperties,
	SchemaRelationEId,
	SchemaRelationECascadeGraph,
	QSchemaRelation
} from './schema/qschemarelation'
import {
	ISchemaRelationColumn
} from './schema/schemarelationcolumn'
import {
	SchemaRelationColumnESelect,
	SchemaRelationColumnECreateColumns,
	SchemaRelationColumnECreateProperties,
	SchemaRelationColumnEUpdateColumns,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnEId,
	SchemaRelationColumnECascadeGraph,
	QSchemaRelationColumn
} from './schema/qschemarelationcolumn'
import {
	ISchemaVersion
} from './schema/schemaversion'
import {
	SchemaVersionESelect,
	SchemaVersionECreateColumns,
	SchemaVersionECreateProperties,
	SchemaVersionEUpdateColumns,
	SchemaVersionEUpdateProperties,
	SchemaVersionEId,
	SchemaVersionECascadeGraph,
	QSchemaVersion
} from './schema/qschemaversion'


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseSchemaDuo
  extends IDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema> {
}

export class BaseSchemaDuo
  extends SQDIDuo<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaECascadeGraph, QSchema>
	implements IBaseSchemaDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSchemaColumnDuo
  extends IDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn> {
}

export class BaseSchemaColumnDuo
  extends SQDIDuo<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnECascadeGraph, QSchemaColumn>
	implements IBaseSchemaColumnDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSchemaEntityDuo
  extends IDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity> {
}

export class BaseSchemaEntityDuo
  extends SQDIDuo<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityECascadeGraph, QSchemaEntity>
	implements IBaseSchemaEntityDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseSchemaPropertyDuo
  extends IDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty> {
}

export class BaseSchemaPropertyDuo
  extends SQDIDuo<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyECascadeGraph, QSchemaProperty>
	implements IBaseSchemaPropertyDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSchemaPropertyColumnDuo
  extends IDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn> {
}

export class BaseSchemaPropertyColumnDuo
  extends SQDIDuo<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnECascadeGraph, QSchemaPropertyColumn>
	implements IBaseSchemaPropertyColumnDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSchemaReferenceDuo
  extends IDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference> {
}

export class BaseSchemaReferenceDuo
  extends SQDIDuo<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceECascadeGraph, QSchemaReference>
	implements IBaseSchemaReferenceDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSchemaRelationDuo
  extends IDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation> {
}

export class BaseSchemaRelationDuo
  extends SQDIDuo<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationECascadeGraph, QSchemaRelation>
	implements IBaseSchemaRelationDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSchemaRelationColumnDuo
  extends IDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn> {
}

export class BaseSchemaRelationColumnDuo
  extends SQDIDuo<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnECascadeGraph, QSchemaRelationColumn>
	implements IBaseSchemaRelationColumnDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSchemaVersionDuo
  extends IDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion> {
}

export class BaseSchemaVersionDuo
  extends SQDIDuo<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionECascadeGraph, QSchemaVersion>
	implements IBaseSchemaVersionDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}
