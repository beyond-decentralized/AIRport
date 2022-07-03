/* eslint-disable */
import {
	Actor,
} from '../ddl/infrastructure/actor';
import {
	ActorESelect,
	ActorECreateColumns,
	ActorECreateProperties,
	ActorEUpdateColumns,
	ActorEUpdateProperties,
	ActorEId,
	ActorGraph,
	QActor,
} from './infrastructure/qactor';
import {
	OperationHistory,
} from '../ddl/history/operationhistory';
import {
	OperationHistoryESelect,
	OperationHistoryECreateColumns,
	OperationHistoryECreateProperties,
	OperationHistoryEUpdateColumns,
	OperationHistoryEUpdateProperties,
	OperationHistoryEId,
	OperationHistoryGraph,
	QOperationHistory,
} from './history/qoperationhistory';
import {
	RecordHistory,
} from '../ddl/history/recordhistory';
import {
	RecordHistoryESelect,
	RecordHistoryECreateColumns,
	RecordHistoryECreateProperties,
	RecordHistoryEUpdateColumns,
	RecordHistoryEUpdateProperties,
	RecordHistoryEId,
	RecordHistoryGraph,
	QRecordHistory,
} from './history/qrecordhistory';
import {
	RecordHistoryNewValue,
} from '../ddl/history/recordhistorynewvalue';
import {
	RecordHistoryNewValueESelect,
	RecordHistoryNewValueECreateColumns,
	RecordHistoryNewValueECreateProperties,
	RecordHistoryNewValueEUpdateColumns,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueEId,
	RecordHistoryNewValueGraph,
	QRecordHistoryNewValue,
} from './history/qrecordhistorynewvalue';
import {
	RecordHistoryOldValue,
} from '../ddl/history/recordhistoryoldvalue';
import {
	RecordHistoryOldValueESelect,
	RecordHistoryOldValueECreateColumns,
	RecordHistoryOldValueECreateProperties,
	RecordHistoryOldValueEUpdateColumns,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueEId,
	RecordHistoryOldValueGraph,
	QRecordHistoryOldValue,
} from './history/qrecordhistoryoldvalue';
import {
	Repository,
} from '../ddl/repository/repository';
import {
	RepositoryESelect,
	RepositoryECreateColumns,
	RepositoryECreateProperties,
	RepositoryEUpdateColumns,
	RepositoryEUpdateProperties,
	RepositoryEId,
	RepositoryGraph,
	QRepository,
} from './repository/qrepository';
import {
	RepositoryApplication,
} from '../ddl/repository/repositoryapplication';
import {
	RepositoryApplicationESelect,
	RepositoryApplicationECreateColumns,
	RepositoryApplicationECreateProperties,
	RepositoryApplicationEUpdateColumns,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationEId,
	RepositoryApplicationGraph,
	QRepositoryApplication,
} from './repository/qrepositoryapplication';
import {
	RepositoryClient,
} from '../ddl/repository/repositoryclient';
import {
	RepositoryClientESelect,
	RepositoryClientECreateColumns,
	RepositoryClientECreateProperties,
	RepositoryClientEUpdateColumns,
	RepositoryClientEUpdateProperties,
	RepositoryClientEId,
	RepositoryClientGraph,
	QRepositoryClient,
} from './repository/qrepositoryclient';
import {
	RepositoryDatabase,
} from '../ddl/repository/repositorydatabase';
import {
	RepositoryDatabaseESelect,
	RepositoryDatabaseECreateColumns,
	RepositoryDatabaseECreateProperties,
	RepositoryDatabaseEUpdateColumns,
	RepositoryDatabaseEUpdateProperties,
	RepositoryDatabaseEId,
	RepositoryDatabaseGraph,
	QRepositoryDatabase,
} from './repository/qrepositorydatabase';
import {
	RepositoryTerminal,
} from '../ddl/repository/repositoryterminal';
import {
	RepositoryTerminalESelect,
	RepositoryTerminalECreateColumns,
	RepositoryTerminalECreateProperties,
	RepositoryTerminalEUpdateColumns,
	RepositoryTerminalEUpdateProperties,
	RepositoryTerminalEId,
	RepositoryTerminalGraph,
	QRepositoryTerminal,
} from './repository/qrepositoryterminal';
import {
	RepositoryTransactionHistory,
} from '../ddl/history/repositorytransactionhistory';
import {
	RepositoryTransactionHistoryESelect,
	RepositoryTransactionHistoryECreateColumns,
	RepositoryTransactionHistoryECreateProperties,
	RepositoryTransactionHistoryEUpdateColumns,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryGraph,
	QRepositoryTransactionHistory,
} from './history/qrepositorytransactionhistory';
import {
	RepositoryType,
} from '../ddl/repository/repositorytype';
import {
	RepositoryTypeESelect,
	RepositoryTypeECreateColumns,
	RepositoryTypeECreateProperties,
	RepositoryTypeEUpdateColumns,
	RepositoryTypeEUpdateProperties,
	RepositoryTypeEId,
	RepositoryTypeGraph,
	QRepositoryType,
} from './repository/qrepositorytype';
import {
	TransactionHistory,
} from '../ddl/history/transactionhistory';
import {
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	TransactionHistoryGraph,
	QTransactionHistory,
} from './history/qtransactionhistory';
import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-traffic-control';
import {
	Duo,
} from '@airport/check-in';
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


export interface IBaseActorDuo
  extends IDuo<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}

export class BaseActorDuo
  extends SQDIDuo<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor>
	implements IBaseActorDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseOperationHistoryDuo
  extends IDuo<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}

export class BaseOperationHistoryDuo
  extends SQDIDuo<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory>
	implements IBaseOperationHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRecordHistoryDuo
  extends IDuo<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}

export class BaseRecordHistoryDuo
  extends SQDIDuo<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory>
	implements IBaseRecordHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRecordHistoryNewValueDuo
  extends IDuo<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDuo
  extends SQDIDuo<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseRecordHistoryOldValueDuo
  extends IDuo<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDuo
  extends SQDIDuo<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository>
	implements IBaseRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryApplicationDuo
  extends IDuo<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDuo
  extends SQDIDuo<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication>
	implements IBaseRepositoryApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryClientDuo
  extends IDuo<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> {
}

export class BaseRepositoryClientDuo
  extends SQDIDuo<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient>
	implements IBaseRepositoryClientDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepositoryDatabaseDuo
  extends IDuo<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> {
}

export class BaseRepositoryDatabaseDuo
  extends SQDIDuo<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase>
	implements IBaseRepositoryDatabaseDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepositoryTerminalDuo
  extends IDuo<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> {
}

export class BaseRepositoryTerminalDuo
  extends SQDIDuo<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal>
	implements IBaseRepositoryTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryTransactionHistoryDuo
  extends IDuo<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDuo
  extends SQDIDuo<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTypeDuo
  extends IDuo<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> {
}

export class BaseRepositoryTypeDuo
  extends SQDIDuo<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType>
	implements IBaseRepositoryTypeDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseTransactionHistoryDuo
  extends IDuo<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}

export class BaseTransactionHistoryDuo
  extends SQDIDuo<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory>
	implements IBaseTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}
