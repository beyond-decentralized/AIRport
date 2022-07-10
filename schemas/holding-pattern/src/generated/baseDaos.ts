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
	Q,
	duoDiSet,
} from './qApplication';


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


export interface IBaseActorDao
  extends IDao<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}

export class BaseActorDao
  extends SQDIDao<Actor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor>
	implements IBaseActorDao {
	
	static Find      = new DaoQueryDecorators<ActorESelect>();
	static FindOne   = new DaoQueryDecorators<ActorESelect>();
	static Search    = new DaoQueryDecorators<ActorESelect>();
	static SearchOne = new DaoQueryDecorators<ActorESelect>();
	static Save(
		config: ActorGraph
	): PropertyDecorator {
		return Dao.BaseSave<ActorGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseOperationHistoryDao
  extends IDao<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}

export class BaseOperationHistoryDao
  extends SQDIDao<OperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory>
	implements IBaseOperationHistoryDao {
	
	static Find      = new DaoQueryDecorators<OperationHistoryESelect>();
	static FindOne   = new DaoQueryDecorators<OperationHistoryESelect>();
	static Search    = new DaoQueryDecorators<OperationHistoryESelect>();
	static SearchOne = new DaoQueryDecorators<OperationHistoryESelect>();
	static Save(
		config: OperationHistoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<OperationHistoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRecordHistoryDao
  extends IDao<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}

export class BaseRecordHistoryDao
  extends SQDIDao<RecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory>
	implements IBaseRecordHistoryDao {
	
	static Find      = new DaoQueryDecorators<RecordHistoryESelect>();
	static FindOne   = new DaoQueryDecorators<RecordHistoryESelect>();
	static Search    = new DaoQueryDecorators<RecordHistoryESelect>();
	static SearchOne = new DaoQueryDecorators<RecordHistoryESelect>();
	static Save(
		config: RecordHistoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<RecordHistoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRecordHistoryNewValueDao
  extends IDao<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDao
  extends SQDIDao<RecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDao {
	
	static Find      = new DaoQueryDecorators<RecordHistoryNewValueESelect>();
	static FindOne   = new DaoQueryDecorators<RecordHistoryNewValueESelect>();
	static Search    = new DaoQueryDecorators<RecordHistoryNewValueESelect>();
	static SearchOne = new DaoQueryDecorators<RecordHistoryNewValueESelect>();
	static Save(
		config: RecordHistoryNewValueGraph
	): PropertyDecorator {
		return Dao.BaseSave<RecordHistoryNewValueGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseRecordHistoryOldValueDao
  extends IDao<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDao
  extends SQDIDao<RecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDao {
	
	static Find      = new DaoQueryDecorators<RecordHistoryOldValueESelect>();
	static FindOne   = new DaoQueryDecorators<RecordHistoryOldValueESelect>();
	static Search    = new DaoQueryDecorators<RecordHistoryOldValueESelect>();
	static SearchOne = new DaoQueryDecorators<RecordHistoryOldValueESelect>();
	static Save(
		config: RecordHistoryOldValueGraph
	): PropertyDecorator {
		return Dao.BaseSave<RecordHistoryOldValueGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositoryDao
  extends IDao<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}

export class BaseRepositoryDao
  extends SQDIDao<Repository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository>
	implements IBaseRepositoryDao {
	
	static Find      = new DaoQueryDecorators<RepositoryESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryESelect>();
	static Search    = new DaoQueryDecorators<RepositoryESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryESelect>();
	static Save(
		config: RepositoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryApplicationDao
  extends IDao<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDao
  extends SQDIDao<RepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication>
	implements IBaseRepositoryApplicationDao {
	
	static Find      = new DaoQueryDecorators<RepositoryApplicationESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryApplicationESelect>();
	static Search    = new DaoQueryDecorators<RepositoryApplicationESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryApplicationESelect>();
	static Save(
		config: RepositoryApplicationGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryApplicationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryClientDao
  extends IDao<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient> {
}

export class BaseRepositoryClientDao
  extends SQDIDao<RepositoryClient, RepositoryClientESelect, RepositoryClientECreateProperties, RepositoryClientEUpdateColumns, RepositoryClientEUpdateProperties, RepositoryClientEId, RepositoryClientGraph, QRepositoryClient>
	implements IBaseRepositoryClientDao {
	
	static Find      = new DaoQueryDecorators<RepositoryClientESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryClientESelect>();
	static Search    = new DaoQueryDecorators<RepositoryClientESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryClientESelect>();
	static Save(
		config: RepositoryClientGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryClientGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRepositoryDatabaseDao
  extends IDao<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase> {
}

export class BaseRepositoryDatabaseDao
  extends SQDIDao<RepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreateProperties, RepositoryDatabaseEUpdateColumns, RepositoryDatabaseEUpdateProperties, RepositoryDatabaseEId, RepositoryDatabaseGraph, QRepositoryDatabase>
	implements IBaseRepositoryDatabaseDao {
	
	static Find      = new DaoQueryDecorators<RepositoryDatabaseESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryDatabaseESelect>();
	static Search    = new DaoQueryDecorators<RepositoryDatabaseESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryDatabaseESelect>();
	static Save(
		config: RepositoryDatabaseGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryDatabaseGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepositoryTerminalDao
  extends IDao<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal> {
}

export class BaseRepositoryTerminalDao
  extends SQDIDao<RepositoryTerminal, RepositoryTerminalESelect, RepositoryTerminalECreateProperties, RepositoryTerminalEUpdateColumns, RepositoryTerminalEUpdateProperties, RepositoryTerminalEId, RepositoryTerminalGraph, QRepositoryTerminal>
	implements IBaseRepositoryTerminalDao {
	
	static Find      = new DaoQueryDecorators<RepositoryTerminalESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryTerminalESelect>();
	static Search    = new DaoQueryDecorators<RepositoryTerminalESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryTerminalESelect>();
	static Save(
		config: RepositoryTerminalGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryTerminalGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryTransactionHistoryDao
  extends IDao<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDao
  extends SQDIDao<RepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDao {
	
	static Find      = new DaoQueryDecorators<RepositoryTransactionHistoryESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryTransactionHistoryESelect>();
	static Search    = new DaoQueryDecorators<RepositoryTransactionHistoryESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryTransactionHistoryESelect>();
	static Save(
		config: RepositoryTransactionHistoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryTransactionHistoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTypeDao
  extends IDao<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType> {
}

export class BaseRepositoryTypeDao
  extends SQDIDao<RepositoryType, RepositoryTypeESelect, RepositoryTypeECreateProperties, RepositoryTypeEUpdateColumns, RepositoryTypeEUpdateProperties, RepositoryTypeEId, RepositoryTypeGraph, QRepositoryType>
	implements IBaseRepositoryTypeDao {
	
	static Find      = new DaoQueryDecorators<RepositoryTypeESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryTypeESelect>();
	static Search    = new DaoQueryDecorators<RepositoryTypeESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryTypeESelect>();
	static Save(
		config: RepositoryTypeGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryTypeGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseTransactionHistoryDao
  extends IDao<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}

export class BaseTransactionHistoryDao
  extends SQDIDao<TransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory>
	implements IBaseTransactionHistoryDao {
	
	static Find      = new DaoQueryDecorators<TransactionHistoryESelect>();
	static FindOne   = new DaoQueryDecorators<TransactionHistoryESelect>();
	static Search    = new DaoQueryDecorators<TransactionHistoryESelect>();
	static SearchOne = new DaoQueryDecorators<TransactionHistoryESelect>();
	static Save(
		config: TransactionHistoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<TransactionHistoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}
