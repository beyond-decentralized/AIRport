import { IDao } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { Q } from './qSchema';
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


export interface IBaseDatabaseDao
  extends IDao<IDatabase, DatabaseESelect, DatabaseECreate, DatabaseEUpdate, DatabaseEId, QDatabase> {
}

export class BaseDatabaseDao
  extends Dao<IDatabase, DatabaseESelect, DatabaseECreate, DatabaseEUpdate, DatabaseEId, QDatabase>
	implements IBaseDatabaseDao {
	constructor() {
		super(Q.db.entityMapByName['Database'], Q);
	}
}


export interface IBaseDatabaseRepositoryDao
  extends IDao<IDatabaseRepository, DatabaseRepositoryESelect, DatabaseRepositoryECreate, DatabaseRepositoryEUpdate, DatabaseRepositoryEId, QDatabaseRepository> {
}

export class BaseDatabaseRepositoryDao
  extends Dao<IDatabaseRepository, DatabaseRepositoryESelect, DatabaseRepositoryECreate, DatabaseRepositoryEUpdate, DatabaseRepositoryEId, QDatabaseRepository>
	implements IBaseDatabaseRepositoryDao {
	constructor() {
		super(Q.db.entityMapByName['DatabaseRepository'], Q);
	}
}


export interface IBaseDatabaseRepositoryVerificationStageDao
  extends IDao<IDatabaseRepositoryVerificationStage, DatabaseRepositoryVerificationStageESelect, DatabaseRepositoryVerificationStageECreate, DatabaseRepositoryVerificationStageEUpdate, DatabaseRepositoryVerificationStageEId, QDatabaseRepositoryVerificationStage> {
}

export class BaseDatabaseRepositoryVerificationStageDao
  extends Dao<IDatabaseRepositoryVerificationStage, DatabaseRepositoryVerificationStageESelect, DatabaseRepositoryVerificationStageECreate, DatabaseRepositoryVerificationStageEUpdate, DatabaseRepositoryVerificationStageEId, QDatabaseRepositoryVerificationStage>
	implements IBaseDatabaseRepositoryVerificationStageDao {
	constructor() {
		super(Q.db.entityMapByName['DatabaseRepositoryVerificationStage'], Q);
	}
}


export interface IBaseDatabaseSyncLogDao
  extends IDao<IDatabaseSyncLog, DatabaseSyncLogESelect, DatabaseSyncLogECreate, DatabaseSyncLogEUpdate, DatabaseSyncLogEId, QDatabaseSyncLog> {
}

export class BaseDatabaseSyncLogDao
  extends Dao<IDatabaseSyncLog, DatabaseSyncLogESelect, DatabaseSyncLogECreate, DatabaseSyncLogEUpdate, DatabaseSyncLogEId, QDatabaseSyncLog>
	implements IBaseDatabaseSyncLogDao {
	constructor() {
		super(Q.db.entityMapByName['DatabaseSyncLog'], Q);
	}
}


export interface IBaseDatabaseSyncLogVerificationStageDao
  extends IDao<IDatabaseSyncLogVerificationStage, DatabaseSyncLogVerificationStageESelect, DatabaseSyncLogVerificationStageECreate, DatabaseSyncLogVerificationStageEUpdate, DatabaseSyncLogVerificationStageEId, QDatabaseSyncLogVerificationStage> {
}

export class BaseDatabaseSyncLogVerificationStageDao
  extends Dao<IDatabaseSyncLogVerificationStage, DatabaseSyncLogVerificationStageESelect, DatabaseSyncLogVerificationStageECreate, DatabaseSyncLogVerificationStageEUpdate, DatabaseSyncLogVerificationStageEId, QDatabaseSyncLogVerificationStage>
	implements IBaseDatabaseSyncLogVerificationStageDao {
	constructor() {
		super(Q.db.entityMapByName['DatabaseSyncLogVerificationStage'], Q);
	}
}


export interface IBaseDatabaseVerificationStageDao
  extends IDao<IDatabaseVerificationStage, DatabaseVerificationStageESelect, DatabaseVerificationStageECreate, DatabaseVerificationStageEUpdate, DatabaseVerificationStageEId, QDatabaseVerificationStage> {
}

export class BaseDatabaseVerificationStageDao
  extends Dao<IDatabaseVerificationStage, DatabaseVerificationStageESelect, DatabaseVerificationStageECreate, DatabaseVerificationStageEUpdate, DatabaseVerificationStageEId, QDatabaseVerificationStage>
	implements IBaseDatabaseVerificationStageDao {
	constructor() {
		super(Q.db.entityMapByName['DatabaseVerificationStage'], Q);
	}
}


export interface IBaseRepositoryDao
  extends IDao<IRepository, RepositoryESelect, RepositoryECreate, RepositoryEUpdate, RepositoryEId, QRepository> {
}

export class BaseRepositoryDao
  extends Dao<IRepository, RepositoryESelect, RepositoryECreate, RepositoryEUpdate, RepositoryEId, QRepository>
	implements IBaseRepositoryDao {
	constructor() {
		super(Q.db.entityMapByName['Repository'], Q);
	}
}


export interface IBaseRepositoryDatabaseDao
  extends IDao<IRepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreate, RepositoryDatabaseEUpdate, RepositoryDatabaseEId, QRepositoryDatabase> {
}

