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
	IAgtRepositoryTransactionBlock
} from './synchronization/agtrepositorytransactionblock'
import {
	AgtRepositoryTransactionBlockESelect,
	AgtRepositoryTransactionBlockECreateColumns,
	AgtRepositoryTransactionBlockECreateProperties,
	AgtRepositoryTransactionBlockEUpdateColumns,
	AgtRepositoryTransactionBlockEUpdateProperties,
	AgtRepositoryTransactionBlockEId,
	AgtRepositoryTransactionBlockECascadeGraph,
	QAgtRepositoryTransactionBlock
} from './synchronization/qagtrepositorytransactionblock'
import {
	IAgtSharingMessage
} from './synchronization/agtsharingmessage'
import {
	AgtSharingMessageESelect,
	AgtSharingMessageECreateColumns,
	AgtSharingMessageECreateProperties,
	AgtSharingMessageEUpdateColumns,
	AgtSharingMessageEUpdateProperties,
	AgtSharingMessageEId,
	AgtSharingMessageECascadeGraph,
	QAgtSharingMessage
} from './synchronization/qagtsharingmessage'
import {
	IArchive
} from './repository/archive'
import {
	ArchiveESelect,
	ArchiveECreateColumns,
	ArchiveECreateProperties,
	ArchiveEUpdateColumns,
	ArchiveEUpdateProperties,
	ArchiveEId,
	ArchiveECascadeGraph,
	QArchive
} from './repository/qarchive'
import {
	IDailyArchiveLog
} from './archive/dailyarchivelog'
import {
	DailyArchiveLogESelect,
	DailyArchiveLogECreateColumns,
	DailyArchiveLogECreateProperties,
	DailyArchiveLogEUpdateColumns,
	DailyArchiveLogEUpdateProperties,
	DailyArchiveLogEId,
	DailyArchiveLogECascadeGraph,
	QDailyArchiveLog
} from './archive/qdailyarchivelog'
import {
	IDailyTerminalSyncLog
} from './archive/dailyterminalsynclog'
import {
	DailyTerminalSyncLogESelect,
	DailyTerminalSyncLogECreateColumns,
	DailyTerminalSyncLogECreateProperties,
	DailyTerminalSyncLogEUpdateColumns,
	DailyTerminalSyncLogEUpdateProperties,
	DailyTerminalSyncLogEId,
	DailyTerminalSyncLogECascadeGraph,
	QDailyTerminalSyncLog
} from './archive/qdailyterminalsynclog'
import {
	IMonthlyArchiveLog
} from './archive/monthlyarchivelog'
import {
	MonthlyArchiveLogESelect,
	MonthlyArchiveLogECreateColumns,
	MonthlyArchiveLogECreateProperties,
	MonthlyArchiveLogEUpdateColumns,
	MonthlyArchiveLogEUpdateProperties,
	MonthlyArchiveLogEId,
	MonthlyArchiveLogECascadeGraph,
	QMonthlyArchiveLog
} from './archive/qmonthlyarchivelog'
import {
	IMonthlyTerminalSyncLog
} from './archive/monthlyterminalsynclog'
import {
	MonthlyTerminalSyncLogESelect,
	MonthlyTerminalSyncLogECreateColumns,
	MonthlyTerminalSyncLogECreateProperties,
	MonthlyTerminalSyncLogEUpdateColumns,
	MonthlyTerminalSyncLogEUpdateProperties,
	MonthlyTerminalSyncLogEId,
	MonthlyTerminalSyncLogECascadeGraph,
	QMonthlyTerminalSyncLog
} from './archive/qmonthlyterminalsynclog'
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
	IRepositoryArchive
} from './repository/repositoryarchive'
import {
	RepositoryArchiveESelect,
	RepositoryArchiveECreateColumns,
	RepositoryArchiveECreateProperties,
	RepositoryArchiveEUpdateColumns,
	RepositoryArchiveEUpdateProperties,
	RepositoryArchiveEId,
	RepositoryArchiveECascadeGraph,
	QRepositoryArchive
} from './repository/qrepositoryarchive'
import {
	ISecurityAnswer
} from './user/security/securityanswer'
import {
	SecurityAnswerESelect,
	SecurityAnswerECreateColumns,
	SecurityAnswerECreateProperties,
	SecurityAnswerEUpdateColumns,
	SecurityAnswerEUpdateProperties,
	SecurityAnswerEId,
	SecurityAnswerECascadeGraph,
	QSecurityAnswer
} from './user/security/qsecurityanswer'
import {
	ISecurityQuestion
} from './user/security/securityquestion'
import {
	SecurityQuestionESelect,
	SecurityQuestionECreateColumns,
	SecurityQuestionECreateProperties,
	SecurityQuestionEUpdateColumns,
	SecurityQuestionEUpdateProperties,
	SecurityQuestionEId,
	SecurityQuestionECascadeGraph,
	QSecurityQuestion
} from './user/security/qsecurityquestion'
import {
	IServer
} from './server/server'
import {
	ServerESelect,
	ServerECreateColumns,
	ServerECreateProperties,
	ServerEUpdateColumns,
	ServerEUpdateProperties,
	ServerEId,
	ServerECascadeGraph,
	QServer
} from './server/qserver'
import {
	IServerSyncLog
} from './server/serversynclog'
import {
	ServerSyncLogESelect,
	ServerSyncLogECreateColumns,
	ServerSyncLogECreateProperties,
	ServerSyncLogEUpdateColumns,
	ServerSyncLogEUpdateProperties,
	ServerSyncLogEId,
	ServerSyncLogECascadeGraph,
	QServerSyncLog
} from './server/qserversynclog'
import {
	ISyncLog
} from './synchronization/synclog'
import {
	SyncLogESelect,
	SyncLogECreateColumns,
	SyncLogECreateProperties,
	SyncLogEUpdateColumns,
	SyncLogEUpdateProperties,
	SyncLogEId,
	SyncLogECascadeGraph,
	QSyncLog
} from './synchronization/qsynclog'
import {
	ITerminal
} from './terminal/terminal'
import {
	TerminalESelect,
	TerminalECreateColumns,
	TerminalECreateProperties,
	TerminalEUpdateColumns,
	TerminalEUpdateProperties,
	TerminalEId,
	TerminalECascadeGraph,
	QTerminal
} from './terminal/qterminal'
import {
	ITerminalRepository
} from './terminal/terminalrepository'
import {
	TerminalRepositoryESelect,
	TerminalRepositoryECreateColumns,
	TerminalRepositoryECreateProperties,
	TerminalRepositoryEUpdateColumns,
	TerminalRepositoryEUpdateProperties,
	TerminalRepositoryEId,
	TerminalRepositoryECascadeGraph,
	QTerminalRepository
} from './terminal/qterminalrepository'
import {
	ITuningParameters
} from './tuning/tuningparameters'
import {
	TuningParametersESelect,
	TuningParametersECreateColumns,
	TuningParametersECreateProperties,
	TuningParametersEUpdateColumns,
	TuningParametersEUpdateProperties,
	TuningParametersEId,
	TuningParametersECascadeGraph,
	QTuningParameters
} from './tuning/qtuningparameters'
import {
	IUser
} from './user/user'
import {
	UserESelect,
	UserECreateColumns,
	UserECreateProperties,
	UserEUpdateColumns,
	UserEUpdateProperties,
	UserEId,
	UserECascadeGraph,
	QUser
} from './user/quser'
import {
	IUserRepository
} from './user/userrepository'
import {
	UserRepositoryESelect,
	UserRepositoryECreateColumns,
	UserRepositoryECreateProperties,
	UserRepositoryEUpdateColumns,
	UserRepositoryEUpdateProperties,
	UserRepositoryEId,
	UserRepositoryECascadeGraph,
	QUserRepository
} from './user/quserrepository'


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


