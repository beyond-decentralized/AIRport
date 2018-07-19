import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { AbstractRepositoryEntity } from '../ddl/repository/AbstractRepositoryEntity';
import { QAbstractRepositoryEntity } from './repository/qabstractrepositoryentity';
import { Actor } from '../ddl/infrastructure/Actor';
import { QActor } from './infrastructure/qactor';
import { ActorApplication } from '../ddl/infrastructure/ActorApplication';
import { QActorApplication } from './infrastructure/qactorapplication';
import { Application } from '../ddl/infrastructure/Application';
import { QApplication } from './infrastructure/qapplication';
import { Database } from '../ddl/infrastructure/Database';
import { QDatabase } from './infrastructure/qdatabase';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { QOperationHistory } from './history/qoperationhistory';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { QRecordHistory } from './history/qrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/RepoTransHistoryChangedRepositoryActor';
import { QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { Repository } from '../ddl/repository/Repository';
import { QRepository } from './repository/qrepository';
import { RepositoryActor } from '../ddl/repository/RepositoryActor';
import { QRepositoryActor } from './repository/qrepositoryactor';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { RepositorySchema } from '../ddl/repository/RepositorySchema';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { QTransactionHistory } from './history/qtransactionhistory';
import { User } from '../ddl/infrastructure/User';
import { QUser } from './infrastructure/quser';

import {
	IBaseAbstractRepositoryEntityDmo,
	IBaseActorDmo,
	IBaseActorApplicationDmo,
	IBaseApplicationDmo,
	IBaseDatabaseDmo,
	IBaseOperationHistoryDmo,
	IBaseRecordHistoryDmo,
	IBaseRecordHistoryNewValueDmo,
	IBaseRecordHistoryOldValueDmo,
	IBaseRepoTransHistoryChangedRepositoryActorDmo,
	IBaseRepositoryDmo,
	IBaseRepositoryActorDmo,
	IBaseRepositoryApplicationDmo,
	IBaseRepositorySchemaDmo,
	IBaseRepositoryTransactionHistoryDmo,
	IBaseTransactionHistoryDmo,
	IBaseUserDmo
} from './baseDmos';

import {
	IBaseAbstractRepositoryEntityDao,
	IBaseActorDao,
	IBaseActorApplicationDao,
	IBaseApplicationDao,
	IBaseDatabaseDao,
	IBaseOperationHistoryDao,
	IBaseRecordHistoryDao,
	IBaseRecordHistoryNewValueDao,
	IBaseRecordHistoryOldValueDao,
	IBaseRepoTransHistoryChangedRepositoryActorDao,
	IBaseRepositoryDao,
	IBaseRepositoryActorDao,
	IBaseRepositoryApplicationDao,
	IBaseRepositorySchemaDao,
	IBaseRepositoryTransactionHistoryDao,
	IBaseTransactionHistoryDao,
	IBaseUserDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		AbstractRepositoryEntity: IBaseAbstractRepositoryEntityDmo;
		Actor: IBaseActorDmo;
		ActorApplication: IBaseActorApplicationDmo;
		Application: IBaseApplicationDmo;
		Database: IBaseDatabaseDmo;
		OperationHistory: IBaseOperationHistoryDmo;
		RecordHistory: IBaseRecordHistoryDmo;
		RecordHistoryNewValue: IBaseRecordHistoryNewValueDmo;
		RecordHistoryOldValue: IBaseRecordHistoryOldValueDmo;
		RepoTransHistoryChangedRepositoryActor: IBaseRepoTransHistoryChangedRepositoryActorDmo;
		Repository: IBaseRepositoryDmo;
		RepositoryActor: IBaseRepositoryActorDmo;
		RepositoryApplication: IBaseRepositoryApplicationDmo;
		RepositorySchema: IBaseRepositorySchemaDmo;
		RepositoryTransactionHistory: IBaseRepositoryTransactionHistoryDmo;
		TransactionHistory: IBaseTransactionHistoryDmo;
		User: IBaseUserDmo;
	}

	dao: {
		AbstractRepositoryEntity: IBaseAbstractRepositoryEntityDao;
		Actor: IBaseActorDao;
		ActorApplication: IBaseActorApplicationDao;
		Application: IBaseApplicationDao;
		Database: IBaseDatabaseDao;
		OperationHistory: IBaseOperationHistoryDao;
		RecordHistory: IBaseRecordHistoryDao;
		RecordHistoryNewValue: IBaseRecordHistoryNewValueDao;
		RecordHistoryOldValue: IBaseRecordHistoryOldValueDao;
		RepoTransHistoryChangedRepositoryActor: IBaseRepoTransHistoryChangedRepositoryActorDao;
		Repository: IBaseRepositoryDao;
		RepositoryActor: IBaseRepositoryActorDao;
		RepositoryApplication: IBaseRepositoryApplicationDao;
		RepositorySchema: IBaseRepositorySchemaDao;
		RepositoryTransactionHistory: IBaseRepositoryTransactionHistoryDao;
		TransactionHistory: IBaseTransactionHistoryDao;
		User: IBaseUserDao;
	}
	
	AbstractRepositoryEntity: QAbstractRepositoryEntity;
	Actor: QActor;
	ActorApplication: QActorApplication;
	Application: QApplication;
	Database: QDatabase;
	OperationHistory: QOperationHistory;
	RecordHistory: QRecordHistory;
	RecordHistoryNewValue: QRecordHistoryNewValue;
	RecordHistoryOldValue: QRecordHistoryOldValue;
	RepoTransHistoryChangedRepositoryActor: QRepoTransHistoryChangedRepositoryActor;
	Repository: QRepository;
	RepositoryActor: QRepositoryActor;
	RepositoryApplication: QRepositoryApplication;
	RepositorySchema: QRepositorySchema;
	RepositoryTransactionHistory: QRepositoryTransactionHistory;
	TransactionHistory: QTransactionHistory;
	User: QUser;

}

const __constructors__ = {
	AbstractRepositoryEntity: AbstractRepositoryEntity,
	Actor: Actor,
	ActorApplication: ActorApplication,
	Application: Application,
	Database: Database,
	OperationHistory: OperationHistory,
	RecordHistory: RecordHistory,
	RecordHistoryNewValue: RecordHistoryNewValue,
	RecordHistoryOldValue: RecordHistoryOldValue,
	RepoTransHistoryChangedRepositoryActor: RepoTransHistoryChangedRepositoryActor,
	Repository: Repository,
	RepositoryActor: RepositoryActor,
	RepositoryApplication: RepositoryApplication,
	RepositorySchema: RepositorySchema,
	RepositoryTransactionHistory: RepositoryTransactionHistory,
	TransactionHistory: TransactionHistory,
	User: User
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
