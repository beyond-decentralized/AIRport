import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import {
	IDatabase,
	DatabaseESelect,
	DatabaseECreate,
	DatabaseEUpdate,
	DatabaseEId,
	QDatabase
} from './user/qdatabase';
import {
	IDatabaseRepository,
	DatabaseRepositoryESelect,
	DatabaseRepositoryECreate,
	DatabaseRepositoryEUpdate,
	DatabaseRepositoryEId,
	QDatabaseRepository
} from './user/qdatabaserepository';
import {
	IDatabaseRepositoryVerificationStage,
	DatabaseRepositoryVerificationStageESelect,
	DatabaseRepositoryVerificationStageECreate,
	DatabaseRepositoryVerificationStageEUpdate,
	DatabaseRepositoryVerificationStageEId,
	QDatabaseRepositoryVerificationStage
} from './user/qdatabaserepositoryverificationstage';
import {
	IDatabaseSyncLog,
	DatabaseSyncLogESelect,
	DatabaseSyncLogECreate,
	DatabaseSyncLogEUpdate,
	DatabaseSyncLogEId,
	QDatabaseSyncLog
} from './syncronization/qdatabasesynclog';
import {
	IDatabaseSyncLogVerificationStage,
	DatabaseSyncLogVerificationStageESelect,
	DatabaseSyncLogVerificationStageECreate,
	DatabaseSyncLogVerificationStageEUpdate,
	DatabaseSyncLogVerificationStageEId,
	QDatabaseSyncLogVerificationStage
} from './syncronization/qdatabasesynclogverificationstage';
import {
	IDatabaseVerificationStage,
	DatabaseVerificationStageESelect,
	DatabaseVerificationStageECreate,
	DatabaseVerificationStageEUpdate,
	DatabaseVerificationStageEId,
	QDatabaseVerificationStage
} from './user/qdatabaseverificationstage';
import {
	IRepository,
	RepositoryESelect,
	RepositoryECreate,
	RepositoryEUpdate,
	RepositoryEId,
	QRepository
} from './repository/qrepository';
import {
	IRepositoryDatabase,
	RepositoryDatabaseESelect,
	RepositoryDatabaseECreate,
	RepositoryDatabaseEUpdate,
	RepositoryDatabaseEId,
	QRepositoryDatabase
} from './repository/qrepositorydatabase';
import {
	ISecurityAnswer,
	SecurityAnswerESelect,
	SecurityAnswerECreate,
	SecurityAnswerEUpdate,
	SecurityAnswerEId,
	QSecurityAnswer
} from './user/security/qsecurityanswer';
import {
	ISecurityQuestion,
	SecurityQuestionESelect,
	SecurityQuestionECreate,
	SecurityQuestionEUpdate,
	SecurityQuestionEId,
	QSecurityQuestion
} from './user/security/qsecurityquestion';
import {
	IServer,
	ServerESelect,
	ServerECreate,
	ServerEUpdate,
	ServerEId,
	QServer
} from './server/qserver';
import {
	IServerSyncLog,
	ServerSyncLogESelect,
	ServerSyncLogECreate,
	ServerSyncLogEUpdate,
	ServerSyncLogEId,
	QServerSyncLog
} from './server/qserversynclog';
import {
	IShardedRecord,
	ShardedRecordESelect,
	ShardedRecordECreate,
	ShardedRecordEUpdate,
	ShardedRecordEId,
	QShardedRecord
} from './qshardedrecord';
import {
	ISyncLog,
	SyncLogESelect,
	SyncLogECreate,
	SyncLogEUpdate,
	SyncLogEId,
	QSyncLog
} from './syncronization/qsynclog';
import {
	ISyncRecord,
	SyncRecordESelect,
	SyncRecordECreate,
	SyncRecordEUpdate,
	SyncRecordEId,
	QSyncRecord
} from './syncronization/qsyncrecord';
import {
	ITuningParameters,
	TuningParametersESelect,
	TuningParametersECreate,
	TuningParametersEUpdate,
	TuningParametersEId,
	QTuningParameters
} from './tuning/qtuningparameters';
import {
	IUser,
	UserESelect,
	UserECreate,
	UserEUpdate,
	UserEId,
	QUser
} from './user/quser';
import {
	IUserRepository,
	UserRepositoryESelect,
	UserRepositoryECreate,
	UserRepositoryEUpdate,
	UserRepositoryEId,
	QUserRepository
} from './user/quserrepository';


