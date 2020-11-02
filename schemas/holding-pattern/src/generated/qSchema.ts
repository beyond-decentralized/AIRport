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
import { QActor } from './infrastructure/qactor';
import { QActorApplication } from './infrastructure/qactorapplication';
import { QApplication } from './infrastructure/qapplication';
import { QChildRepoRow } from './traditional/qchildreporow';
import { QChildRow } from './traditional/qchildrow';
import { QImmutableRepoRow } from './traditional/qimmutablereporow';
import { QImmutableRow } from './traditional/qimmutablerow';
import { QMutableRepoRow } from './traditional/qmutablereporow';
import { QMutableRow } from './traditional/qmutablerow';
import { QOperationHistory } from './history/qoperationhistory';
import { QRecordHistory } from './history/qrecordhistory';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { QReferenceRow } from './traditional/qreferencerow';
import { QRepoTransHistoryChangedRepositoryActor } from './history/qrepotranshistorychangedrepositoryactor';
import { QRepository } from './repository/qrepository';
import { QRepositoryActor } from './repository/qrepositoryactor';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { QRepositoryEntity } from './repository/qrepositoryentity';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { QStageable } from './infrastructure/qstageable';
import { QTransactionHistory } from './history/qtransactionhistory';
import {
  Actor,
  ActorApplication,
  Application,
  ChildRepoRow,
  ChildRow,
  ImmutableRepoRow,
  ImmutableRow,
  MutableRepoRow,
  MutableRow,
  OperationHistory,
  RecordHistory,
  RecordHistoryNewValue,
  RecordHistoryOldValue,
  ReferenceRow,
  RepoTransHistoryChangedRepositoryActor,
  Repository,
  RepositoryActor,
  RepositoryApplication,
  RepositoryEntity,
  RepositorySchema,
  RepositoryTransactionHistory,
  Stageable,
  TransactionHistory
} from '../ddl/ddl';

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
  domain: 'air',
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

DI.db().eventuallyGet(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
