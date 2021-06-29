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
	IDuo,
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
} from '@airport/air-control';
import {
	Duo,
} from '@airport/check-in';
import {
	EntityId as DbEntityId,
} from '@airport/ground-control';
import {
	Q,
	duoDiSet,
} from './qSchema';


// Schema Q object Dependency Injection readiness detection Duo
export class SQDIDuo<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
  EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity<Entity>>
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


export interface IBaseAgtRepositoryTransactionBlockDuo
  extends IDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockGraph, QAgtRepositoryTransactionBlock> {
}

export class BaseAgtRepositoryTransactionBlockDuo
  extends SQDIDuo<IAgtRepositoryTransactionBlock, AgtRepositoryTransactionBlockESelect, AgtRepositoryTransactionBlockECreateProperties, AgtRepositoryTransactionBlockEUpdateColumns, AgtRepositoryTransactionBlockEUpdateProperties, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockGraph, QAgtRepositoryTransactionBlock>
	implements IBaseAgtRepositoryTransactionBlockDuo {

	static diSet(): boolean {
		return duoDiSet(8)
	}
	
	constructor() {
		super(8)
	}
}


export interface IBaseAgtSharingMessageDuo
  extends IDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageGraph, QAgtSharingMessage> {
}

export class BaseAgtSharingMessageDuo
  extends SQDIDuo<IAgtSharingMessage, AgtSharingMessageESelect, AgtSharingMessageECreateProperties, AgtSharingMessageEUpdateColumns, AgtSharingMessageEUpdateProperties, AgtSharingMessageEId, AgtSharingMessageGraph, QAgtSharingMessage>
	implements IBaseAgtSharingMessageDuo {

	static diSet(): boolean {
		return duoDiSet(1)
	}
	
	constructor() {
		super(1)
	}
}


export interface IBaseArchiveDuo
  extends IDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveGraph, QArchive> {
}

export class BaseArchiveDuo
  extends SQDIDuo<IArchive, ArchiveESelect, ArchiveECreateProperties, ArchiveEUpdateColumns, ArchiveEUpdateProperties, ArchiveEId, ArchiveGraph, QArchive>
	implements IBaseArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(14)
	}
	
	constructor() {
		super(14)
	}
}


export interface IBaseDailyArchiveLogDuo
  extends IDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogGraph, QDailyArchiveLog> {
}

export class BaseDailyArchiveLogDuo
  extends SQDIDuo<IDailyArchiveLog, DailyArchiveLogESelect, DailyArchiveLogECreateProperties, DailyArchiveLogEUpdateColumns, DailyArchiveLogEUpdateProperties, DailyArchiveLogEId, DailyArchiveLogGraph, QDailyArchiveLog>
	implements IBaseDailyArchiveLogDuo {

	static diSet(): boolean {
		return duoDiSet(10)
	}
	
	constructor() {
		super(10)
	}
}


export interface IBaseDailyTerminalSyncLogDuo
  extends IDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogGraph, QDailyTerminalSyncLog> {
}

export class BaseDailyTerminalSyncLogDuo
  extends SQDIDuo<IDailyTerminalSyncLog, DailyTerminalSyncLogESelect, DailyTerminalSyncLogECreateProperties, DailyTerminalSyncLogEUpdateColumns, DailyTerminalSyncLogEUpdateProperties, DailyTerminalSyncLogEId, DailyTerminalSyncLogGraph, QDailyTerminalSyncLog>
	implements IBaseDailyTerminalSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(11)
	}
	
	constructor() {
		super(11)
	}
}


export interface IBaseMonthlyArchiveLogDuo
  extends IDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogGraph, QMonthlyArchiveLog> {
}

export class BaseMonthlyArchiveLogDuo
  extends SQDIDuo<IMonthlyArchiveLog, MonthlyArchiveLogESelect, MonthlyArchiveLogECreateProperties, MonthlyArchiveLogEUpdateColumns, MonthlyArchiveLogEUpdateProperties, MonthlyArchiveLogEId, MonthlyArchiveLogGraph, QMonthlyArchiveLog>
	implements IBaseMonthlyArchiveLogDuo {

	static diSet(): boolean {
		return duoDiSet(12)
	}
	
	constructor() {
		super(12)
	}
}


export interface IBaseMonthlyTerminalSyncLogDuo
  extends IDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogGraph, QMonthlyTerminalSyncLog> {
}

export class BaseMonthlyTerminalSyncLogDuo
  extends SQDIDuo<IMonthlyTerminalSyncLog, MonthlyTerminalSyncLogESelect, MonthlyTerminalSyncLogECreateProperties, MonthlyTerminalSyncLogEUpdateColumns, MonthlyTerminalSyncLogEUpdateProperties, MonthlyTerminalSyncLogEId, MonthlyTerminalSyncLogGraph, QMonthlyTerminalSyncLog>
	implements IBaseMonthlyTerminalSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(13)
	}
	
	constructor() {
		super(13)
	}
}


export interface IBaseRepositoryDuo
  extends IDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository> {
}

export class BaseRepositoryDuo
  extends SQDIDuo<IRepository, RepositoryESelect, RepositoryECreateProperties, RepositoryEUpdateColumns, RepositoryEUpdateProperties, RepositoryEId, RepositoryGraph, QRepository>
	implements IBaseRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(9)
	}
	
	constructor() {
		super(9)
	}
}


