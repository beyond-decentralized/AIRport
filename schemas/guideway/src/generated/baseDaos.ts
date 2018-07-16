import {
	IDao, 
	IUtils 
} from '@airport/air-control';
import { Dao } from '@airport/check-in';
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


export interface IBaseAgtRepositoryTransactionBlockDao
  extends IDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDao
  extends Dao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['AgtRepositoryTransactionBlock'], Q, utils);
	}
}


export interface IBaseAgtSharingMessageDao
  extends IDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDao
  extends Dao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['AgtSharingMessage'], Q, utils);
	}
}


export interface IBaseArchiveDao
  extends IDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, QArchive> {
}

export class BaseArchiveDao
  extends Dao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, QArchive>
	implements IBaseArchiveDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Archive'], Q, utils);
	}
}


export interface IBaseDailyArchiveLogDao
  extends IDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDao
  extends Dao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['DailyArchiveLog'], Q, utils);
	}
}


export interface IBaseDailyTerminalSyncLogDao
  extends IDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDao
  extends Dao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['DailyTerminalSyncLog'], Q, utils);
	}
}


export interface IBaseMonthlyArchiveLogDao
  extends IDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDao
  extends Dao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['MonthlyArchiveLog'], Q, utils);
	}
}


export interface IBaseMonthlyTerminalSyncLogDao
  extends IDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDao
  extends Dao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['MonthlyTerminalSyncLog'], Q, utils);
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


export interface IBaseRepositoryArchiveDao
  extends IDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDao
  extends Dao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, QRepositoryArchive>
	implements IBaseRepositoryArchiveDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['RepositoryArchive'], Q, utils);
	}
}


export interface IBaseSecurityAnswerDao
  extends IDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer> {
}

export class BaseSecurityAnswerDao
  extends Dao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, QSecurityAnswer>
	implements IBaseSecurityAnswerDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SecurityAnswer'], Q, utils);
	}
}


export interface IBaseSecurityQuestionDao
  extends IDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion> {
}

export class BaseSecurityQuestionDao
  extends Dao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, QSecurityQuestion>
	implements IBaseSecurityQuestionDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SecurityQuestion'], Q, utils);
	}
}


export interface IBaseServerDao
  extends IDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, QServer> {
}

export class BaseServerDao
  extends Dao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, QServer>
	implements IBaseServerDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['Server'], Q, utils);
	}
}


export interface IBaseServerSyncLogDao
  extends IDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog> {
}

export class BaseServerSyncLogDao
  extends Dao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, QServerSyncLog>
	implements IBaseServerSyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['ServerSyncLog'], Q, utils);
	}
}


export interface IBaseSyncLogDao
  extends IDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, QSyncLog> {
}

export class BaseSyncLogDao
  extends Dao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, QSyncLog>
	implements IBaseSyncLogDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['SyncLog'], Q, utils);
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


export interface IBaseTerminalRepositoryDao
  extends IDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository> {
}

export class BaseTerminalRepositoryDao
  extends Dao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, QTerminalRepository>
	implements IBaseTerminalRepositoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['TerminalRepository'], Q, utils);
	}
}


export interface IBaseTuningParametersDao
  extends IDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters> {
}

export class BaseTuningParametersDao
  extends Dao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, QTuningParameters>
	implements IBaseTuningParametersDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['TuningParameters'], Q, utils);
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


export interface IBaseUserRepositoryDao
  extends IDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository> {
}

export class BaseUserRepositoryDao
  extends Dao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, QUserRepository>
	implements IBaseUserRepositoryDao {
	constructor(
		utils: IUtils
	) {
		super(Q.db.currentVersion.entityMapByName['UserRepository'], Q, utils);
	}
}