export class BaseRepositoryDatabaseDao
  extends Dao<IRepositoryDatabase, RepositoryDatabaseESelect, RepositoryDatabaseECreate, RepositoryDatabaseEUpdate, RepositoryDatabaseEId, QRepositoryDatabase>
	implements IBaseRepositoryDatabaseDao {
	constructor() {
		super(Q.db.entityMapByName['RepositoryDatabase'], Q);
	}
}


export interface IBaseSecurityAnswerDao
  extends IDao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreate, SecurityAnswerEUpdate, SecurityAnswerEId, QSecurityAnswer> {
}

export class BaseSecurityAnswerDao
  extends Dao<ISecurityAnswer, SecurityAnswerESelect, SecurityAnswerECreate, SecurityAnswerEUpdate, SecurityAnswerEId, QSecurityAnswer>
	implements IBaseSecurityAnswerDao {
	constructor() {
		super(Q.db.entityMapByName['SecurityAnswer'], Q);
	}
}


export interface IBaseSecurityQuestionDao
  extends IDao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreate, SecurityQuestionEUpdate, SecurityQuestionEId, QSecurityQuestion> {
}

export class BaseSecurityQuestionDao
  extends Dao<ISecurityQuestion, SecurityQuestionESelect, SecurityQuestionECreate, SecurityQuestionEUpdate, SecurityQuestionEId, QSecurityQuestion>
	implements IBaseSecurityQuestionDao {
	constructor() {
		super(Q.db.entityMapByName['SecurityQuestion'], Q);
	}
}


export interface IBaseServerDao
  extends IDao<IServer, ServerESelect, ServerECreate, ServerEUpdate, ServerEId, QServer> {
}

export class BaseServerDao
  extends Dao<IServer, ServerESelect, ServerECreate, ServerEUpdate, ServerEId, QServer>
	implements IBaseServerDao {
	constructor() {
		super(Q.db.entityMapByName['Server'], Q);
	}
}


export interface IBaseServerSyncLogDao
  extends IDao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreate, ServerSyncLogEUpdate, ServerSyncLogEId, QServerSyncLog> {
}

export class BaseServerSyncLogDao
  extends Dao<IServerSyncLog, ServerSyncLogESelect, ServerSyncLogECreate, ServerSyncLogEUpdate, ServerSyncLogEId, QServerSyncLog>
	implements IBaseServerSyncLogDao {
	constructor() {
		super(Q.db.entityMapByName['ServerSyncLog'], Q);
	}
}


export interface IBaseShardedRecordDao
  extends IDao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreate, ShardedRecordEUpdate, ShardedRecordEId, QShardedRecord> {
}

export class BaseShardedRecordDao
  extends Dao<IShardedRecord, ShardedRecordESelect, ShardedRecordECreate, ShardedRecordEUpdate, ShardedRecordEId, QShardedRecord>
	implements IBaseShardedRecordDao {
	constructor() {
		super(Q.db.entityMapByName['ShardedRecord'], Q);
	}
}


export interface IBaseSyncLogDao
  extends IDao<ISyncLog, SyncLogESelect, SyncLogECreate, SyncLogEUpdate, SyncLogEId, QSyncLog> {
}

export class BaseSyncLogDao
  extends Dao<ISyncLog, SyncLogESelect, SyncLogECreate, SyncLogEUpdate, SyncLogEId, QSyncLog>
	implements IBaseSyncLogDao {
	constructor() {
		super(Q.db.entityMapByName['SyncLog'], Q);
	}
}


export interface IBaseSyncRecordDao
  extends IDao<ISyncRecord, SyncRecordESelect, SyncRecordECreate, SyncRecordEUpdate, SyncRecordEId, QSyncRecord> {
}

export class BaseSyncRecordDao
  extends Dao<ISyncRecord, SyncRecordESelect, SyncRecordECreate, SyncRecordEUpdate, SyncRecordEId, QSyncRecord>
	implements IBaseSyncRecordDao {
	constructor() {
		super(Q.db.entityMapByName['SyncRecord'], Q);
	}
}


export interface IBaseTuningParametersDao
  extends IDao<ITuningParameters, TuningParametersESelect, TuningParametersECreate, TuningParametersEUpdate, TuningParametersEId, QTuningParameters> {
}

export class BaseTuningParametersDao
  extends Dao<ITuningParameters, TuningParametersESelect, TuningParametersECreate, TuningParametersEUpdate, TuningParametersEId, QTuningParameters>
	implements IBaseTuningParametersDao {
	constructor() {
		super(Q.db.entityMapByName['TuningParameters'], Q);
	}
}


export interface IBaseUserDao
  extends IDao<IUser, UserESelect, UserECreate, UserEUpdate, UserEId, QUser> {
}

export class BaseUserDao
  extends Dao<IUser, UserESelect, UserECreate, UserEUpdate, UserEId, QUser>
	implements IBaseUserDao {
	constructor() {
		super(Q.db.entityMapByName['User'], Q);
	}
}


export interface IBaseUserRepositoryDao
  extends IDao<IUserRepository, UserRepositoryESelect, UserRepositoryECreate, UserRepositoryEUpdate, UserRepositoryEId, QUserRepository> {
}

export class BaseUserRepositoryDao
  extends Dao<IUserRepository, UserRepositoryESelect, UserRepositoryECreate, UserRepositoryEUpdate, UserRepositoryEId, QUserRepository>
	implements IBaseUserRepositoryDao {
	constructor() {
		super(Q.db.entityMapByName['UserRepository'], Q);
	}
}
