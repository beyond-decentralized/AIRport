/* eslint-disable */
import {
	RecordUpdateStage,
} from '../ddl/RecordUpdateStage';
import {
	RecordUpdateStageESelect,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	RecordUpdateStageGraph,
	QRecordUpdateStage,
} from './query/QRecordUpdateStage';
import {
	SynchronizationConflict,
} from '../ddl/conflict/SynchronizationConflict';
import {
	SynchronizationConflictESelect,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	SynchronizationConflictGraph,
	QSynchronizationConflict,
} from './query/conflict/QSynchronizationConflict';
import {
	SynchronizationConflictValues,
} from '../ddl/conflict/SynchronizationConflictValues';
import {
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesGraph,
	QSynchronizationConflictValues,
} from './query/conflict/QSynchronizationConflictValues';
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/tarmaq-query';
import {
	IDao,
	Dao,
	DaoQueryDecorators,
} from '@airport/tarmaq-dao';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	airport____at_airport_slash_layover_diSet,
} from './qApplication';

import Q from './qApplication'

// Application Q object Dependency Injection readiness detection Dao
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		ApplicationEntity_LocalId,
		EntityCascadeGraph,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseRecordUpdateStageDao
  extends IDao<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDao
  extends SQDIDao<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDao {
	
	static Find      = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static FindOne   = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static Search    = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static SearchOne = new DaoQueryDecorators<RecordUpdateStageESelect>();
	static Save(
		config: RecordUpdateStageGraph
	): PropertyDecorator {
		return Dao.BaseSave<RecordUpdateStageGraph>(config);
  }

	static diSet(): boolean {
		return airport____at_airport_slash_layover_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSynchronizationConflictDao
  extends IDao<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDao
  extends SQDIDao<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDao {
	
	static Find      = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static FindOne   = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static Search    = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static SearchOne = new DaoQueryDecorators<SynchronizationConflictESelect>();
	static Save(
		config: SynchronizationConflictGraph
	): PropertyDecorator {
		return Dao.BaseSave<SynchronizationConflictGraph>(config);
  }

	static diSet(): boolean {
		return airport____at_airport_slash_layover_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDao
  extends IDao<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDao
  extends SQDIDao<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDao {
	
	static Find      = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static FindOne   = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static Search    = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static SearchOne = new DaoQueryDecorators<SynchronizationConflictValuesESelect>();
	static Save(
		config: SynchronizationConflictValuesGraph
	): PropertyDecorator {
		return Dao.BaseSave<SynchronizationConflictValuesGraph>(config);
  }

	static diSet(): boolean {
		return airport____at_airport_slash_layover_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}
