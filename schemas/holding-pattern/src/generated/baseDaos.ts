/* eslint-disable */
import {
	IActor,
} from './infrastructure/actor';
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
	IOperationHistory,
} from './history/operationhistory';
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
	IRecordHistory,
} from './history/recordhistory';
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
	IRecordHistoryNewValue,
} from './history/recordhistorynewvalue';
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
	IRecordHistoryOldValue,
} from './history/recordhistoryoldvalue';
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
	IRepository,
} from './repository/repository';
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
	IRepositoryApplication,
} from './repository/repositoryapplication';
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
	IRepositoryTransactionHistory,
} from './history/repositorytransactionhistory';
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
	ITransactionHistory,
} from './history/transactionhistory';
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
} from './qApplication';


// Application Q object Dependency Injection readiness detection Dao
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


export interface IBaseActorDao
  extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor> {
}

export class BaseActorDao
  extends SQDIDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorGraph, QActor>
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
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseOperationHistoryDao
  extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory> {
}

export class BaseOperationHistoryDao
  extends SQDIDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryGraph, QOperationHistory>
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
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRecordHistoryDao
  extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory> {
}

export class BaseRecordHistoryDao
  extends SQDIDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryGraph, QRecordHistory>
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
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseRecordHistoryNewValueDao
  extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDao
  extends SQDIDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueGraph, QRecordHistoryNewValue>
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
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseRecordHistoryOldValueDao
  extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDao
  extends SQDIDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueGraph, QRecordHistoryOldValue>
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
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseRepositoryDao
  extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}

export class BaseRepositoryDao
  extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository>
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
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositoryApplicationDao
  extends IDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDao
  extends SQDIDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationGraph, QRepositoryApplication>
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


export interface IBaseRepositoryTransactionHistoryDao
  extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDao
  extends SQDIDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryGraph, QRepositoryTransactionHistory>
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
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseTransactionHistoryDao
  extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory> {
}

export class BaseTransactionHistoryDao
  extends SQDIDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryGraph, QTransactionHistory>
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
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}