export interface IBaseAgtRepositoryTransactionBlockDao
  extends IDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDao
  extends SQDIDao<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDao {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseAgtSharingMessageDao
  extends IDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDao
  extends SQDIDao<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDao {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseArchiveDao
  extends IDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> {
}

export class BaseArchiveDao
  extends SQDIDao<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive>
	implements IBaseArchiveDao {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseDailyArchiveLogDao
  extends IDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDao
  extends SQDIDao<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDao {

	static diSet(): boolean {
		return duoDiSet(18)
	}
	
	constructor() {
		super(18)
	}
}


export interface IBaseDailyTerminalSyncLogDao
  extends IDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDao
  extends SQDIDao<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDao {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseMonthlyArchiveLogDao
  extends IDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDao
  extends SQDIDao<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDao {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseMonthlyTerminalSyncLogDao
  extends IDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDao
  extends SQDIDao<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDao {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseRepositoryDao
  extends IDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}

export class BaseRepositoryDao
  extends SQDIDao<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository>
	implements IBaseRepositoryDao {

	static diSet(): boolean {
		return duoDiSet(17)
	}
	
	constructor() {
		super(17)
	}
}


export interface IBaseRepositoryArchiveDao
  extends IDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDao
  extends SQDIDao<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive>
	implements IBaseRepositoryArchiveDao {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}


export interface IBaseSecurityAnswerDao
  extends IDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> {
}

export class BaseSecurityAnswerDao
  extends SQDIDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer>
	implements IBaseSecurityAnswerDao {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseSecurityQuestionDao
  extends IDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> {
}

export class BaseSecurityQuestionDao
  extends SQDIDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion>
	implements IBaseSecurityQuestionDao {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseServerDao
  extends IDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> {
}

export class BaseServerDao
  extends SQDIDao<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer>
	implements IBaseServerDao {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseServerSyncLogDao
  extends IDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> {
}

export class BaseServerSyncLogDao
  extends SQDIDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog>
	implements IBaseServerSyncLogDao {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseSyncLogDao
  extends IDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> {
}

export class BaseSyncLogDao
  extends SQDIDao<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog>
	implements IBaseSyncLogDao {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseTerminalDao
  extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}

export class BaseTerminalDao
  extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal>
	implements IBaseTerminalDao {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseTerminalRepositoryDao
  extends IDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> {
}

export class BaseTerminalRepositoryDao
  extends SQDIDao<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository>
	implements IBaseTerminalRepositoryDao {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseTuningParametersDao
  extends IDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> {
}

export class BaseTuningParametersDao
  extends SQDIDao<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters>
	implements IBaseTuningParametersDao {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}

export class BaseUserDao
  extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser>
	implements IBaseUserDao {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseUserRepositoryDao
  extends IDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> {
}

export class BaseUserRepositoryDao
  extends SQDIDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository>
	implements IBaseUserRepositoryDao {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}
