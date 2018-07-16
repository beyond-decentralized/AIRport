import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
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


export interface IBaseAgtRepositoryTransactionBlockDmo
  extends IDmo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDmo
  extends Dmo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['AgtRepositoryTransactionBlock']);
	}
}


export interface IBaseAgtSharingMessageDmo
  extends IDmo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDmo
  extends Dmo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['AgtSharingMessage']);
	}
}


export interface IBaseArchiveDmo
  extends IDmo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive> {
}

export class BaseArchiveDmo
  extends Dmo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, QArchive>
	implements IBaseArchiveDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Archive']);
	}
}


export interface IBaseDailyArchiveLogDmo
  extends IDmo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDmo
  extends Dmo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['DailyArchiveLog']);
	}
}


export interface IBaseDailyTerminalSyncLogDmo
  extends IDmo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDmo
  extends Dmo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['DailyTerminalSyncLog']);
	}
}


export interface IBaseMonthlyArchiveLogDmo
  extends IDmo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDmo
  extends Dmo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MonthlyArchiveLog']);
	}
}


export interface IBaseMonthlyTerminalSyncLogDmo
  extends IDmo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDmo
  extends Dmo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['MonthlyTerminalSyncLog']);
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


export interface IBaseRepositoryArchiveDmo
  extends IDmo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDmo
  extends Dmo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive>
	implements IBaseRepositoryArchiveDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['RepositoryArchive']);
	}
}


export interface IBaseSecurityAnswerDmo
  extends IDmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> {
}

export class BaseSecurityAnswerDmo
  extends Dmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer>
	implements IBaseSecurityAnswerDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SecurityAnswer']);
	}
}


export interface IBaseSecurityQuestionDmo
  extends IDmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> {
}

export class BaseSecurityQuestionDmo
  extends Dmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion>
	implements IBaseSecurityQuestionDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SecurityQuestion']);
	}
}


export interface IBaseServerDmo
  extends IDmo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer> {
}

export class BaseServerDmo
  extends Dmo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, QServer>
	implements IBaseServerDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['Server']);
	}
}


export interface IBaseServerSyncLogDmo
  extends IDmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> {
}

export class BaseServerSyncLogDmo
  extends Dmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog>
	implements IBaseServerSyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['ServerSyncLog']);
	}
}


export interface IBaseSyncLogDmo
  extends IDmo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> {
}

export class BaseSyncLogDmo
  extends Dmo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, QSyncLog>
	implements IBaseSyncLogDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['SyncLog']);
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


export interface IBaseTerminalRepositoryDmo
  extends IDmo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> {
}

export class BaseTerminalRepositoryDmo
  extends Dmo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository>
	implements IBaseTerminalRepositoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TerminalRepository']);
	}
}


export interface IBaseTuningParametersDmo
  extends IDmo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> {
}

export class BaseTuningParametersDmo
  extends Dmo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters>
	implements IBaseTuningParametersDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['TuningParameters']);
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


export interface IBaseUserRepositoryDmo
  extends IDmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> {
}

export class BaseUserRepositoryDmo
  extends Dmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository>
	implements IBaseUserRepositoryDmo {
	constructor() {
		super(Q.db.currentVersion.entityMapByName['UserRepository']);
	}
}
