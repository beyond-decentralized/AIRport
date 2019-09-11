import {
	IDuo,
	IEntityCascadeGraph,
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
	IActor,
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
	IActorApplication,
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
	IApplication,
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
	IOperationHistory,
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
	IRecordHistory,
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
	IRecordHistoryNewValue,
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
	IRecordHistoryOldValue,
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
	IRepoTransHistoryChangedRepositoryActor,
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
	IRepository,
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
	IRepositoryActor,
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
	IRepositoryApplication,
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
	IRepositorySchema,
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
	IRepositoryTransactionHistory,
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
	ITransactionHistory,
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	TransactionHistoryECascadeGraph,
	QTransactionHistory
} from './history/qtransactionhistory'


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
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
  extends IDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor> {
}

export class BaseActorDuo
  extends SQDIDuo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, ActorECascadeGraph, QActor>
	implements IBaseActorDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseActorApplicationDuo
  extends IDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication> {
}

export class BaseActorApplicationDuo
  extends SQDIDuo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, ActorApplicationECascadeGraph, QActorApplication>
	implements IBaseActorApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseApplicationDuo
  extends IDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication> {
}

export class BaseApplicationDuo
  extends SQDIDuo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, ApplicationECascadeGraph, QApplication>
	implements IBaseApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseOperationHistoryDuo
  extends IDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory> {
}

export class BaseOperationHistoryDuo
  extends SQDIDuo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, OperationHistoryECascadeGraph, QOperationHistory>
	implements IBaseOperationHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseRecordHistoryDuo
  extends IDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory> {
}

export class BaseRecordHistoryDuo
  extends SQDIDuo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, RecordHistoryECascadeGraph, QRecordHistory>
	implements IBaseRecordHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseRecordHistoryNewValueDuo
  extends IDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDuo
  extends SQDIDuo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, RecordHistoryNewValueECascadeGraph, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseRecordHistoryOldValueDuo
  extends IDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDuo
  extends SQDIDuo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, RecordHistoryOldValueECascadeGraph, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDuo
  extends IDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDuo
  extends SQDIDuo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorECascadeGraph, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository>
	implements IBaseRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseRepositoryActorDuo
  extends IDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor> {
}

export class BaseRepositoryActorDuo
  extends SQDIDuo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, RepositoryActorECascadeGraph, QRepositoryActor>
	implements IBaseRepositoryActorDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseRepositoryApplicationDuo
  extends IDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDuo
  extends SQDIDuo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, RepositoryApplicationECascadeGraph, QRepositoryApplication>
	implements IBaseRepositoryApplicationDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseRepositorySchemaDuo
  extends IDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema> {
}

export class BaseRepositorySchemaDuo
  extends SQDIDuo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, RepositorySchemaECascadeGraph, QRepositorySchema>
	implements IBaseRepositorySchemaDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseRepositoryTransactionHistoryDuo
  extends IDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDuo
  extends SQDIDuo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryECascadeGraph, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseTransactionHistoryDuo
  extends IDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory> {
}

export class BaseTransactionHistoryDuo
  extends SQDIDuo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, TransactionHistoryECascadeGraph, QTransactionHistory>
	implements IBaseTransactionHistoryDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}
