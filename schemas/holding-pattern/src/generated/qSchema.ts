import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { Actor } from '../ddl/infrastructure/Actor';
import { QActor } from './infrastructure/qactor';
import { ActorApplication } from '../ddl/infrastructure/ActorApplication';
import { QActorApplication } from './infrastructure/qactorapplication';
import { Application } from '../ddl/infrastructure/Application';
import { QApplication } from './infrastructure/qapplication';
import { ChildRepoRow } from '../ddl/traditional/ChildRepoRow';
import { QChildRepoRow } from './traditional/qchildreporow';
import { ChildRow } from '../ddl/traditional/ChildRow';
import { QChildRow } from './traditional/qchildrow';
import { ImmutableRepoRow } from '../ddl/traditional/ImmutableRepoRow';
import { QImmutableRepoRow } from './traditional/qimmutablereporow';
import { ImmutableRow } from '../ddl/traditional/ImmutableRow';
import { QImmutableRow } from './traditional/qimmutablerow';
import { MutableRepoRow } from '../ddl/traditional/MutableRepoRow';
import { QMutableRepoRow } from './traditional/qmutablereporow';
import { MutableRow } from '../ddl/traditional/MutableRow';
import { QMutableRow } from './traditional/qmutablerow';
import { OperationHistory } from '../ddl/history/OperationHistory';
import { QOperationHistory } from './history/qoperationhistory';
import { RecordHistory } from '../ddl/history/RecordHistory';
import { QRecordHistory } from './history/qrecordhistory';
import { RecordHistoryNewValue } from '../ddl/history/RecordHistoryNewValue';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { RecordHistoryOldValue } from '../ddl/history/RecordHistoryOldValue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { ReferenceRow } from '../ddl/traditional/ReferenceRow';
import { QReferenceRow } from './traditional/qreferencerow';
import { RepoTransHistoryChangedRepositoryActor } from '../ddl/history/RepoTransHistoryChangedRepositoryActor';
import { QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { Repository } from '../ddl/repository/Repository';
import { QRepository } from './repository/qrepository';
import { RepositoryActor } from '../ddl/repository/RepositoryActor';
import { QRepositoryActor } from './repository/qrepositoryactor';
import { RepositoryApplication } from '../ddl/repository/RepositoryApplication';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { RepositoryEntity } from '../ddl/repository/RepositoryEntity';
import { QRepositoryEntity } from './repository/qrepositoryentity';
import { RepositorySchema } from '../ddl/repository/RepositorySchema';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { RepositoryTransactionHistory } from '../ddl/history/RepositoryTransactionHistory';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { Stageable } from '../ddl/infrastructure/Stageable';
import { QStageable } from './infrastructure/qstageable';
import { TransactionHistory } from '../ddl/history/TransactionHistory';
import { QTransactionHistory } from './history/qtransactionhistory';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

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
	__constructors__,
  domain: 'npmjs.org',
  name: '@airport/holding-pattern'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
