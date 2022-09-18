/* eslint-disable */
import {
	Sequence,
} from '../ddl/Sequence';
import {
	SequenceESelect,
	SequenceECreateColumns,
	SequenceECreateProperties,
	SequenceEUpdateColumns,
	SequenceEUpdateProperties,
	SequenceEId,
	SequenceGraph,
	QSequence,
} from './query/QSequence';
import {
	SystemWideOperationId,
} from '../ddl/SystemWideOperationId';
import {
	SystemWideOperationIdESelect,
	SystemWideOperationIdECreateColumns,
	SystemWideOperationIdECreateProperties,
	SystemWideOperationIdEUpdateColumns,
	SystemWideOperationIdEUpdateProperties,
	SystemWideOperationIdEId,
	SystemWideOperationIdGraph,
	QSystemWideOperationId,
} from './query/QSystemWideOperationId';
import {
	TerminalRun,
} from '../ddl/TerminalRun';
import {
	TerminalRunESelect,
	TerminalRunECreateColumns,
	TerminalRunECreateProperties,
	TerminalRunEUpdateColumns,
	TerminalRunEUpdateProperties,
	TerminalRunEId,
	TerminalRunGraph,
	QTerminalRun,
} from './query/QTerminalRun';
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
	airport____at_airport_slash_airport_dash_code_diSet,
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


export interface IBaseSequenceDao
  extends IDao<Sequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence> {
}

export class BaseSequenceDao
  extends SQDIDao<Sequence, SequenceESelect, SequenceECreateProperties, SequenceEUpdateColumns, SequenceEUpdateProperties, SequenceEId, SequenceGraph, QSequence>
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
		return airport____at_airport_slash_airport_dash_code_diSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseSystemWideOperationIdDao
  extends IDao<SystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId> {
}

export class BaseSystemWideOperationIdDao
  extends SQDIDao<SystemWideOperationId, SystemWideOperationIdESelect, SystemWideOperationIdECreateProperties, SystemWideOperationIdEUpdateColumns, SystemWideOperationIdEUpdateProperties, SystemWideOperationIdEId, SystemWideOperationIdGraph, QSystemWideOperationId>
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
		return airport____at_airport_slash_airport_dash_code_diSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseTerminalRunDao
  extends IDao<TerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun> {
}

export class BaseTerminalRunDao
  extends SQDIDao<TerminalRun, TerminalRunESelect, TerminalRunECreateProperties, TerminalRunEUpdateColumns, TerminalRunEUpdateProperties, TerminalRunEId, TerminalRunGraph, QTerminalRun>
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
		return airport____at_airport_slash_airport_dash_code_diSet(2)
	}
	
	constructor() {
		super(2)
	}
}
