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
	ISequence,
	SequenceESelect,
	SequenceECascadeGraph,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	QSequence
} from './qsequence'
import {
	ISystemWideOperationId,
	SystemWideOperationIdESelect,
	SystemWideOperationIdECascadeGraph,
	SystemWideOperationIdECreateColumns,
	SystemWideOperationIdECreateProperties,
	SystemWideOperationIdEUpdateColumns,
	SystemWideOperationIdEUpdateProperties,
	SystemWideOperationIdEId,
	QSystemWideOperationId
} from './qsystemwideoperationid'
import {
	ITerminalRun,
	TerminalRunESelect,
	TerminalRunECascadeGraph,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	QTerminalRun
} from './qterminalrun'

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


export interface IBaseSequenceDao
  extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceECascadeGraph, QSequence> {
}

export class BaseSequenceDao
  extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceECascadeGraph, QSequence>
	implements IBaseSequenceDao {

	static diSet(): boolean {
		return diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDao
  extends IDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdECascadeGraph, QSystemWideOperationId> {
}

export class BaseSystemWideOperationIdDao
  extends SQDIDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdECascadeGraph, QSystemWideOperationId>
	implements IBaseSystemWideOperationIdDao {

	static diSet(): boolean {
		return diSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalRunDao
  extends IDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunECascadeGraph, QTerminalRun> {
}

export class BaseTerminalRunDao
  extends SQDIDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunECascadeGraph, QTerminalRun>
	implements IBaseTerminalRunDao {

	static diSet(): boolean {
		return diSet(1)
	}
	
	constructor() {
		super(1)
	}
}
