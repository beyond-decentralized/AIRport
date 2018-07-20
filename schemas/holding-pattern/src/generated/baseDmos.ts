import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	IAbstractRepositoryEntity,
	AbstractRepositoryEntityESelect,
	AbstractRepositoryEntityECreateColumns,
	AbstractRepositoryEntityECreateProperties,
	AbstractRepositoryEntityEUpdateColumns,
	AbstractRepositoryEntityEUpdateProperties,
	AbstractRepositoryEntityEId,
	QAbstractRepositoryEntity
} from './repository/qabstractrepositoryentity';
import {
	IActor,
	ActorESelect,
	ActorECreateColumns,
	ActorECreateProperties,
	ActorEUpdateColumns,
	ActorEUpdateProperties,
	ActorEId,
	QActor
} from './infrastructure/qactor';
import {
	IActorApplication,
	ActorApplicationESelect,
	ActorApplicationECreateColumns,
	ActorApplicationECreateProperties,
	ActorApplicationEUpdateColumns,
	ActorApplicationEUpdateProperties,
	ActorApplicationEId,
	QActorApplication
} from './infrastructure/qactorapplication';
import {
	IApplication,
	ApplicationESelect,
	ApplicationECreateColumns,
	ApplicationECreateProperties,
	ApplicationEUpdateColumns,
	ApplicationEUpdateProperties,
	ApplicationEId,
	QApplication
} from './infrastructure/qapplication';
import {
	IOperationHistory,
	OperationHistoryESelect,
	OperationHistoryECreateColumns,
	OperationHistoryECreateProperties,
	OperationHistoryEUpdateColumns,
	OperationHistoryEUpdateProperties,
	OperationHistoryEId,
	QOperationHistory
} from './history/qoperationhistory';
import {
	IRecordHistory,
	RecordHistoryESelect,
	RecordHistoryECreateColumns,
	RecordHistoryECreateProperties,
	RecordHistoryEUpdateColumns,
	RecordHistoryEUpdateProperties,
	RecordHistoryEId,
	QRecordHistory
} from './history/qrecordhistory';
import {
	IRecordHistoryNewValue,
	RecordHistoryNewValueESelect,
	RecordHistoryNewValueECreateColumns,
	RecordHistoryNewValueECreateProperties,
	RecordHistoryNewValueEUpdateColumns,
	RecordHistoryNewValueEUpdateProperties,
	RecordHistoryNewValueEId,
	QRecordHistoryNewValue
} from './history/qrecordhistorynewvalue';
import {
	IRecordHistoryOldValue,
	RecordHistoryOldValueESelect,
	RecordHistoryOldValueECreateColumns,
	RecordHistoryOldValueECreateProperties,
	RecordHistoryOldValueEUpdateColumns,
	RecordHistoryOldValueEUpdateProperties,
	RecordHistoryOldValueEId,
	QRecordHistoryOldValue
} from './history/qrecordhistoryoldvalue';
import {
	IRepoTransHistoryChangedRepositoryActor,
	RepoTransHistoryChangedRepositoryActorESelect,
	RepoTransHistoryChangedRepositoryActorECreateColumns,
	RepoTransHistoryChangedRepositoryActorECreateProperties,
	RepoTransHistoryChangedRepositoryActorEUpdateColumns,
	RepoTransHistoryChangedRepositoryActorEUpdateProperties,
	RepoTransHistoryChangedRepositoryActorEId,
	QRepoTransHistoryChangedRepositoryActor
} from './history/qrepotranshistorychangedrepositoryactor';
import {
	IRepository,
	RepositoryESelect,
	RepositoryECreateColumns,
	RepositoryECreateProperties,
	RepositoryEUpdateColumns,
	RepositoryEUpdateProperties,
	RepositoryEId,
	QRepository
} from './repository/qrepository';
import {
	IRepositoryActor,
	RepositoryActorESelect,
	RepositoryActorECreateColumns,
	RepositoryActorECreateProperties,
	RepositoryActorEUpdateColumns,
	RepositoryActorEUpdateProperties,
	RepositoryActorEId,
	QRepositoryActor
} from './repository/qrepositoryactor';
import {
	IRepositoryApplication,
	RepositoryApplicationESelect,
	RepositoryApplicationECreateColumns,
	RepositoryApplicationECreateProperties,
	RepositoryApplicationEUpdateColumns,
	RepositoryApplicationEUpdateProperties,
	RepositoryApplicationEId,
	QRepositoryApplication
} from './repository/qrepositoryapplication';
import {
	IRepositorySchema,
	RepositorySchemaESelect,
	RepositorySchemaECreateColumns,
	RepositorySchemaECreateProperties,
	RepositorySchemaEUpdateColumns,
	RepositorySchemaEUpdateProperties,
	RepositorySchemaEId,
	QRepositorySchema
} from './repository/qrepositoryschema';
import {
	IRepositoryTransactionHistory,
	RepositoryTransactionHistoryESelect,
	RepositoryTransactionHistoryECreateColumns,
	RepositoryTransactionHistoryECreateProperties,
	RepositoryTransactionHistoryEUpdateColumns,
	RepositoryTransactionHistoryEUpdateProperties,
	RepositoryTransactionHistoryEId,
	QRepositoryTransactionHistory
} from './history/qrepositorytransactionhistory';
import {
	ITerminal,
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	QTerminal
} from './infrastructure/qterminal';
import {
	ITransactionHistory,
	TransactionHistoryESelect,
	TransactionHistoryECreateColumns,
	TransactionHistoryECreateProperties,
	TransactionHistoryEUpdateColumns,
	TransactionHistoryEUpdateProperties,
	TransactionHistoryEId,
	QTransactionHistory
} from './history/qtransactionhistory';
import {
	IUser,
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	QUser
} from './infrastructure/quser';


