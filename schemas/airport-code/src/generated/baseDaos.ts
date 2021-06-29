/* eslint-disable */
import {
	ISequence,
} from './sequence';
import {
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	SequenceGraph,
	QSequence,
} from './qsequence';
import {
	ISystemWideOperationId,
} from './systemwideoperationid';
import {
	SystemWideOperationIdESelect,
	SystemWideOperationIdECreateColumns,
	SystemWideOperationIdECreateProperties,
	SystemWideOperationIdEUpdateColumns,
	SystemWideOperationIdEUpdateProperties,
	SystemWideOperationIdEId,
	SystemWideOperationIdGraph,
	QSystemWideOperationId,
} from './qsystemwideoperationid';
import {
	ITerminalRun,
} from './terminalrun';
import {
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	TerminalRunGraph,
	QTerminalRun,
} from './qterminalrun';
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


export interface IBaseSequenceDao
  extends IDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> {
}

export class BaseSequenceDao
  extends SQDIDao<ISequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence>
	implements IBaseSequenceDao {
	
	static Find      = new DaoQueryDecorators<SequenceESelect>();
	static FindOne   = new DaoQueryDecorators<SequenceESelect>();
	static Search    = new DaoQueryDecorators<SequenceESelect>();
	static SearchOne = new DaoQueryDecorators<SequenceESelect>();
	static Save(
		config: SequenceGraph
	): PropertyDecorator {
		return Dao.BaseSave<SequenceGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDao
  extends IDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> {
}

export class BaseSystemWideOperationIdDao
  extends SQDIDao<ISystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId>
	implements IBaseSystemWideOperationIdDao {
	
	static Find      = new DaoQueryDecorators<SystemWideOperationIdESelect>();
	static FindOne   = new DaoQueryDecorators<SystemWideOperationIdESelect>();
	static Search    = new DaoQueryDecorators<SystemWideOperationIdESelect>();
	static SearchOne = new DaoQueryDecorators<SystemWideOperationIdESelect>();
	static Save(
		config: SystemWideOperationIdGraph
	): PropertyDecorator {
		return Dao.BaseSave<SystemWideOperationIdGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalRunDao
  extends IDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> {
}

export class BaseTerminalRunDao
  extends SQDIDao<ITerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun>
	implements IBaseTerminalRunDao {
	
	static Find      = new DaoQueryDecorators<TerminalRunESelect>();
	static FindOne   = new DaoQueryDecorators<TerminalRunESelect>();
	static Search    = new DaoQueryDecorators<TerminalRunESelect>();
	static SearchOne = new DaoQueryDecorators<TerminalRunESelect>();
	static Save(
		config: TerminalRunGraph
	): PropertyDecorator {
		return Dao.BaseSave<TerminalRunGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}
