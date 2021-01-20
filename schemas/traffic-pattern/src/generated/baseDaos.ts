/* eslint-disable */
import {
	ISchema,
} from './schema/schema';
import {
	SchemaESelect,
	SchemaECreateColumns,
	SchemaECreateProperties,
	SchemaEUpdateColumns,
	SchemaEUpdateProperties,
	SchemaEId,
	SchemaGraph,
	QSchema,
} from './schema/qschema';
import {
	ISchemaColumn,
} from './schema/schemacolumn';
import {
	SchemaColumnESelect,
	SchemaColumnECreateColumns,
	SchemaColumnECreateProperties,
	SchemaColumnEUpdateColumns,
	SchemaColumnEUpdateProperties,
	SchemaColumnEId,
	SchemaColumnGraph,
	QSchemaColumn,
} from './schema/qschemacolumn';
import {
	ISchemaEntity,
} from './schema/schemaentity';
import {
	SchemaEntityESelect,
	SchemaEntityECreateColumns,
	SchemaEntityECreateProperties,
	SchemaEntityEUpdateColumns,
	SchemaEntityEUpdateProperties,
	SchemaEntityEId,
	SchemaEntityGraph,
	QSchemaEntity,
} from './schema/qschemaentity';
import {
	ISchemaOperation,
} from './schema/schemaoperation';
import {
	SchemaOperationESelect,
	SchemaOperationECreateColumns,
	SchemaOperationECreateProperties,
	SchemaOperationEUpdateColumns,
	SchemaOperationEUpdateProperties,
	SchemaOperationEId,
	SchemaOperationGraph,
	QSchemaOperation,
} from './schema/qschemaoperation';
import {
	ISchemaProperty,
} from './schema/schemaproperty';
import {
	SchemaPropertyESelect,
	SchemaPropertyECreateColumns,
	SchemaPropertyECreateProperties,
	SchemaPropertyEUpdateColumns,
	SchemaPropertyEUpdateProperties,
	SchemaPropertyEId,
	SchemaPropertyGraph,
	QSchemaProperty,
} from './schema/qschemaproperty';
import {
	ISchemaPropertyColumn,
} from './schema/schemapropertycolumn';
import {
	SchemaPropertyColumnESelect,
	SchemaPropertyColumnECreateColumns,
	SchemaPropertyColumnECreateProperties,
	SchemaPropertyColumnEUpdateColumns,
	SchemaPropertyColumnEUpdateProperties,
	SchemaPropertyColumnEId,
	SchemaPropertyColumnGraph,
	QSchemaPropertyColumn,
} from './schema/qschemapropertycolumn';
import {
	ISchemaReference,
} from './schema/schemareference';
import {
	SchemaReferenceESelect,
	SchemaReferenceECreateColumns,
	SchemaReferenceECreateProperties,
	SchemaReferenceEUpdateColumns,
	SchemaReferenceEUpdateProperties,
	SchemaReferenceEId,
	SchemaReferenceGraph,
	QSchemaReference,
} from './schema/qschemareference';
import {
	ISchemaRelation,
} from './schema/schemarelation';
import {
	SchemaRelationESelect,
	SchemaRelationECreateColumns,
	SchemaRelationECreateProperties,
	SchemaRelationEUpdateColumns,
	SchemaRelationEUpdateProperties,
	SchemaRelationEId,
	SchemaRelationGraph,
	QSchemaRelation,
} from './schema/qschemarelation';
import {
	ISchemaRelationColumn,
} from './schema/schemarelationcolumn';
import {
	SchemaRelationColumnESelect,
	SchemaRelationColumnECreateColumns,
	SchemaRelationColumnECreateProperties,
	SchemaRelationColumnEUpdateColumns,
	SchemaRelationColumnEUpdateProperties,
	SchemaRelationColumnEId,
	SchemaRelationColumnGraph,
	QSchemaRelationColumn,
} from './schema/qschemarelationcolumn';
import {
	ISchemaVersion,
} from './schema/schemaversion';
import {
	SchemaVersionESelect,
	SchemaVersionECreateColumns,
	SchemaVersionECreateProperties,
	SchemaVersionEUpdateColumns,
	SchemaVersionEUpdateProperties,
	SchemaVersionEId,
	SchemaVersionGraph,
	QSchemaVersion,
} from './schema/qschemaversion';
import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Dao,
	DaoQueryDecorators,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
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
  extends IDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema> {
}

