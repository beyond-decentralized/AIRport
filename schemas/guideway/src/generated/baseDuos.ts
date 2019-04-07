import {
	IDuo,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { Q } from './qSchema';
import {
	IAgtRepositoryTransactionBlock,
	AgtRepositoryTransactionBlockESelect,
	AgtRepositoryTransactionBlockECreateColumns,
	AgtRepositoryTransactionBlockECreateProperties,
	AgtRepositoryTransactionBlockEUpdateColumns,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockEId,
	QAgtRepositoryTransactionBlock
} from './synchronization/qagtrepositorytransactionblock';
import {
	IAgtSharingMessage,
	AgtSharingMessageESelect,
	AgtSharingMessageECreateColumns,
	AgtSharingMessageECreateProperties,
	AgtSharingMessageEUpdateColumns,
	AgtSharingMessageEUpdateProperties,
	AgtSharingMessageEId,
	QAgtSharingMessage
} from './synchronization/qagtsharingmessage';
import {
	IArchive,
	ArchiveESelect,
	ArchiveECreateColumns,
	ArchiveECreateProperties,
	ArchiveEUpdateColumns,
	ArchiveEUpdateProperties,
	ArchiveEId,
	QArchive
} from './repository/qarchive';
import {
	IDailyArchiveLog,
	DailyArchiveLogESelect,
	DailyArchiveLogECreateColumns,
	DailyArchiveLogECreateProperties,
	DailyArchiveLogEUpdateColumns,
	DailyArchiveLogEUpdateProperties,
	DailyArchiveLogEId,
	QDailyArchiveLog
} from './archive/qdailyarchivelog';
import {
	IDailyTerminalSyncLog,
	DailyTerminalSyncLogESelect,
	DailyTerminalSyncLogECreateColumns,
	DailyTerminalSyncLogECreateProperties,
	DailyTerminalSyncLogEUpdateColumns,
	DailyTerminalSyncLogEUpdateProperties,
	DailyTerminalSyncLogEId,
	QDailyTerminalSyncLog
} from './archive/qdailyterminalsynclog';
import {
	IMonthlyArchiveLog,
	MonthlyArchiveLogESelect,
	MonthlyArchiveLogECreateColumns,
	MonthlyArchiveLogECreateProperties,
	MonthlyArchiveLogEUpdateColumns,
	MonthlyArchiveLogEUpdateProperties,
	MonthlyArchiveLogEId,
	QMonthlyArchiveLog
} from './archive/qmonthlyarchivelog';
import {
	IMonthlyTerminalSyncLog,
	MonthlyTerminalSyncLogESelect,
	MonthlyTerminalSyncLogECreateColumns,
	MonthlyTerminalSyncLogECreateProperties,
	MonthlyTerminalSyncLogEUpdateColumns,
	MonthlyTerminalSyncLogEUpdateProperties,
	MonthlyTerminalSyncLogEId,
	QMonthlyTerminalSyncLog
} from './archive/qmonthlyterminalsynclog';
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
	IRepositoryArchive,
	RepositoryArchiveESelect,
	RepositoryArchiveECreateColumns,
	RepositoryArchiveECreateProperties,
	RepositoryArchiveEUpdateColumns,
	RepositoryArchiveEUpdateProperties,
	RepositoryArchiveEId,
	QRepositoryArchive
} from './repository/qrepositoryarchive';
import {
	ISecurityAnswer,
	SecurityAnswerESelect,
	SecurityAnswerECreateColumns,
	SecurityAnswerECreateProperties,
	SecurityAnswerEUpdateColumns,
	SecurityAnswerEUpdateProperties,
	SecurityAnswerEId,
	QSecurityAnswer
} from './user/security/qsecurityanswer';
import {
	ISecurityQuestion,
	SecurityQuestionESelect,
	SecurityQuestionECreateColumns,
	SecurityQuestionECreateProperties,
	SecurityQuestionEUpdateColumns,
	SecurityQuestionEUpdateProperties,
	SecurityQuestionEId,
	QSecurityQuestion
} from './user/security/qsecurityquestion';
import {
	IServer,
	ServerESelect,
	ServerECreateColumns,
	ServerECreateProperties,
	ServerEUpdateColumns,
	ServerEUpdateProperties,
	ServerEId,
	QServer
} from './server/qserver';
import {
	IServerSyncLog,
	ServerSyncLogESelect,
	ServerSyncLogECreateColumns,
	ServerSyncLogECreateProperties,
	ServerSyncLogEUpdateColumns,
	ServerSyncLogEUpdateProperties,
	ServerSyncLogEId,
	QServerSyncLog
} from './server/qserversynclog';
import {
	ISyncLog,
	SyncLogESelect,
	SyncLogECreateColumns,
	SyncLogECreateProperties,
	SyncLogEUpdateColumns,
	SyncLogEUpdateProperties,
	SyncLogEId,
	QSyncLog
} from './synchronization/qsynclog';
import {
	ITerminal,
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	QTerminal
} from './terminal/qterminal';
import {
	ITerminalRepository,
	TerminalRepositoryESelect,
	TerminalRepositoryECreateColumns,
	TerminalRepositoryECreateProperties,
	TerminalRepositoryEUpdateColumns,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryEId,
	QTerminalRepository
} from './terminal/qterminalrepository';
import {
	ITuningParameters,
	TuningParametersESelect,
	TuningParametersECreateColumns,
	TuningParametersECreateProperties,
	TuningParametersEUpdateColumns,
	TuningParametersEUpdateProperties,
	TuningParametersEId,
	QTuningParameters
} from './tuning/qtuningparameters';
import {
	IUser,
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	QUser
} from './user/quser';
import {
	IUserRepository,
	UserRepositoryESelect,
	UserRepositoryECreateColumns,
	UserRepositoryECreateProperties,
	UserRepositoryEUpdateColumns,
	UserRepositoryEUpdateProperties,
	UserRepositoryEId,
	QUserRepository
} from './user/quserrepository';


