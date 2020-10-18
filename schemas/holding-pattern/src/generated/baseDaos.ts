import {
	IDao,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Dao } from '@airport/check-in'
import {
	EntityId as DbEntityId
} from '@airport/ground-control'
import {
	Q,
	duoDiSet
} from './qSchema'
import {
	IActor
} from './infrastructure/actor'
import {
	ActorESelect,
	ActorECreateColumns,
	ActorECreateProperties,
	ActorEUpdateColumns,
	ActorEUpdateProperties,
	ActorEId,
	ActorGraph,
	QActor
} from './infrastructure/qactor'
import {
	IActorApplication
} from './infrastructure/actorapplication'
import {
	ActorApplicationESelect,
	ActorApplicationECreateColumns,
	ActorApplicationECreateProperties,
	ActorApplicationEUpdateColumns,
	ActorApplicationEUpdateProperties,
	ActorApplicationEId,
	ActorApplicationGraph,
	QActorApplication
} from './infrastructure/qactorapplication'
import {
	IApplication
} from './infrastructure/application'
import {
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	ApplicationGraph,
	QApplication
} from './infrastructure/qapplication'
import {
	IOperationHistory
} from './history/operationhistory'
import {
	OperationHistoryESelect,
	OperationHistoryECreateColumns,
	OperationHistoryECreateProperties,
	OperationHistoryEUpdateColumns,
	OperationHistoryEUpdateProperties,
	OperationHistoryEId,
	OperationHistoryGraph,
	QOperationHistory
} from './history/qoperationhistory'
import {
	IRecordHistory
} from './history/recordhistory'
import {
	RecordHistoryESelect,
	RecordHistoryECreateColumns,
	RecordHistoryECreateProperties,
	RecordHistoryEUpdateColumns,
	RecordHistoryEUpdateProperties,
	RecordHistoryEId,
	RecordHistoryGraph,
	QRecordHistory
} from './history/qrecordhistory'
import {
	IRecordHistoryNewValue
} from './history/recordhistorynewvalue'
import {
	RecordHistoryNewValueESelect,
	RecordHistoryNewValueECreateColumns,
	RecordHistoryNewValueECreateProperties,
	RecordHistoryNewValueEUpdateColumns,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueEId,
	RecordHistoryNewValueGraph,
	QRecordHistoryNewValue
} from './history/qrecordhistorynewvalue'
import {
	IRecordHistoryOldValue
} from './history/recordhistoryoldvalue'
import {
	RecordHistoryOldValueESelect,
	RecordHistoryOldValueECreateColumns,
	RecordHistoryOldValueECreateProperties,
	RecordHistoryOldValueEUpdateColumns,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueEId,
	RecordHistoryOldValueGraph,
	QRecordHistoryOldValue
} from './history/qrecordhistoryoldvalue'
import {
	IRepoTransHistoryChangedRepositoryActor
} from './history/repotranshistorychangedrepositoryactor'
import {
	RepoTransHistoryChangedRepositoryActorESelect,
	RepoTransHistoryChangedRepositoryActorECreateColumns,
	RepoTransHistoryChangedRepositoryActorECreateProperties,
	RepoTransHistoryChangedRepositoryActorEUpdateColumns,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorEId,
	RepoTransHistoryChangedRepositoryActorGraph,
	QRepoTransHistoryChangedRepositoryActor
} from './history/qrepotranshistorychangedrepositoryactor'
import {
	IRepository
} from './repository/repository'
import {
	RepositoryESelect,
	RepositoryECreateColumns,
	RepositoryECreateProperties,
	RepositoryEUpdateColumns,
	RepositoryEUpdateProperties,
	RepositoryEId,
	RepositoryGraph,
	QRepository
} from './repository/qrepository'
import {
	IRepositoryActor
} from './repository/repositoryactor'
import {
	RepositoryActorESelect,
	RepositoryActorECreateColumns,
	RepositoryActorECreateProperties,
	RepositoryActorEUpdateColumns,
	RepositoryActorEUpdateProperties,
	RepositoryActorEId,
	RepositoryActorGraph,
	QRepositoryActor
} from './repository/qrepositoryactor'
import {
	IRepositoryApplication
} from './repository/repositoryapplication'
import {
	RepositoryApplicationESelect,
	RepositoryApplicationECreateColumns,
	RepositoryApplicationECreateProperties,
	RepositoryApplicationEUpdateColumns,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationEId,
	RepositoryApplicationGraph,
	QRepositoryApplication
} from './repository/qrepositoryapplication'
import {
	IRepositorySchema
} from './repository/repositoryschema'
import {
	RepositorySchemaESelect,
	RepositorySchemaECreateColumns,
	RepositorySchemaECreateProperties,
	RepositorySchemaEUpdateColumns,
	RepositorySchemaEUpdateProperties,
	RepositorySchemaEId,
	RepositorySchemaGraph,
	QRepositorySchema
} from './repository/qrepositoryschema'
import {
	IRepositoryTransactionHistory
} from './history/repositorytransactionhistory'
import {
	RepositoryTransactionHistoryESelect,
	RepositoryTransactionHistoryECreateColumns,
	RepositoryTransactionHistoryECreateProperties,
	RepositoryTransactionHistoryEUpdateColumns,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryEId,
	RepositoryTransactionHistoryGraph,
	QRepositoryTransactionHistory
} from './history/qrepositorytransactionhistory'
import {
	ITransactionHistory
} from './history/transactionhistory'
import {
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	TransactionHistoryGraph,
	QTransactionHistory
} from './history/qtransactionhistory'


// Schema Q object Dependency Injection readiness detection Dao
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

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}
