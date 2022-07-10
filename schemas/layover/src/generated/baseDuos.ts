/* eslint-disable */
import {
	RecordUpdateStage,
} from '../ddl/recordupdatestage';
import {
	RecordUpdateStageESelect,
	RecordUpdateStageECreateColumns,
	RecordUpdateStageECreateProperties,
	RecordUpdateStageEUpdateColumns,
	RecordUpdateStageEUpdateProperties,
	RecordUpdateStageEId,
	RecordUpdateStageGraph,
	QRecordUpdateStage,
} from './qrecordupdatestage';
import {
	SynchronizationConflict,
} from '../ddl/conflict/synchronizationconflict';
import {
	SynchronizationConflictESelect,
	SynchronizationConflictECreateColumns,
	SynchronizationConflictECreateProperties,
	SynchronizationConflictEUpdateColumns,
	SynchronizationConflictEUpdateProperties,
	SynchronizationConflictEId,
	SynchronizationConflictGraph,
	QSynchronizationConflict,
} from './conflict/qsynchronizationconflict';
import {
	SynchronizationConflictValues,
} from '../ddl/conflict/synchronizationconflictvalues';
import {
	SynchronizationConflictValuesESelect,
	SynchronizationConflictValuesECreateColumns,
	SynchronizationConflictValuesECreateProperties,
	SynchronizationConflictValuesEUpdateColumns,
	SynchronizationConflictValuesEUpdateProperties,
	SynchronizationConflictValuesEId,
	SynchronizationConflictValuesGraph,
	QSynchronizationConflictValues,
} from './conflict/qsynchronizationconflictvalues';
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
	IDuo,
	Duo,
} from '@airport/tarmaq-dao';
import {
	ApplicationEntity_LocalId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qApplication';


// Application Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	ApplicationEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseRecordUpdateStageDuo
  extends IDuo<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage> {
}

export class BaseRecordUpdateStageDuo
  extends SQDIDuo<RecordUpdateStage, RecordUpdateStageESelect, RecordUpdateStageECreateProperties, RecordUpdateStageEUpdateColumns, RecordUpdateStageEUpdateProperties, RecordUpdateStageEId, RecordUpdateStageGraph, QRecordUpdateStage>
	implements IBaseRecordUpdateStageDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSynchronizationConflictDuo
  extends IDuo<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict> {
}

export class BaseSynchronizationConflictDuo
  extends SQDIDuo<SynchronizationConflict, SynchronizationConflictESelect, SynchronizationConflictECreateProperties, SynchronizationConflictEUpdateColumns, SynchronizationConflictEUpdateProperties, SynchronizationConflictEId, SynchronizationConflictGraph, QSynchronizationConflict>
	implements IBaseSynchronizationConflictDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseSynchronizationConflictValuesDuo
  extends IDuo<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues> {
}

export class BaseSynchronizationConflictValuesDuo
  extends SQDIDuo<SynchronizationConflictValues, SynchronizationConflictValuesESelect, SynchronizationConflictValuesECreateProperties, SynchronizationConflictValuesEUpdateColumns, SynchronizationConflictValuesEUpdateProperties, SynchronizationConflictValuesEId, SynchronizationConflictValuesGraph, QSynchronizationConflictValues>
	implements IBaseSynchronizationConflictValuesDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}