export interface IBaseDatabaseDmo
  extends IDmo<IDatabase, DatabaseESelect, DatabaseECreate, DatabaseEUpdate, DatabaseEId, QDatabase> {
}

export class BaseDatabaseDmo
  extends Dmo<IDatabase, DatabaseESelect, DatabaseECreate, DatabaseEUpdate, DatabaseEId, QDatabase>
	implements IBaseDatabaseDmo {
}


export interface IBaseDatabaseRepositoryDmo
  extends IDmo<IDatabaseRepository, DatabaseRepositoryESelect, DatabaseRepositoryECreate, DatabaseRepositoryEUpdate, DatabaseRepositoryEId, QDatabaseRepository> {
}

export class BaseDatabaseRepositoryDmo
  extends Dmo<IDatabaseRepository, DatabaseRepositoryESelect, DatabaseRepositoryECreate, DatabaseRepositoryEUpdate, DatabaseRepositoryEId, QDatabaseRepository>
	implements IBaseDatabaseRepositoryDmo {
}


export interface IBaseDatabaseRepositoryVerificationStageDmo
  extends IDmo<IDatabaseRepositoryVerificationStage, DatabaseRepositoryVerificationStageESelect, DatabaseRepositoryVerificationStageECreate, DatabaseRepositoryVerificationStageEUpdate, DatabaseRepositoryVerificationStageEId, QDatabaseRepositoryVerificationStage> {
}

export class BaseDatabaseRepositoryVerificationStageDmo
  extends Dmo<IDatabaseRepositoryVerificationStage, DatabaseRepositoryVerificationStageESelect, DatabaseRepositoryVerificationStageECreate, DatabaseRepositoryVerificationStageEUpdate, DatabaseRepositoryVerificationStageEId, QDatabaseRepositoryVerificationStage>
	implements IBaseDatabaseRepositoryVerificationStageDmo {
}


export interface IBaseDatabaseSyncLogDmo
  extends IDmo<IDatabaseSyncLog, DatabaseSyncLogESelect, DatabaseSyncLogECreate, DatabaseSyncLogEUpdate, DatabaseSyncLogEId, QDatabaseSyncLog> {
}

export class BaseDatabaseSyncLogDmo
  extends Dmo<IDatabaseSyncLog, DatabaseSyncLogESelect, DatabaseSyncLogECreate, DatabaseSyncLogEUpdate, DatabaseSyncLogEId, QDatabaseSyncLog>
	implements IBaseDatabaseSyncLogDmo {
}


export interface IBaseDatabaseSyncLogVerificationStageDmo
  extends IDmo<IDatabaseSyncLogVerificationStage, DatabaseSyncLogVerificationStageESelect, DatabaseSyncLogVerificationStageECreate, DatabaseSyncLogVerificationStageEUpdate, DatabaseSyncLogVerificationStageEId, QDatabaseSyncLogVerificationStage> {
}

export class BaseDatabaseSyncLogVerificationStageDmo
  extends Dmo<IDatabaseSyncLogVerificationStage, DatabaseSyncLogVerificationStageESelect, DatabaseSyncLogVerificationStageECreate, DatabaseSyncLogVerificationStageEUpdate, DatabaseSyncLogVerificationStageEId, QDatabaseSyncLogVerificationStage>
	implements IBaseDatabaseSyncLogVerificationStageDmo {
}


export interface IBaseDatabaseVerificationStageDmo
  extends IDmo<IDatabaseVerificationStage, DatabaseVerificationStageESelect, DatabaseVerificationStageECreate, DatabaseVerificationStageEUpdate, DatabaseVerificationStageEId, QDatabaseVerificationStage> {
}

export class BaseDatabaseVerificationStageDmo
  extends Dmo<IDatabaseVerificationStage, DatabaseVerificationStageESelect, DatabaseVerificationStageECreate, DatabaseVerificationStageEUpdate, DatabaseVerificationStageEId, QDatabaseVerificationStage>
	implements IBaseDatabaseVerificationStageDmo {
}


export interface IBaseRepositoryDmo
  extends IDmo<IRepository, RepositoryESelect, RepositoryECreate, RepositoryEUpdate, RepositoryEId, QRepository> {
}

export class BaseRepositoryDmo
  extends Dmo<IRepository, RepositoryESelect, RepositoryECreate, RepositoryEUpdate, RepositoryEId, QRepository>
	implements IBaseRepositoryDmo {
}


