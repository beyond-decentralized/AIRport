import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseAbstractRepositoryEntityDao
  extends IDao<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateColumns, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity> {
}

export class BaseAbstractRepositoryEntityDao
  extends Dao<IAbstractRepositoryEntity, AbstractRepositoryEntityESelect, AbstractRepositoryEntityECreateProperties, AbstractRepositoryEntityEUpdateColumns, AbstractRepositoryEntityEUpdateProperties, AbstractRepositoryEntityEId, QAbstractRepositoryEntity>
	implements IBaseAbstractRepositoryEntityDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['AbstractRepositoryEntity'], Q, utils);
	}
}


export interface IBaseActorDao
  extends IDao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor> {
}

export class BaseActorDao
  extends Dao<IActor, ActorESelect, ActorECreateProperties, ActorEUpdateColumns, ActorEUpdateProperties, ActorEId, QActor>
	implements IBaseActorDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Actor'], Q, utils);
	}
}


export interface IBaseActorApplicationDao
  extends IDao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication> {
}

export class BaseActorApplicationDao
  extends Dao<IActorApplication, ActorApplicationESelect, ActorApplicationECreateProperties, ActorApplicationEUpdateColumns, ActorApplicationEUpdateProperties, ActorApplicationEId, QActorApplication>
	implements IBaseActorApplicationDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['ActorApplication'], Q, utils);
	}
}


export interface IBaseApplicationDao
  extends IDao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication> {
}

export class BaseApplicationDao
  extends Dao<IApplication, ApplicationESelect, ApplicationECreateProperties, ApplicationEUpdateColumns, ApplicationEUpdateProperties, ApplicationEId, QApplication>
	implements IBaseApplicationDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Application'], Q, utils);
	}
}


export interface IBaseOperationHistoryDao
  extends IDao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory> {
}

export class BaseOperationHistoryDao
  extends Dao<IOperationHistory, OperationHistoryESelect, OperationHistoryECreateProperties, OperationHistoryEUpdateColumns, OperationHistoryEUpdateProperties, OperationHistoryEId, QOperationHistory>
	implements IBaseOperationHistoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['OperationHistory'], Q, utils);
	}
}


export interface IBaseRecordHistoryDao
  extends IDao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory> {
}

export class BaseRecordHistoryDao
  extends Dao<IRecordHistory, RecordHistoryESelect, RecordHistoryECreateProperties, RecordHistoryEUpdateColumns, RecordHistoryEUpdateProperties, RecordHistoryEId, QRecordHistory>
	implements IBaseRecordHistoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RecordHistory'], Q, utils);
	}
}


export interface IBaseRecordHistoryNewValueDao
  extends IDao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue> {
}

export class BaseRecordHistoryNewValueDao
  extends Dao<IRecordHistoryNewValue, RecordHistoryNewValueESelect, RecordHistoryNewValueECreateProperties, RecordHistoryNewValueEUpdateColumns, RecordHistoryNewValueEUpdateProperties, RecordHistoryNewValueEId, QRecordHistoryNewValue>
	implements IBaseRecordHistoryNewValueDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryNewValue'], Q, utils);
	}
}


export interface IBaseRecordHistoryOldValueDao
  extends IDao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue> {
}

export class BaseRecordHistoryOldValueDao
  extends Dao<IRecordHistoryOldValue, RecordHistoryOldValueESelect, RecordHistoryOldValueECreateProperties, RecordHistoryOldValueEUpdateColumns, RecordHistoryOldValueEUpdateProperties, RecordHistoryOldValueEId, QRecordHistoryOldValue>
	implements IBaseRecordHistoryOldValueDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RecordHistoryOldValue'], Q, utils);
	}
}


export interface IBaseRepoTransHistoryChangedRepositoryActorDao
  extends IDao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor> {
}

export class BaseRepoTransHistoryChangedRepositoryActorDao
  extends Dao<IRepoTransHistoryChangedRepositoryActor, RepoTransHistoryChangedRepositoryActorESelect, RepoTransHistoryChangedRepositoryActorECreateProperties, RepoTransHistoryChangedRepositoryActorEUpdateColumns, RepoTransHistoryChangedRepositoryActorEUpdateProperties, RepoTransHistoryChangedRepositoryActorEId, QRepoTransHistoryChangedRepositoryActor>
	implements IBaseRepoTransHistoryChangedRepositoryActorDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepoTransHistoryChangedRepositoryActor'], Q, utils);
	}
}


export interface IBaseRepositoryDao
  extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDao
  extends Dao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Repository'], Q, utils);
	}
}


export interface IBaseRepositoryActorDao
  extends IDao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor> {
}

export class BaseRepositoryActorDao
  extends Dao<IRepositoryActor, RepositoryActorESelect, RepositoryActorECreateProperties, RepositoryActorEUpdateColumns, RepositoryActorEUpdateProperties, RepositoryActorEId, QRepositoryActor>
	implements IBaseRepositoryActorDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepositoryActor'], Q, utils);
	}
}


export interface IBaseRepositoryApplicationDao
  extends IDao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication> {
}

export class BaseRepositoryApplicationDao
  extends Dao<IRepositoryApplication, RepositoryApplicationESelect, RepositoryApplicationECreateProperties, RepositoryApplicationEUpdateColumns, RepositoryApplicationEUpdateProperties, RepositoryApplicationEId, QRepositoryApplication>
	implements IBaseRepositoryApplicationDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepositoryApplication'], Q, utils);
	}
}


export interface IBaseRepositorySchemaDao
  extends IDao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema> {
}

export class BaseRepositorySchemaDao
  extends Dao<IRepositorySchema, RepositorySchemaESelect, RepositorySchemaECreateProperties, RepositorySchemaEUpdateColumns, RepositorySchemaEUpdateProperties, RepositorySchemaEId, QRepositorySchema>
	implements IBaseRepositorySchemaDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepositorySchema'], Q, utils);
	}
}


export interface IBaseRepositoryTransactionHistoryDao
  extends IDao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory> {
}

export class BaseRepositoryTransactionHistoryDao
  extends Dao<IRepositoryTransactionHistory, RepositoryTransactionHistoryESelect, RepositoryTransactionHistoryECreateProperties, RepositoryTransactionHistoryEUpdateColumns, RepositoryTransactionHistoryEUpdateProperties, RepositoryTransactionHistoryEId, QRepositoryTransactionHistory>
	implements IBaseRepositoryTransactionHistoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepositoryTransactionHistory'], Q, utils);
	}
}


export interface IBaseTerminalDao
  extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}

export class BaseTerminalDao
  extends Dao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, QTerminal>
	implements IBaseTerminalDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Terminal'], Q, utils);
	}
}


export interface IBaseTransactionHistoryDao
  extends IDao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory> {
}

export class BaseTransactionHistoryDao
  extends Dao<ITransactionHistory, TransactionHistoryESelect, TransactionHistoryECreateProperties, TransactionHistoryEUpdateColumns, TransactionHistoryEUpdateProperties, TransactionHistoryEId, QTransactionHistory>
	implements IBaseTransactionHistoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['TransactionHistory'], Q, utils);
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, QUser> {
}

export class BaseUserDao
  extends Dao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, QUser>
	implements IBaseUserDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['User'], Q, utils);
	}
}
