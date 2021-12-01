/* eslint-disable */
import {
	IAgtRepositoryTransactionBlock,
} from './synchronization/agtrepositorytransactionblock';
import {
	AgtRepositoryTransactionBlockESelect,
	AgtRepositoryTransactionBlockECreateColumns,
	AgtRepositoryTransactionBlockECreateProperties,
	AgtRepositoryTransactionBlockEUpdateColumns,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockEId,
	AgtRepositoryTransactionBlockGraph,
	QAgtRepositoryTransactionBlock,
} from './synchronization/qagtrepositorytransactionblock';
import {
	IAgtSharingMessage,
} from './synchronization/agtsharingmessage';
import {
	AgtSharingMessageESelect,
	AgtSharingMessageECreateColumns,
	AgtSharingMessageECreateProperties,
	AgtSharingMessageEUpdateColumns,
	AgtSharingMessageEUpdateProperties,
	AgtSharingMessageEId,
	AgtSharingMessageGraph,
	QAgtSharingMessage,
} from './synchronization/qagtsharingmessage';
import {
	IArchive,
} from './repository/archive';
import {
	ArchiveESelect,
	ArchiveECreateColumns,
	ArchiveECreateProperties,
	ArchiveEUpdateColumns,
	ArchiveEUpdateProperties,
	ArchiveEId,
	ArchiveGraph,
	QArchive,
} from './repository/qarchive';
import {
	IDailyArchiveLog,
} from './archive/dailyarchivelog';
import {
	DailyArchiveLogESelect,
	DailyArchiveLogECreateColumns,
	DailyArchiveLogECreateProperties,
	DailyArchiveLogEUpdateColumns,
	DailyArchiveLogEUpdateProperties,
	DailyArchiveLogEId,
	DailyArchiveLogGraph,
	QDailyArchiveLog,
} from './archive/qdailyarchivelog';
import {
	IDailyTerminalSyncLog,
} from './archive/dailyterminalsynclog';
import {
	DailyTerminalSyncLogESelect,
	DailyTerminalSyncLogECreateColumns,
	DailyTerminalSyncLogECreateProperties,
	DailyTerminalSyncLogEUpdateColumns,
	DailyTerminalSyncLogEUpdateProperties,
	DailyTerminalSyncLogEId,
	DailyTerminalSyncLogGraph,
	QDailyTerminalSyncLog,
} from './archive/qdailyterminalsynclog';
import {
	IMonthlyArchiveLog,
} from './archive/monthlyarchivelog';
import {
	MonthlyArchiveLogESelect,
	MonthlyArchiveLogECreateColumns,
	MonthlyArchiveLogECreateProperties,
	MonthlyArchiveLogEUpdateColumns,
	MonthlyArchiveLogEUpdateProperties,
	MonthlyArchiveLogEId,
	MonthlyArchiveLogGraph,
	QMonthlyArchiveLog,
} from './archive/qmonthlyarchivelog';
import {
	IMonthlyTerminalSyncLog,
} from './archive/monthlyterminalsynclog';
import {
	MonthlyTerminalSyncLogESelect,
	MonthlyTerminalSyncLogECreateColumns,
	MonthlyTerminalSyncLogECreateProperties,
	MonthlyTerminalSyncLogEUpdateColumns,
	MonthlyTerminalSyncLogEUpdateProperties,
	MonthlyTerminalSyncLogEId,
	MonthlyTerminalSyncLogGraph,
	QMonthlyTerminalSyncLog,
} from './archive/qmonthlyterminalsynclog';
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
	IRepositoryArchive,
} from './repository/repositoryarchive';
import {
	RepositoryArchiveESelect,
	RepositoryArchiveECreateColumns,
	RepositoryArchiveECreateProperties,
	RepositoryArchiveEUpdateColumns,
	RepositoryArchiveEUpdateProperties,
	RepositoryArchiveEId,
	RepositoryArchiveGraph,
	QRepositoryArchive,
} from './repository/qrepositoryarchive';
import {
	ISecurityAnswer,
} from './user/security/securityanswer';
import {
	SecurityAnswerESelect,
	SecurityAnswerECreateColumns,
	SecurityAnswerECreateProperties,
	SecurityAnswerEUpdateColumns,
	SecurityAnswerEUpdateProperties,
	SecurityAnswerEId,
	SecurityAnswerGraph,
	QSecurityAnswer,
} from './user/security/qsecurityanswer';
import {
	ISecurityQuestion,
} from './user/security/securityquestion';
import {
	SecurityQuestionESelect,
	SecurityQuestionECreateColumns,
	SecurityQuestionECreateProperties,
	SecurityQuestionEUpdateColumns,
	SecurityQuestionEUpdateProperties,
	SecurityQuestionEId,
	SecurityQuestionGraph,
	QSecurityQuestion,
} from './user/security/qsecurityquestion';
import {
	IServer,
} from './server/server';
import {
	ServerESelect,
	ServerECreateColumns,
	ServerECreateProperties,
	ServerEUpdateColumns,
	ServerEUpdateProperties,
	ServerEId,
	ServerGraph,
	QServer,
} from './server/qserver';
import {
	IServerSyncLog,
} from './server/serversynclog';
import {
	ServerSyncLogESelect,
	ServerSyncLogECreateColumns,
	ServerSyncLogECreateProperties,
	ServerSyncLogEUpdateColumns,
	ServerSyncLogEUpdateProperties,
	ServerSyncLogEId,
	ServerSyncLogGraph,
	QServerSyncLog,
} from './server/qserversynclog';
import {
	ISyncLog,
} from './synchronization/synclog';
import {
	SyncLogESelect,
	SyncLogECreateColumns,
	SyncLogECreateProperties,
	SyncLogEUpdateColumns,
	SyncLogEUpdateProperties,
	SyncLogEId,
	SyncLogGraph,
	QSyncLog,
} from './synchronization/qsynclog';
import {
	ITerminal,
} from './terminal/terminal';
import {
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	TerminalGraph,
	QTerminal,
} from './terminal/qterminal';
import {
	ITerminalRepository,
} from './terminal/terminalrepository';
import {
	TerminalRepositoryESelect,
	TerminalRepositoryECreateColumns,
	TerminalRepositoryECreateProperties,
	TerminalRepositoryEUpdateColumns,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryEId,
	TerminalRepositoryGraph,
	QTerminalRepository,
} from './terminal/qterminalrepository';
import {
	ITuningParameters,
} from './tuning/tuningparameters';
import {
	TuningParametersESelect,
	TuningParametersECreateColumns,
	TuningParametersECreateProperties,
	TuningParametersEUpdateColumns,
	TuningParametersEUpdateProperties,
	TuningParametersEId,
	TuningParametersGraph,
	QTuningParameters,
} from './tuning/qtuningparameters';
import {
	IUser,
} from './user/user';
import {
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	UserGraph,
	QUser,
} from './user/quser';
import {
	IUserRepository,
} from './user/userrepository';
import {
	UserRepositoryESelect,
	UserRepositoryECreateColumns,
	UserRepositoryECreateProperties,
	UserRepositoryEUpdateColumns,
	UserRepositoryEUpdateProperties,
	UserRepositoryEId,
	UserRepositoryGraph,
	QUserRepository,
} from './user/quserrepository';
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


