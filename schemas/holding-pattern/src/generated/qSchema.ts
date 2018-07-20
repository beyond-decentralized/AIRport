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
import { Terminal } from '../ddl/infrastructure/Terminal';
import { QTerminal } from './infrastructure/qterminal';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { QTransactionHistory } from './history/qtransactionhistory';
import { User } from '../ddl/infrastructure/User';
import { QUser } from './infrastructure/quser';

import {
	IBaseAbstractRepositoryEntityDmo,
	IBaseActorDmo,
	IBaseActorApplicationDmo,
	IBaseApplicationDmo,
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
	IBaseTerminalDmo,
	IBaseTransactionHistoryDmo,
	IBaseUserDmo
} from './baseDmos';

import {
	IBaseAbstractRepositoryEntityDao,
	IBaseActorDao,
	IBaseActorApplicationDao,
	IBaseApplicationDao,
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
	IBaseTerminalDao,
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
		Terminal: IBaseTerminalDmo;
		TransactionHistory: IBaseTransactionHistoryDmo;
		User: IBaseUserDmo;
	}

	dao: {
		AbstractRepositoryEntity: IBaseAbstractRepositoryEntityDao;
		Actor: IBaseActorDao;
		ActorApplication: IBaseActorApplicationDao;
		Application: IBaseApplicationDao;
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
		Terminal: IBaseTerminalDao;
		TransactionHistory: IBaseTransactionHistoryDao;
		User: IBaseUserDao;
	}
	
	AbstractRepositoryEntity: QAbstractRepositoryEntity;
	Actor: QActor;
	ActorApplication: QActorApplication;
	Application: QApplication;
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
	Terminal: QTerminal;
	TransactionHistory: QTransactionHistory;
	User: QUser;

}

const __constructors__ = {
	AbstractRepositoryEntity: AbstractRepositoryEntity,
	Actor: Actor,
	ActorApplication: ActorApplication,
	Application: Application,
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
	Terminal: Terminal,
	TransactionHistory: TransactionHistory,
	User: User
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
