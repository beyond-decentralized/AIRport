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
	ISequence
} from './sequence'
import {
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	SequenceGraph,
	QSequence
} from './qsequence'
import {
	ISystemWideOperationId
} from './systemwideoperationid'
import {
	SystemWideOperationIdESelect,
	SystemWideOperationIdECreateColumns,
	SystemWideOperationIdECreateProperties,
	SystemWideOperationIdEUpdateColumns,
	SystemWideOperationIdEUpdateProperties,
	SystemWideOperationIdEId,
	SystemWideOperationIdGraph,
	QSystemWideOperationId
} from './qsystemwideoperationid'
import {
	ITerminalRun
} from './terminalrun'
import {
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	TerminalRunGraph,
	QTerminalRun
} from './qterminalrun'


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


export interface IBaseSequenceDuo
  extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> {
}

export class BaseSequenceDuo
  extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence>
	implements IBaseSequenceDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDuo
  extends IDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> {
}

export class BaseSystemWideOperationIdDuo
  extends SQDIDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId>
	implements IBaseSystemWideOperationIdDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalRunDuo
  extends IDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> {
}

export class BaseTerminalRunDuo
  extends SQDIDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun>
	implements IBaseTerminalRunDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}