// Schema Q object Dependency Injection readiness detection DAO
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity>
	extends Duo<Entity,
		EntitySelect,
		EntityCreate,
		EntityUpdateProperties,
		EntityId,
		IQE> {

	static diSet(): boolean {
		return Q.db as any
	}

	constructor(
		dbEntityName: string
	) {
		super(dbEntityName, Q)
	}
}


export interface IBaseAgtRepositoryTransactionBlockDuo
  extends IDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDuo
  extends SQDIDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDuo {
	constructor() {
		super('AgtRepositoryTransactionBlock');
	}
}


export interface IBaseAgtSharingMessageDuo
  extends IDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDuo
  extends SQDIDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDuo {
	constructor() {
		super('AgtSharingMessage');
	}
}


export interface IBaseArchiveDuo
  extends IDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> {
}

export class BaseArchiveDuo
  extends SQDIDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive>
	implements IBaseArchiveDuo {
	constructor() {
		super('Archive');
	}
}


export interface IBaseDailyArchiveLogDuo
  extends IDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDuo
  extends SQDIDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDuo {
	constructor() {
		super('DailyArchiveLog');
	}
}


export interface IBaseDailyTerminalSyncLogDuo
  extends IDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDuo
  extends SQDIDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDuo {
	constructor() {
		super('DailyTerminalSyncLog');
	}
}


export interface IBaseMonthlyArchiveLogDuo
  extends IDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDuo
  extends SQDIDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDuo {
	constructor() {
		super('MonthlyArchiveLog');
	}
}


export interface IBaseMonthlyTerminalSyncLogDuo
  extends IDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDuo
  extends SQDIDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDuo {
	constructor() {
		super('MonthlyTerminalSyncLog');
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, QRepository>
	implements IBaseRepositoryDuo {
	constructor() {
		super('Repository');
	}
}


export interface IBaseRepositoryArchiveDuo
  extends IDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDuo
  extends SQDIDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive>
	implements IBaseRepositoryArchiveDuo {
	constructor() {
		super('RepositoryArchive');
	}
}


export interface IBaseSecurityAnswerDuo
  extends IDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> {
}

export class BaseSecurityAnswerDuo
  extends SQDIDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer>
	implements IBaseSecurityAnswerDuo {
	constructor() {
		super('SecurityAnswer');
	}
}


export interface IBaseSecurityQuestionDuo
  extends IDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> {
}

export class BaseSecurityQuestionDuo
  extends SQDIDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion>
	implements IBaseSecurityQuestionDuo {
	constructor() {
		super('SecurityQuestion');
	}
}


export interface IBaseServerDuo
  extends IDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> {
}

export class BaseServerDuo
  extends SQDIDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer>
	implements IBaseServerDuo {
	constructor() {
		super('Server');
	}
}


export interface IBaseServerSyncLogDuo
  extends IDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> {
}

export class BaseServerSyncLogDuo
  extends SQDIDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog>
	implements IBaseServerSyncLogDuo {
	constructor() {
		super('ServerSyncLog');
	}
}


export interface IBaseSyncLogDuo
  extends IDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> {
}

export class BaseSyncLogDuo
  extends SQDIDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog>
	implements IBaseSyncLogDuo {
	constructor() {
		super('SyncLog');
	}
}


export interface IBaseTerminalDuo
  extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}

export class BaseTerminalDuo
  extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal>
	implements IBaseTerminalDuo {
	constructor() {
		super('Terminal');
	}
}


export interface IBaseTerminalRepositoryDuo
  extends IDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> {
}

export class BaseTerminalRepositoryDuo
  extends SQDIDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository>
	implements IBaseTerminalRepositoryDuo {
	constructor() {
		super('TerminalRepository');
	}
}


export interface IBaseTuningParametersDuo
  extends IDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> {
}

export class BaseTuningParametersDuo
  extends SQDIDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters>
	implements IBaseTuningParametersDuo {
	constructor() {
		super('TuningParameters');
	}
}


export interface IBaseUserDuo
  extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}

export class BaseUserDuo
  extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser>
	implements IBaseUserDuo {
	constructor() {
		super('User');
	}
}


export interface IBaseUserRepositoryDuo
  extends IDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> {
}

export class BaseUserRepositoryDuo
  extends SQDIDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository>
	implements IBaseUserRepositoryDuo {
	constructor() {
		super('UserRepository');
	}
}
