import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { AbstractRepositoryEntity } from '../ddl/repository/abstractrepositoryentity';
import { QAbstractRepositoryEntity } from './repository/qabstractrepositoryentity';
import { Actor } from '../ddl/infrastructure/actor';
import { QActor } from './infrastructure/qactor';
import { ActorApplication } from '../ddl/infrastructure/actorapplication';
import { QActorApplication } from './infrastructure/qactorapplication';
import { Application } from '../ddl/infrastructure/application';
import { QApplication } from './infrastructure/qapplication';
import { OperationHistory } from '../ddl/history/operationhistory';
import { QOperationHistory } from './history/qoperationhistory';
import { RecordHistory } from '../ddl/history/recordhistory';
import { QRecordHistory } from './history/qrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/recordhistorynewvalue';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/recordhistoryoldvalue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/repotranshistorychangedrepositoryactor';
import { QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { Repository } from '../ddl/repository/repository';
import { QRepository } from './repository/qrepository';
import { RepositoryActor } from '../ddl/repository/repositoryactor';
import { QRepositoryActor } from './repository/qrepositoryactor';
import { RepositoryApplication } from '../ddl/repository/repositoryapplication';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { RepositorySchema } from '../ddl/repository/repositoryschema';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { RepositoryTransactionHistory } from '../ddl/history/repositorytransactionhistory';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { TransactionHistory } from '../ddl/history/transactionhistory';
import { QTransactionHistory } from './history/qtransactionhistory';

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
	IBaseTransactionHistoryDmo
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
	IBaseTransactionHistoryDao
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
		TransactionHistory: IBaseTransactionHistoryDmo;
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
		TransactionHistory: IBaseTransactionHistoryDao;
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
	TransactionHistory: QTransactionHistory;

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
	TransactionHistory: TransactionHistory
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
