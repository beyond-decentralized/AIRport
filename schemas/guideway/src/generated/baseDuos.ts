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
	IAgtRepositoryTransactionBlock,
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
	IAgtSharingMessage,
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
	IArchive,
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
	IDailyArchiveLog,
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
	IDailyTerminalSyncLog,
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
	IMonthlyArchiveLog,
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
	IMonthlyTerminalSyncLog,
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
	IRepositoryArchive,
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
	ISecurityAnswer,
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
	ISecurityQuestion,
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
	IServer,
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
	IServerSyncLog,
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
	ISyncLog,
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
	ITerminal,
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
	ITerminalRepository,
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
	ITuningParameters,
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
	IUser,
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
	IUserRepository,
	UserRepositoryESelect,
	UserRepositoryECreateColumns,
	UserRepositoryECreateProperties,
	UserRepositoryEUpdateColumns,
	UserRepositoryEUpdateProperties,
	UserRepositoryEId,
	UserRepositoryECascadeGraph,
	QUserRepository
} from './user/quserrepository'


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


export interface IBaseAgtRepositoryTransactionBlockDuo
  extends IDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDuo
  extends SQDIDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockECascadeGraph, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseAgtSharingMessageDuo
  extends IDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDuo
  extends SQDIDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageECascadeGraph, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseArchiveDuo
  extends IDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive> {
}

export class BaseArchiveDuo
  extends SQDIDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateProperties, ArchiveEId, ArchiveECascadeGraph, QArchive>
	implements IBaseArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseDailyArchiveLogDuo
  extends IDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDuo
  extends SQDIDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogECascadeGraph, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseDailyTerminalSyncLogDuo
  extends IDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDuo
  extends SQDIDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogECascadeGraph, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseMonthlyArchiveLogDuo
  extends IDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDuo
  extends SQDIDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogECascadeGraph, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseMonthlyTerminalSyncLogDuo
  extends IDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDuo
  extends SQDIDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogECascadeGraph, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateProperties, RepositoryEId, RepositoryECascadeGraph, QRepository>
	implements IBaseRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryArchiveDuo
  extends IDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDuo
  extends SQDIDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveECascadeGraph, QRepositoryArchive>
	implements IBaseRepositoryArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSecurityAnswerDuo
  extends IDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer> {
}

export class BaseSecurityAnswerDuo
  extends SQDIDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerECascadeGraph, QSecurityAnswer>
	implements IBaseSecurityAnswerDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSecurityQuestionDuo
  extends IDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion> {
}

export class BaseSecurityQuestionDuo
  extends SQDIDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionECascadeGraph, QSecurityQuestion>
	implements IBaseSecurityQuestionDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseServerDuo
  extends IDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer> {
}

export class BaseServerDuo
  extends SQDIDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateProperties, ServerEId, ServerECascadeGraph, QServer>
	implements IBaseServerDuo {

	static diSet(): boolean {
		return duoDiSet(17)
	}
	
	constructor() {
		super(17)
	}
}


export interface IBaseServerSyncLogDuo
  extends IDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog> {
}

export class BaseServerSyncLogDuo
  extends SQDIDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogECascadeGraph, QServerSyncLog>
	implements IBaseServerSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseSyncLogDuo
  extends IDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog> {
}

export class BaseSyncLogDuo
  extends SQDIDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateProperties, SyncLogEId, SyncLogECascadeGraph, QSyncLog>
	implements IBaseSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseTerminalDuo
  extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}

export class BaseTerminalDuo
  extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal>
	implements IBaseTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseTerminalRepositoryDuo
  extends IDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository> {
}

export class BaseTerminalRepositoryDuo
  extends SQDIDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryECascadeGraph, QTerminalRepository>
	implements IBaseTerminalRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseTuningParametersDuo
  extends IDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters> {
}

export class BaseTuningParametersDuo
  extends SQDIDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersECascadeGraph, QTuningParameters>
	implements IBaseTuningParametersDuo {

	static diSet(): boolean {
		return duoDiSet(18)
	}
	
	constructor() {
		super(18)
	}
}


export interface IBaseUserDuo
  extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}

export class BaseUserDuo
  extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser>
	implements IBaseUserDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseUserRepositoryDuo
  extends IDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository> {
}

export class BaseUserRepositoryDuo
  extends SQDIDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryECascadeGraph, QUserRepository>
	implements IBaseUserRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