export interface IBaseRepositoryArchiveDuo
  extends IDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveGraph, QRepositoryArchive> {
}

export class BaseRepositoryArchiveDuo
  extends SQDIDuo<IRepositoryArchive, RepositoryArchiveESelect, RepositoryArchiveECreateProperties, RepositoryArchiveEUpdateColumns, RepositoryArchiveEUpdateProperties, RepositoryArchiveEId, RepositoryArchiveGraph, QRepositoryArchive>
	implements IBaseRepositoryArchiveDuo {

	static diSet(): boolean {
		return duoDiSet(15)
	}
	
	constructor() {
		super(15)
	}
}


export interface IBaseSecurityAnswerDuo
  extends IDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerGraph, QSecurityAnswer> {
}

export class BaseSecurityAnswerDuo
  extends SQDIDuo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreateProperties, SecurityAnswerEUpdateColumns, SecurityAnswerEUpdateProperties, SecurityAnswerEId, SecurityAnswerGraph, QSecurityAnswer>
	implements IBaseSecurityAnswerDuo {

	static diSet(): boolean {
		return duoDiSet(3)
	}
	
	constructor() {
		super(3)
	}
}


export interface IBaseSecurityQuestionDuo
  extends IDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionGraph, QSecurityQuestion> {
}

export class BaseSecurityQuestionDuo
  extends SQDIDuo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreateProperties, SecurityQuestionEUpdateColumns, SecurityQuestionEUpdateProperties, SecurityQuestionEId, SecurityQuestionGraph, QSecurityQuestion>
	implements IBaseSecurityQuestionDuo {

	static diSet(): boolean {
		return duoDiSet(2)
	}
	
	constructor() {
		super(2)
	}
}


export interface IBaseServerDuo
  extends IDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerGraph, QServer> {
}

export class BaseServerDuo
  extends SQDIDuo<IServer, ServerESelect, ServerECreateProperties, ServerEUpdateColumns, ServerEUpdateProperties, ServerEId, ServerGraph, QServer>
	implements IBaseServerDuo {

	static diSet(): boolean {
		return duoDiSet(17)
	}
	
	constructor() {
		super(17)
	}
}


export interface IBaseServerSyncLogDuo
  extends IDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogGraph, QServerSyncLog> {
}

export class BaseServerSyncLogDuo
  extends SQDIDuo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreateProperties, ServerSyncLogEUpdateColumns, ServerSyncLogEUpdateProperties, ServerSyncLogEId, ServerSyncLogGraph, QServerSyncLog>
	implements IBaseServerSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(16)
	}
	
	constructor() {
		super(16)
	}
}


export interface IBaseSyncLogDuo
  extends IDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogGraph, QSyncLog> {
}

export class BaseSyncLogDuo
  extends SQDIDuo<ISyncLog, SyncLogESelect, SyncLogECreateProperties, SyncLogEUpdateColumns, SyncLogEUpdateProperties, SyncLogEId, SyncLogGraph, QSyncLog>
	implements IBaseSyncLogDuo {

	static diSet(): boolean {
		return duoDiSet(0)
	}
	
	constructor() {
		super(0)
	}
}


export interface IBaseTerminalDuo
  extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}

export class BaseTerminalDuo
  extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal>
	implements IBaseTerminalDuo {

	static diSet(): boolean {
		return duoDiSet(7)
	}
	
	constructor() {
		super(7)
	}
}


export interface IBaseTerminalRepositoryDuo
  extends IDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryGraph, QTerminalRepository> {
}

export class BaseTerminalRepositoryDuo
  extends SQDIDuo<ITerminalRepository, TerminalRepositoryESelect, TerminalRepositoryECreateProperties, TerminalRepositoryEUpdateColumns, TerminalRepositoryEUpdateProperties, TerminalRepositoryEId, TerminalRepositoryGraph, QTerminalRepository>
	implements IBaseTerminalRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(6)
	}
	
	constructor() {
		super(6)
	}
}


export interface IBaseTuningParametersDuo
  extends IDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersGraph, QTuningParameters> {
}

export class BaseTuningParametersDuo
  extends SQDIDuo<ITuningParameters, TuningParametersESelect, TuningParametersECreateProperties, TuningParametersEUpdateColumns, TuningParametersEUpdateProperties, TuningParametersEId, TuningParametersGraph, QTuningParameters>
	implements IBaseTuningParametersDuo {

	static diSet(): boolean {
		return duoDiSet(18)
	}
	
	constructor() {
		super(18)
	}
}


export interface IBaseUserDuo
  extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}

export class BaseUserDuo
  extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser>
	implements IBaseUserDuo {

	static diSet(): boolean {
		return duoDiSet(5)
	}
	
	constructor() {
		super(5)
	}
}


export interface IBaseUserRepositoryDuo
  extends IDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryGraph, QUserRepository> {
}

export class BaseUserRepositoryDuo
  extends SQDIDuo<IUserRepository, UserRepositoryESelect, UserRepositoryECreateProperties, UserRepositoryEUpdateColumns, UserRepositoryEUpdateProperties, UserRepositoryEId, UserRepositoryGraph, QUserRepository>
	implements IBaseUserRepositoryDuo {

	static diSet(): boolean {
		return duoDiSet(4)
	}
	
	constructor() {
		super(4)
	}
}