export class BaseSchemaDao
  extends SQDIDao<ISchema, SchemaESelect, SchemaECreateProperties, SchemaEUpdateColumns, SchemaEUpdateProperties, SchemaEId, SchemaGraph, QSchema>
	implements IBaseSchemaDao {
	
	static Find      = new DaoQueryDecorators<SchemaESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaESelect>();
  static Search    = new DaoQueryDecorators<SchemaESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaESelect>();

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseSchemaColumnDao
  extends IDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn> {
}

export class BaseSchemaColumnDao
  extends SQDIDao<ISchemaColumn, SchemaColumnESelect, SchemaColumnECreateProperties, SchemaColumnEUpdateColumns, SchemaColumnEUpdateProperties, SchemaColumnEId, SchemaColumnGraph, QSchemaColumn>
	implements IBaseSchemaColumnDao {
	
	static Find      = new DaoQueryDecorators<SchemaColumnESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaColumnESelect>();
  static Search    = new DaoQueryDecorators<SchemaColumnESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaColumnESelect>();

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSchemaEntityDao
  extends IDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity> {
}

export class BaseSchemaEntityDao
  extends SQDIDao<ISchemaEntity, SchemaEntityESelect, SchemaEntityECreateProperties, SchemaEntityEUpdateColumns, SchemaEntityEUpdateProperties, SchemaEntityEId, SchemaEntityGraph, QSchemaEntity>
	implements IBaseSchemaEntityDao {
	
	static Find      = new DaoQueryDecorators<SchemaEntityESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaEntityESelect>();
  static Search    = new DaoQueryDecorators<SchemaEntityESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaEntityESelect>();

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseSchemaOperationDao
  extends IDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation> {
}

export class BaseSchemaOperationDao
  extends SQDIDao<ISchemaOperation, SchemaOperationESelect, SchemaOperationECreateProperties, SchemaOperationEUpdateColumns, SchemaOperationEUpdateProperties, SchemaOperationEId, SchemaOperationGraph, QSchemaOperation>
	implements IBaseSchemaOperationDao {
	
	static Find      = new DaoQueryDecorators<SchemaOperationESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaOperationESelect>();
  static Search    = new DaoQueryDecorators<SchemaOperationESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaOperationESelect>();

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseSchemaPropertyDao
  extends IDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty> {
}

export class BaseSchemaPropertyDao
  extends SQDIDao<ISchemaProperty, SchemaPropertyESelect, SchemaPropertyECreateProperties, SchemaPropertyEUpdateColumns, SchemaPropertyEUpdateProperties, SchemaPropertyEId, SchemaPropertyGraph, QSchemaProperty>
	implements IBaseSchemaPropertyDao {
	
	static Find      = new DaoQueryDecorators<SchemaPropertyESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaPropertyESelect>();
  static Search    = new DaoQueryDecorators<SchemaPropertyESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaPropertyESelect>();

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSchemaPropertyColumnDao
  extends IDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn> {
}

export class BaseSchemaPropertyColumnDao
  extends SQDIDao<ISchemaPropertyColumn, SchemaPropertyColumnESelect, SchemaPropertyColumnECreateProperties, SchemaPropertyColumnEUpdateColumns, SchemaPropertyColumnEUpdateProperties, SchemaPropertyColumnEId, SchemaPropertyColumnGraph, QSchemaPropertyColumn>
	implements IBaseSchemaPropertyColumnDao {
	
	static Find      = new DaoQueryDecorators<SchemaPropertyColumnESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaPropertyColumnESelect>();
  static Search    = new DaoQueryDecorators<SchemaPropertyColumnESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaPropertyColumnESelect>();

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSchemaReferenceDao
  extends IDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference> {
}

export class BaseSchemaReferenceDao
  extends SQDIDao<ISchemaReference, SchemaReferenceESelect, SchemaReferenceECreateProperties, SchemaReferenceEUpdateColumns, SchemaReferenceEUpdateProperties, SchemaReferenceEId, SchemaReferenceGraph, QSchemaReference>
	implements IBaseSchemaReferenceDao {
	
	static Find      = new DaoQueryDecorators<SchemaReferenceESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaReferenceESelect>();
  static Search    = new DaoQueryDecorators<SchemaReferenceESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaReferenceESelect>();

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseSchemaRelationDao
  extends IDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation> {
}

export class BaseSchemaRelationDao
  extends SQDIDao<ISchemaRelation, SchemaRelationESelect, SchemaRelationECreateProperties, SchemaRelationEUpdateColumns, SchemaRelationEUpdateProperties, SchemaRelationEId, SchemaRelationGraph, QSchemaRelation>
	implements IBaseSchemaRelationDao {
	
	static Find      = new DaoQueryDecorators<SchemaRelationESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaRelationESelect>();
  static Search    = new DaoQueryDecorators<SchemaRelationESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaRelationESelect>();

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseSchemaRelationColumnDao
  extends IDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn> {
}

export class BaseSchemaRelationColumnDao
  extends SQDIDao<ISchemaRelationColumn, SchemaRelationColumnESelect, SchemaRelationColumnECreateProperties, SchemaRelationColumnEUpdateColumns, SchemaRelationColumnEUpdateProperties, SchemaRelationColumnEId, SchemaRelationColumnGraph, QSchemaRelationColumn>
	implements IBaseSchemaRelationColumnDao {
	
	static Find      = new DaoQueryDecorators<SchemaRelationColumnESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaRelationColumnESelect>();
  static Search    = new DaoQueryDecorators<SchemaRelationColumnESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaRelationColumnESelect>();

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSchemaVersionDao
  extends IDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion> {
}

export class BaseSchemaVersionDao
  extends SQDIDao<ISchemaVersion, SchemaVersionESelect, SchemaVersionECreateProperties, SchemaVersionEUpdateColumns, SchemaVersionEUpdateProperties, SchemaVersionEId, SchemaVersionGraph, QSchemaVersion>
	implements IBaseSchemaVersionDao {
	
	static Find      = new DaoQueryDecorators<SchemaVersionESelect>();
  static FindOne   = new DaoQueryDecorators<SchemaVersionESelect>();
  static Search    = new DaoQueryDecorators<SchemaVersionESelect>();
  static SearchOne = new DaoQueryDecorators<SchemaVersionESelect>();

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}