export interface IBaseAbstractRepositoryEntityDmo
  extends IDmo<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity> {
}

export class BaseAbstractRepositoryEntityDmo
  extends Dmo<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity>
	implements IBaseAbstractRepositoryEntityDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['AbstractRepositoryEntity']);
	}
}


export interface IBaseActorDmo
  extends IDmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor> {
}

export class BaseActorDmo
  extends Dmo<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateProperties, ActorEId, QActor>
	implements IBaseActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Actor']);
	}
}


export interface IBaseActorApplicationDmo
  extends IDmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}

export class BaseActorApplicationDmo
  extends Dmo<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication>
	implements IBaseActorApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ActorApplication']);
	}
}


export interface IBaseApplicationDmo
  extends IDmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDmo
  extends Dmo<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Application']);
	}
}


export interface IBaseOperationHistoryDmo
  extends IDmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}

export class BaseOperationHistoryDmo
  extends Dmo<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory>
	implements IBaseOperationHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['OperationHistory']);
	}
}


export interface IBaseRecordHistoryDmo
  extends IDmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}

export class BaseRecordHistoryDmo
  extends Dmo<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory>
	implements IBaseRecordHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistory']);
	}
}


export interface IBaseRecordHistoryNewValueDmo
  extends IDmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDmo
  extends Dmo<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryNewValue']);
	}
}


export interface IBaseRecordHistoryOldValueDmo
  extends IDmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDmo
  extends Dmo<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryOldValue']);
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDmo
  extends IDmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDmo
  extends Dmo<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor']);
	}
}


export interface IBaseRepositoryDmo
  extends IDmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDmo
  extends Dmo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Repository']);
	}
}


export interface IBaseRepositoryActorDmo
  extends IDmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}

export class BaseRepositoryActorDmo
  extends Dmo<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor>
	implements IBaseRepositoryActorDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryActor']);
	}
}


export interface IBaseRepositoryApplicationDmo
  extends IDmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDmo
  extends Dmo<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication>
	implements IBaseRepositoryApplicationDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryApplication']);
	}
}


export interface IBaseRepositorySchemaDmo
  extends IDmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}

export class BaseRepositorySchemaDmo
  extends Dmo<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema>
	implements IBaseRepositorySchemaDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositorySchema']);
	}
}


export interface IBaseRepositoryTransactionHistoryDmo
  extends IDmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDmo
  extends Dmo<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory']);
	}
}


export interface IBaseTerminalDmo
  extends IDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}

export class BaseTerminalDmo
  extends Dmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal>
	implements IBaseTerminalDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Terminal']);
	}
}


export interface IBaseTransactionHistoryDmo
  extends IDmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}

export class BaseTransactionHistoryDmo
  extends Dmo<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory>
	implements IBaseTransactionHistoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TransactionHistory']);
	}
}


export interface IBaseUserDmo
  extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}

export class BaseUserDmo
  extends Dmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser>
	implements IBaseUserDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['User']);
	}
}
