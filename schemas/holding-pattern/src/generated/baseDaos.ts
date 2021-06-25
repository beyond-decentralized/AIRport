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
	IActorApplication,
} from './infrastructure/actorapplication';
import {
	ActorApplicationESelect,
	ActorApplicationECreateColumns,
	ActorApplicationECreateProperties,
	ActorApplicationEUpdateColumns,
	ActorApplicationEUpdateProperties,
	ActorApplicationEId,
	ActorApplicationGraph,
	QActorApplication,
} from './infrastructure/qactorapplication';
import {
	IApplication,
} from './infrastructure/application';
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationGraph,
	QApplication,
} from './infrastructure/qapplication';
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
	IRepoTransHistoryChangedRepositoryActor,
} from './history/repotranshistorychangedrepositoryactor';
import {
	RepoTransHistoryChangedRepositoryActorESelect,
	RepoTransHistoryChangedRepositoryActorECreateColumns,
	RepoTransHistoryChangedRepositoryActorECreateProperties,
	RepoTransHistoryChangedRepositoryActorEUpdateColumns,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorEId,
	RepoTransHistoryChangedRepositoryActorGraph,
	QRepoTransHistoryChangedRepositoryActor,
} from './history/qrepotranshistorychangedrepositoryactor';
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
	IRepositoryActor,
} from './repository/repositoryactor';
import {
	RepositoryActorESelect,
	RepositoryActorECreateColumns,
	RepositoryActorECreateProperties,
	RepositoryActorEUpdateColumns,
	RepositoryActorEUpdateProperties,
	RepositoryActorEId,
	RepositoryActorGraph,
	QRepositoryActor,
} from './repository/qrepositoryactor';
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
	IRepositorySchema,
} from './repository/repositoryschema';
import {
	RepositorySchemaESelect,
	RepositorySchemaECreateColumns,
	RepositorySchemaECreateProperties,
	RepositorySchemaEUpdateColumns,
	RepositorySchemaEUpdateProperties,
	RepositorySchemaEId,
	RepositorySchemaGraph,
	QRepositorySchema,
} from './repository/qrepositoryschema';
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
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseActorApplicationDao
  extends IDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationGraph, QActorApplication> {
}

export class BaseActorApplicationDao
  extends SQDIDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationGraph, QActorApplication>
	implements IBaseActorApplicationDao {
	
	static Find      = new DaoQueryDecorators<ActorApplicationESelect>();
	static FindOne   = new DaoQueryDecorators<ActorApplicationESelect>();
	static Search    = new DaoQueryDecorators<ActorApplicationESelect>();
	static SearchOne = new DaoQueryDecorators<ActorApplicationESelect>();
	static Save(
		config: ActorApplicationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ActorApplicationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication> {
}

export class BaseApplicationDao
  extends SQDIDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationGraph, QApplication>
	implements IBaseApplicationDao {
	
	static Find      = new DaoQueryDecorators<ApplicationESelect>();
	static FindOne   = new DaoQueryDecorators<ApplicationESelect>();
	static Search    = new DaoQueryDecorators<ApplicationESelect>();
	static SearchOne = new DaoQueryDecorators<ApplicationESelect>();
	static Save(
		config: ApplicationGraph
	): PropertyDecorator {
		return Dao.BaseSave<ApplicationGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
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
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
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
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
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
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDao
  extends IDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorGraph, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDao
  extends SQDIDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorGraph, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDao {
	
	static Find      = new DaoQueryDecorators<RepoTransHistoryChangedRepositoryActorESelect>();
	static FindOne   = new DaoQueryDecorators<RepoTransHistoryChangedRepositoryActorESelect>();
	static Search    = new DaoQueryDecorators<RepoTransHistoryChangedRepositoryActorESelect>();
	static SearchOne = new DaoQueryDecorators<RepoTransHistoryChangedRepositoryActorESelect>();
	static Save(
		config: RepoTransHistoryChangedRepositoryActorGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepoTransHistoryChangedRepositoryActorGraph>(config);
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
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseRepositoryActorDao
  extends IDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorGraph, QRepositoryActor> {
}

export class BaseRepositoryActorDao
  extends SQDIDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorGraph, QRepositoryActor>
	implements IBaseRepositoryActorDao {
	
	static Find      = new DaoQueryDecorators<RepositoryActorESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryActorESelect>();
	static Search    = new DaoQueryDecorators<RepositoryActorESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryActorESelect>();
	static Save(
		config: RepositoryActorGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryActorGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
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
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRepositorySchemaDao
  extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaGraph, QRepositorySchema> {
}

export class BaseRepositorySchemaDao
  extends SQDIDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaGraph, QRepositorySchema>
	implements IBaseRepositorySchemaDao {
	
	static Find      = new DaoQueryDecorators<RepositorySchemaESelect>();
	static FindOne   = new DaoQueryDecorators<RepositorySchemaESelect>();
	static Search    = new DaoQueryDecorators<RepositorySchemaESelect>();
	static SearchOne = new DaoQueryDecorators<RepositorySchemaESelect>();
	static Save(
		config: RepositorySchemaGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositorySchemaGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
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
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
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
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}
