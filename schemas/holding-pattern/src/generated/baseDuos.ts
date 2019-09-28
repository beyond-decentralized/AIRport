import {
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control'
import { Duo } from '@airport/check-in'
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
	ActorECascadeGraph,
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
	ActorApplicationECascadeGraph,
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
	ApplicationECascadeGraph,
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
	OperationHistoryECascadeGraph,
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
	RecordHistoryECascadeGraph,
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
	RecordHistoryNewValueECascadeGraph,
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
	RecordHistoryOldValueECascadeGraph,
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
	RepoTransHistoryChangedRepositoryActorECascadeGraph,
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
	RepositoryECascadeGraph,
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
	RepositoryActorECascadeGraph,
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
	RepositoryApplicationECascadeGraph,
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
	RepositorySchemaECascadeGraph,
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
	RepositoryTransactionHistoryECascadeGraph,
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
	TransactionHistoryECascadeGraph,
	QTransactionHistory
} from './history/qtransactionhistory'


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
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


export interface IBaseActorDuo
  extends IDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> {
}

export class BaseActorDuo
  extends SQDIDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor>
	implements IBaseActorDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseActorApplicationDuo
  extends IDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> {
}

export class BaseActorApplicationDuo
  extends SQDIDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication>
	implements IBaseActorApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseApplicationDuo
  extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication>
	implements IBaseApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseOperationHistoryDuo
  extends IDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> {
}

export class BaseOperationHistoryDuo
  extends SQDIDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory>
	implements IBaseOperationHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseRecordHistoryDuo
  extends IDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> {
}

export class BaseRecordHistoryDuo
  extends SQDIDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory>
	implements IBaseRecordHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRecordHistoryNewValueDuo
  extends IDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDuo
  extends SQDIDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseRecordHistoryOldValueDuo
  extends IDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDuo
  extends SQDIDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDuo
  extends IDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDuo
  extends SQDIDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository>
	implements IBaseRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseRepositoryActorDuo
  extends IDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> {
}

export class BaseRepositoryActorDuo
  extends SQDIDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor>
	implements IBaseRepositoryActorDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryApplicationDuo
  extends IDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDuo
  extends SQDIDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication>
	implements IBaseRepositoryApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRepositorySchemaDuo
  extends IDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> {
}

export class BaseRepositorySchemaDuo
  extends SQDIDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema>
	implements IBaseRepositorySchemaDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryTransactionHistoryDuo
  extends IDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDuo
  extends SQDIDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseTransactionHistoryDuo
  extends IDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> {
}

export class BaseTransactionHistoryDuo
  extends SQDIDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory>
	implements IBaseTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}