export interface IBaseAgtRepositoryTransactionBlockDao
  extends IDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockGraph, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDao
  extends SQDIDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockGraph, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDao {
	
	static Find      = new DaoQueryDecorators<AgtRepositoryTransactionBlockESelect>();
	static FindOne   = new DaoQueryDecorators<AgtRepositoryTransactionBlockESelect>();
	static Search    = new DaoQueryDecorators<AgtRepositoryTransactionBlockESelect>();
	static SearchOne = new DaoQueryDecorators<AgtRepositoryTransactionBlockESelect>();
	static Save(
		config: AgtRepositoryTransactionBlockGraph
	): PropertyDecorator {
		return Dao.BaseSave<AgtRepositoryTransactionBlockGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseAgtSharingMessageDao
  extends IDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageGraph, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDao
  extends SQDIDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageGraph, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDao {
	
	static Find      = new DaoQueryDecorators<AgtSharingMessageESelect>();
	static FindOne   = new DaoQueryDecorators<AgtSharingMessageESelect>();
	static Search    = new DaoQueryDecorators<AgtSharingMessageESelect>();
	static SearchOne = new DaoQueryDecorators<AgtSharingMessageESelect>();
	static Save(
		config: AgtSharingMessageGraph
	): PropertyDecorator {
		return Dao.BaseSave<AgtSharingMessageGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseArchiveDao
  extends IDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveGraph, QArchive> {
}

export class BaseArchiveDao
  extends SQDIDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveGraph, QArchive>
	implements IBaseArchiveDao {
	
	static Find      = new DaoQueryDecorators<ArchiveESelect>();
	static FindOne   = new DaoQueryDecorators<ArchiveESelect>();
	static Search    = new DaoQueryDecorators<ArchiveESelect>();
	static SearchOne = new DaoQueryDecorators<ArchiveESelect>();
	static Save(
		config: ArchiveGraph
	): PropertyDecorator {
		return Dao.BaseSave<ArchiveGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseDailyArchiveLogDao
  extends IDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogGraph, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDao
  extends SQDIDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogGraph, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDao {
	
	static Find      = new DaoQueryDecorators<DailyArchiveLogESelect>();
	static FindOne   = new DaoQueryDecorators<DailyArchiveLogESelect>();
	static Search    = new DaoQueryDecorators<DailyArchiveLogESelect>();
	static SearchOne = new DaoQueryDecorators<DailyArchiveLogESelect>();
	static Save(
		config: DailyArchiveLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<DailyArchiveLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseDailyTerminalSyncLogDao
  extends IDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogGraph, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDao
  extends SQDIDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogGraph, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDao {
	
	static Find      = new DaoQueryDecorators<DailyTerminalSyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<DailyTerminalSyncLogESelect>();
	static Search    = new DaoQueryDecorators<DailyTerminalSyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<DailyTerminalSyncLogESelect>();
	static Save(
		config: DailyTerminalSyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<DailyTerminalSyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseMonthlyArchiveLogDao
  extends IDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogGraph, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDao
  extends SQDIDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogGraph, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDao {
	
	static Find      = new DaoQueryDecorators<MonthlyArchiveLogESelect>();
	static FindOne   = new DaoQueryDecorators<MonthlyArchiveLogESelect>();
	static Search    = new DaoQueryDecorators<MonthlyArchiveLogESelect>();
	static SearchOne = new DaoQueryDecorators<MonthlyArchiveLogESelect>();
	static Save(
		config: MonthlyArchiveLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<MonthlyArchiveLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseMonthlyTerminalSyncLogDao
  extends IDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogGraph, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDao
  extends SQDIDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogGraph, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDao {
	
	static Find      = new DaoQueryDecorators<MonthlyTerminalSyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<MonthlyTerminalSyncLogESelect>();
	static Search    = new DaoQueryDecorators<MonthlyTerminalSyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<MonthlyTerminalSyncLogESelect>();
	static Save(
		config: MonthlyTerminalSyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<MonthlyTerminalSyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
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
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryArchiveDao
  extends IDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveGraph, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDao
  extends SQDIDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveGraph, QRepositoryArchive>
	implements IBaseRepositoryArchiveDao {
	
	static Find      = new DaoQueryDecorators<RepositoryArchiveESelect>();
	static FindOne   = new DaoQueryDecorators<RepositoryArchiveESelect>();
	static Search    = new DaoQueryDecorators<RepositoryArchiveESelect>();
	static SearchOne = new DaoQueryDecorators<RepositoryArchiveESelect>();
	static Save(
		config: RepositoryArchiveGraph
	): PropertyDecorator {
		return Dao.BaseSave<RepositoryArchiveGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSecurityAnswerDao
  extends IDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerGraph, QSecurityAnswer> {
}

export class BaseSecurityAnswerDao
  extends SQDIDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerGraph, QSecurityAnswer>
	implements IBaseSecurityAnswerDao {
	
	static Find      = new DaoQueryDecorators<SecurityAnswerESelect>();
	static FindOne   = new DaoQueryDecorators<SecurityAnswerESelect>();
	static Search    = new DaoQueryDecorators<SecurityAnswerESelect>();
	static SearchOne = new DaoQueryDecorators<SecurityAnswerESelect>();
	static Save(
		config: SecurityAnswerGraph
	): PropertyDecorator {
		return Dao.BaseSave<SecurityAnswerGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSecurityQuestionDao
  extends IDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionGraph, QSecurityQuestion> {
}

export class BaseSecurityQuestionDao
  extends SQDIDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionGraph, QSecurityQuestion>
	implements IBaseSecurityQuestionDao {
	
	static Find      = new DaoQueryDecorators<SecurityQuestionESelect>();
	static FindOne   = new DaoQueryDecorators<SecurityQuestionESelect>();
	static Search    = new DaoQueryDecorators<SecurityQuestionESelect>();
	static SearchOne = new DaoQueryDecorators<SecurityQuestionESelect>();
	static Save(
		config: SecurityQuestionGraph
	): PropertyDecorator {
		return Dao.BaseSave<SecurityQuestionGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseServerDao
  extends IDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerGraph, QServer> {
}

export class BaseServerDao
  extends SQDIDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerGraph, QServer>
	implements IBaseServerDao {
	
	static Find      = new DaoQueryDecorators<ServerESelect>();
	static FindOne   = new DaoQueryDecorators<ServerESelect>();
	static Search    = new DaoQueryDecorators<ServerESelect>();
	static SearchOne = new DaoQueryDecorators<ServerESelect>();
	static Save(
		config: ServerGraph
	): PropertyDecorator {
		return Dao.BaseSave<ServerGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(17)
	}
	
	constructor() {
		super(17)
	}
}


export interface IBaseServerSyncLogDao
  extends IDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogGraph, QServerSyncLog> {
}

export class BaseServerSyncLogDao
  extends SQDIDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogGraph, QServerSyncLog>
	implements IBaseServerSyncLogDao {
	
	static Find      = new DaoQueryDecorators<ServerSyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<ServerSyncLogESelect>();
	static Search    = new DaoQueryDecorators<ServerSyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<ServerSyncLogESelect>();
	static Save(
		config: ServerSyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<ServerSyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseSyncLogDao
  extends IDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogGraph, QSyncLog> {
}

export class BaseSyncLogDao
  extends SQDIDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogGraph, QSyncLog>
	implements IBaseSyncLogDao {
	
	static Find      = new DaoQueryDecorators<SyncLogESelect>();
	static FindOne   = new DaoQueryDecorators<SyncLogESelect>();
	static Search    = new DaoQueryDecorators<SyncLogESelect>();
	static SearchOne = new DaoQueryDecorators<SyncLogESelect>();
	static Save(
		config: SyncLogGraph
	): PropertyDecorator {
		return Dao.BaseSave<SyncLogGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseTerminalDao
  extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}

export class BaseTerminalDao
  extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal>
	implements IBaseTerminalDao {
	
	static Find      = new DaoQueryDecorators<TerminalESelect>();
	static FindOne   = new DaoQueryDecorators<TerminalESelect>();
	static Search    = new DaoQueryDecorators<TerminalESelect>();
	static SearchOne = new DaoQueryDecorators<TerminalESelect>();
	static Save(
		config: TerminalGraph
	): PropertyDecorator {
		return Dao.BaseSave<TerminalGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseTerminalRepositoryDao
  extends IDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryGraph, QTerminalRepository> {
}

export class BaseTerminalRepositoryDao
  extends SQDIDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryGraph, QTerminalRepository>
	implements IBaseTerminalRepositoryDao {
	
	static Find      = new DaoQueryDecorators<TerminalRepositoryESelect>();
	static FindOne   = new DaoQueryDecorators<TerminalRepositoryESelect>();
	static Search    = new DaoQueryDecorators<TerminalRepositoryESelect>();
	static SearchOne = new DaoQueryDecorators<TerminalRepositoryESelect>();
	static Save(
		config: TerminalRepositoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<TerminalRepositoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseTuningParametersDao
  extends IDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersGraph, QTuningParameters> {
}

export class BaseTuningParametersDao
  extends SQDIDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersGraph, QTuningParameters>
	implements IBaseTuningParametersDao {
	
	static Find      = new DaoQueryDecorators<TuningParametersESelect>();
	static FindOne   = new DaoQueryDecorators<TuningParametersESelect>();
	static Search    = new DaoQueryDecorators<TuningParametersESelect>();
	static SearchOne = new DaoQueryDecorators<TuningParametersESelect>();
	static Save(
		config: TuningParametersGraph
	): PropertyDecorator {
		return Dao.BaseSave<TuningParametersGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(18)
	}
	
	constructor() {
		super(18)
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}

export class BaseUserDao
  extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser>
	implements IBaseUserDao {
	
	static Find      = new DaoQueryDecorators<UserESelect>();
	static FindOne   = new DaoQueryDecorators<UserESelect>();
	static Search    = new DaoQueryDecorators<UserESelect>();
	static SearchOne = new DaoQueryDecorators<UserESelect>();
	static Save(
		config: UserGraph
	): PropertyDecorator {
		return Dao.BaseSave<UserGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseUserRepositoryDao
  extends IDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryGraph, QUserRepository> {
}

export class BaseUserRepositoryDao
  extends SQDIDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryGraph, QUserRepository>
	implements IBaseUserRepositoryDao {
	
	static Find      = new DaoQueryDecorators<UserRepositoryESelect>();
	static FindOne   = new DaoQueryDecorators<UserRepositoryESelect>();
	static Search    = new DaoQueryDecorators<UserRepositoryESelect>();
	static SearchOne = new DaoQueryDecorators<UserRepositoryESelect>();
	static Save(
		config: UserRepositoryGraph
	): PropertyDecorator {
		return Dao.BaseSave<UserRepositoryGraph>(config);
  }

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
