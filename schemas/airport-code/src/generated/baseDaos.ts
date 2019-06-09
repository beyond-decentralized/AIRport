import {
	IDao,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
import {
	ISequence,
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	QSequence
} from './qsequence';
import {
	ISequenceBlock,
	SequenceBlockESelect,
	SequenceBlockECreateColumns,
	SequenceBlockECreateProperties,
	SequenceBlockEUpdateColumns,
	SequenceBlockEUpdateProperties,
	SequenceBlockEId,
	QSequenceBlock
} from './qsequenceblock';
import {
	ITerminalRun,
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	QTerminalRun
} from './qterminalrun';

// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Dao<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateColumns,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.__dbSchema__ as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseSequenceDao
  extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence> {
}

export class BaseSequenceDao
  extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, QSequence>
	implements IBaseSequenceDao {
	constructor() {
		super('Sequence')
	}
}


export interface IBaseSequenceBlockDao
  extends IDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock> {
}

export class BaseSequenceBlockDao
  extends SQDIDao<ISequenceBlock, SequenceBlockESelect, SequenceBlockECreateProperties, SequenceBlockEUpdateColumns, SequenceBlockEUpdateProperties, SequenceBlockEId, QSequenceBlock>
	implements IBaseSequenceBlockDao {
	constructor() {
		super('SequenceBlock')
	}
}


export interface IBaseTerminalRunDao
  extends IDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun> {
}

export class BaseTerminalRunDao
  extends SQDIDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, QTerminalRun>
	implements IBaseTerminalRunDao {
	constructor() {
		super('TerminalRun')
	}
}