export interface IBaseRepositoryDatabaseDmo
  extends IDmo<IRepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreate, RepositoryDatabaseEUpdate, RepositoryDatabaseEId, QRepositoryDatabase> {
}

export class BaseRepositoryDatabaseDmo
  extends Dmo<IRepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreate, RepositoryDatabaseEUpdate, RepositoryDatabaseEId, QRepositoryDatabase>
	implements IBaseRepositoryDatabaseDmo {
}


export interface IBaseSecurityAnswerDmo
  extends IDmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreate, SecurityAnswerEUpdate, SecurityAnswerEId, QSecurityAnswer> {
}

export class BaseSecurityAnswerDmo
  extends Dmo<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreate, SecurityAnswerEUpdate, SecurityAnswerEId, QSecurityAnswer>
	implements IBaseSecurityAnswerDmo {
}


export interface IBaseSecurityQuestionDmo
  extends IDmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreate, SecurityQuestionEUpdate, SecurityQuestionEId, QSecurityQuestion> {
}

export class BaseSecurityQuestionDmo
  extends Dmo<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreate, SecurityQuestionEUpdate, SecurityQuestionEId, QSecurityQuestion>
	implements IBaseSecurityQuestionDmo {
}


export interface IBaseServerDmo
  extends IDmo<IServer, ServerESelect, ServerECreate, ServerEUpdate, ServerEId, QServer> {
}

export class BaseServerDmo
  extends Dmo<IServer, ServerESelect, ServerECreate, ServerEUpdate, ServerEId, QServer>
	implements IBaseServerDmo {
}


export interface IBaseServerSyncLogDmo
  extends IDmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreate, ServerSyncLogEUpdate, ServerSyncLogEId, QServerSyncLog> {
}

export class BaseServerSyncLogDmo
  extends Dmo<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreate, ServerSyncLogEUpdate, ServerSyncLogEId, QServerSyncLog>
	implements IBaseServerSyncLogDmo {
}


export interface IBaseShardedRecordDmo
  extends IDmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreate, ShardedRecordEUpdate, ShardedRecordEId, QShardedRecord> {
}

export class BaseShardedRecordDmo
  extends Dmo<IShardedRecord, ShardedRecordESelect, ShardedRecordECreate, ShardedRecordEUpdate, ShardedRecordEId, QShardedRecord>
	implements IBaseShardedRecordDmo {
}


export interface IBaseSyncLogDmo
  extends IDmo<ISyncLog, SyncLogESelect, SyncLogECreate, SyncLogEUpdate, SyncLogEId, QSyncLog> {
}

export class BaseSyncLogDmo
  extends Dmo<ISyncLog, SyncLogESelect, SyncLogECreate, SyncLogEUpdate, SyncLogEId, QSyncLog>
	implements IBaseSyncLogDmo {
}


export interface IBaseSyncRecordDmo
  extends IDmo<ISyncRecord, SyncRecordESelect, SyncRecordECreate, SyncRecordEUpdate, SyncRecordEId, QSyncRecord> {
}

export class BaseSyncRecordDmo
  extends Dmo<ISyncRecord, SyncRecordESelect, SyncRecordECreate, SyncRecordEUpdate, SyncRecordEId, QSyncRecord>
	implements IBaseSyncRecordDmo {
}


export interface IBaseTuningParametersDmo
  extends IDmo<ITuningParameters, TuningParametersESelect, TuningParametersECreate, TuningParametersEUpdate, TuningParametersEId, QTuningParameters> {
}

export class BaseTuningParametersDmo
  extends Dmo<ITuningParameters, TuningParametersESelect, TuningParametersECreate, TuningParametersEUpdate, TuningParametersEId, QTuningParameters>
	implements IBaseTuningParametersDmo {
}


export interface IBaseUserDmo
  extends IDmo<IUser, UserESelect, UserECreate, UserEUpdate, UserEId, QUser> {
}

export class BaseUserDmo
  extends Dmo<IUser, UserESelect, UserECreate, UserEUpdate, UserEId, QUser>
	implements IBaseUserDmo {
}


export interface IBaseUserRepositoryDmo
  extends IDmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreate, UserRepositoryEUpdate, UserRepositoryEId, QUserRepository> {
}

export class BaseUserRepositoryDmo
  extends Dmo<IUserRepository, UserRepositoryESelect, UserRepositoryECreate, UserRepositoryEUpdate, UserRepositoryEId, QUserRepository>
	implements IBaseUserRepositoryDmo {
}
