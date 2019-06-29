import {
	IDuo,
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
	QSequence
} from './qsequence'
import {
	ISequenceBlock,
	SequenceBlockESelect,
	SequenceBlockECreateColumns,
	SequenceBlockECreateProperties,
	SequenceBlockEUpdateColumns,
	SequenceBlockEUpdateProperties,
	SequenceBlockEId,
	QSequenceBlock
} from './qsequenceblock'
import {
	ITerminalRun,
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	QTerminalRun
} from './qterminalrun'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	constructor(
		dbEntityId: DbEntityId
	) {
		super(dbEntityId, Q)
	}
}


export interface IBaseSequenceDuo
  extends IDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDuo
  extends SQDIDuo<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSequenceBlockDuo
  extends IDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDuo
  extends SQDIDuo<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseTerminalRunDuo
  extends IDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> {
}

export class BaseTerminalRunDuo
  extends SQDIDuo<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun>
	implements IBaseTerminalRunDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}
