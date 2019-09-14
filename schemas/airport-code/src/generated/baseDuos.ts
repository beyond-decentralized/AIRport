import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from "@airport/check-in"
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	ISequence,
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	SequenceECascadeGraph,
	QSequence
} from './qsequence'
import {
	ISystemWideOperationId,
	SystemWideOperationIdESelect,
	SystemWideOperationIdECreateColumns,
	SystemWideOperationIdECreateProperties,
	SystemWideOperationIdEUpdateColumns,
	SystemWideOperationIdEUpdateProperties,
	SystemWideOperationIdEId,
	SystemWideOperationIdECascadeGraph,
	QSystemWideOperationId
} from './qsystemwideoperationid'
import {
	ITerminalRun,
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	TerminalRunECascadeGraph,
	QTerminalRun
} from './qterminalrun'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
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
  extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, SequenceECascadeGraph, QSequence> {
}

export class BaseSequenceDuo
  extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, SequenceECascadeGraph, QSequence>
	implements IBaseSequenceDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDuo
  extends IDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdECascadeGraph, QSystemWideOperationId> {
}

export class BaseSystemWideOperationIdDuo
  extends SQDIDuo<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdECascadeGraph, QSystemWideOperationId>
	implements IBaseSystemWideOperationIdDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalRunDuo
  extends IDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunECascadeGraph, QTerminalRun> {
}

export class BaseTerminalRunDuo
  extends SQDIDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunECascadeGraph, QTerminalRun>
	implements IBaseTerminalRunDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}
