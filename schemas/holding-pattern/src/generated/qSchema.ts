import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { Actor } from '../ddl/infrastructure/actor';
import { QActor } from './infrastructure/qactor';
import { ActorApplication } from '../ddl/infrastructure/actorapplication';
import { QActorApplication } from './infrastructure/qactorapplication';
import { Application } from '../ddl/infrastructure/application';
import { QApplication } from './infrastructure/qapplication';
import { ChildRepoRow } from '../ddl/traditional/childreporow';
import { QChildRepoRow } from './traditional/qchildreporow';
import { ChildRow } from '../ddl/traditional/childrow';
import { QChildRow } from './traditional/qchildrow';
import { ImmutableRepoRow } from '../ddl/traditional/immutablereporow';
import { QImmutableRepoRow } from './traditional/qimmutablereporow';
import { ImmutableRow } from '../ddl/traditional/immutablerow';
import { QImmutableRow } from './traditional/qimmutablerow';
import { MutableRepoRow } from '../ddl/traditional/mutablereporow';
import { QMutableRepoRow } from './traditional/qmutablereporow';
import { MutableRow } from '../ddl/traditional/mutablerow';
import { QMutableRow } from './traditional/qmutablerow';
import { OperationHistory } from '../ddl/history/operationhistory';
import { QOperationHistory } from './history/qoperationhistory';
import { RecordHistory } from '../ddl/history/recordhistory';
import { QRecordHistory } from './history/qrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/recordhistorynewvalue';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/recordhistoryoldvalue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { ReferenceRow } from '../ddl/traditional/referencerow';
import { QReferenceRow } from './traditional/qreferencerow';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/repotranshistorychangedrepositoryactor';
import { QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { Repository } from '../ddl/repository/repository';
import { QRepository } from './repository/qrepository';
import { RepositoryActor } from '../ddl/repository/repositoryactor';
import { QRepositoryActor } from './repository/qrepositoryactor';
import { RepositoryApplication } from '../ddl/repository/repositoryapplication';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { RepositoryEntity } from '../ddl/repository/repositoryentity';
import { QRepositoryEntity } from './repository/qrepositoryentity';
import { RepositorySchema } from '../ddl/repository/repositoryschema';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { RepositoryTransactionHistory } from '../ddl/history/repositorytransactionhistory';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { Stageable } from '../ddl/infrastructure/stageable';
import { QStageable } from './infrastructure/qstageable';
import { TransactionHistory } from '../ddl/history/transactionhistory';
import { QTransactionHistory } from './history/qtransactionhistory';

import {
	IBaseActorDmo,
	IBaseActorApplicationDmo,
	IBaseApplicationDmo,
	IBaseChildRepoRowDmo,
	IBaseChildRowDmo,
	IBaseImmutableRepoRowDmo,
	IBaseImmutableRowDmo,
	IBaseMutableRepoRowDmo,
	IBaseMutableRowDmo,
	IBaseOperationHistoryDmo,
	IBaseRecordHistoryDmo,
	IBaseRecordHistoryNewValueDmo,
	IBaseRecordHistoryOldValueDmo,
	IBaseReferenceRowDmo,
	IBaseRepoTransHistoryChangedRepositoryActorDmo,
	IBaseRepositoryDmo,
	IBaseRepositoryActorDmo,
	IBaseRepositoryApplicationDmo,
	IBaseRepositoryEntityDmo,
	IBaseRepositorySchemaDmo,
	IBaseRepositoryTransactionHistoryDmo,
	IBaseStageableDmo,
	IBaseTransactionHistoryDmo
} from './baseDmos';

import {
	IBaseActorDao,
	IBaseActorApplicationDao,
	IBaseApplicationDao,
	IBaseChildRepoRowDao,
	IBaseChildRowDao,
	IBaseImmutableRepoRowDao,
	IBaseImmutableRowDao,
	IBaseMutableRepoRowDao,
	IBaseMutableRowDao,
	IBaseOperationHistoryDao,
	IBaseRecordHistoryDao,
	IBaseRecordHistoryNewValueDao,
	IBaseRecordHistoryOldValueDao,
	IBaseReferenceRowDao,
	IBaseRepoTransHistoryChangedRepositoryActorDao,
	IBaseRepositoryDao,
	IBaseRepositoryActorDao,
	IBaseRepositoryApplicationDao,
	IBaseRepositoryEntityDao,
	IBaseRepositorySchemaDao,
	IBaseRepositoryTransactionHistoryDao,
	IBaseStageableDao,
	IBaseTransactionHistoryDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		Actor: IBaseActorDmo;
		ActorApplication: IBaseActorApplicationDmo;
		Application: IBaseApplicationDmo;
		ChildRepoRow: IBaseChildRepoRowDmo;
		ChildRow: IBaseChildRowDmo;
		ImmutableRepoRow: IBaseImmutableRepoRowDmo;
		ImmutableRow: IBaseImmutableRowDmo;
		MutableRepoRow: IBaseMutableRepoRowDmo;
		MutableRow: IBaseMutableRowDmo;
		OperationHistory: IBaseOperationHistoryDmo;
		RecordHistory: IBaseRecordHistoryDmo;
		RecordHistoryNewValue: IBaseRecordHistoryNewValueDmo;
		RecordHistoryOldValue: IBaseRecordHistoryOldValueDmo;
		ReferenceRow: IBaseReferenceRowDmo;
		RepoTransHistoryChangedRepositoryActor: IBaseRepoTransHistoryChangedRepositoryActorDmo;
		Repository: IBaseRepositoryDmo;
		RepositoryActor: IBaseRepositoryActorDmo;
		RepositoryApplication: IBaseRepositoryApplicationDmo;
		RepositoryEntity: IBaseRepositoryEntityDmo;
		RepositorySchema: IBaseRepositorySchemaDmo;
		RepositoryTransactionHistory: IBaseRepositoryTransactionHistoryDmo;
		Stageable: IBaseStageableDmo;
		TransactionHistory: IBaseTransactionHistoryDmo;
	}

	dao: {
		Actor: IBaseActorDao;
		ActorApplication: IBaseActorApplicationDao;
		Application: IBaseApplicationDao;
		ChildRepoRow: IBaseChildRepoRowDao;
		ChildRow: IBaseChildRowDao;
		ImmutableRepoRow: IBaseImmutableRepoRowDao;
		ImmutableRow: IBaseImmutableRowDao;
		MutableRepoRow: IBaseMutableRepoRowDao;
		MutableRow: IBaseMutableRowDao;
		OperationHistory: IBaseOperationHistoryDao;
		RecordHistory: IBaseRecordHistoryDao;
		RecordHistoryNewValue: IBaseRecordHistoryNewValueDao;
		RecordHistoryOldValue: IBaseRecordHistoryOldValueDao;
		ReferenceRow: IBaseReferenceRowDao;
		RepoTransHistoryChangedRepositoryActor: IBaseRepoTransHistoryChangedRepositoryActorDao;
		Repository: IBaseRepositoryDao;
		RepositoryActor: IBaseRepositoryActorDao;
		RepositoryApplication: IBaseRepositoryApplicationDao;
		RepositoryEntity: IBaseRepositoryEntityDao;
		RepositorySchema: IBaseRepositorySchemaDao;
		RepositoryTransactionHistory: IBaseRepositoryTransactionHistoryDao;
		Stageable: IBaseStageableDao;
		TransactionHistory: IBaseTransactionHistoryDao;
	}
	
	Actor: QActor;
	ActorApplication: QActorApplication;
	Application: QApplication;
	ChildRepoRow: QChildRepoRow;
	ChildRow: QChildRow;
	ImmutableRepoRow: QImmutableRepoRow;
	ImmutableRow: QImmutableRow;
	MutableRepoRow: QMutableRepoRow;
	MutableRow: QMutableRow;
	OperationHistory: QOperationHistory;
	RecordHistory: QRecordHistory;
	RecordHistoryNewValue: QRecordHistoryNewValue;
	RecordHistoryOldValue: QRecordHistoryOldValue;
	ReferenceRow: QReferenceRow;
	RepoTransHistoryChangedRepositoryActor: QRepoTransHistoryChangedRepositoryActor;
	Repository: QRepository;
	RepositoryActor: QRepositoryActor;
	RepositoryApplication: QRepositoryApplication;
	RepositoryEntity: QRepositoryEntity;
	RepositorySchema: QRepositorySchema;
	RepositoryTransactionHistory: QRepositoryTransactionHistory;
	Stageable: QStageable;
	TransactionHistory: QTransactionHistory;

}

const __constructors__ = {
	Actor: Actor,
	ActorApplication: ActorApplication,
	Application: Application,
	ChildRepoRow: ChildRepoRow,
	ChildRow: ChildRow,
	ImmutableRepoRow: ImmutableRepoRow,
	ImmutableRow: ImmutableRow,
	MutableRepoRow: MutableRepoRow,
	MutableRow: MutableRow,
	OperationHistory: OperationHistory,
	RecordHistory: RecordHistory,
	RecordHistoryNewValue: RecordHistoryNewValue,
	RecordHistoryOldValue: RecordHistoryOldValue,
	ReferenceRow: ReferenceRow,
	RepoTransHistoryChangedRepositoryActor: RepoTransHistoryChangedRepositoryActor,
	Repository: Repository,
	RepositoryActor: RepositoryActor,
	RepositoryApplication: RepositoryApplication,
	RepositoryEntity: RepositoryEntity,
	RepositorySchema: RepositorySchema,
	RepositoryTransactionHistory: RepositoryTransactionHistory,
	Stageable: Stageable,
	TransactionHistory: TransactionHistory
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
