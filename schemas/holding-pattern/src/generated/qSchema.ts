import {
	AIRPORT_DATABASE,
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
import { QRepositoryEntity } from './repository/qrepositoryentity';
import { QRepositorySchema } from './repository/qrepositoryschema';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { QStageable } from './infrastructure/qstageable';
import { QTransactionHistory } from './history/qtransactionhistory';
import {
  Actor,
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
  RepositoryEntity,
  RepositorySchema,
  RepositoryTransactionHistory,
  Stageable,
  TransactionHistory
} from '../ddl/ddl';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	Actor: QActor;
	OperationHistory: QOperationHistory;
	RecordHistory: QRecordHistory;
	RecordHistoryNewValue: QRecordHistoryNewValue;
	RecordHistoryOldValue: QRecordHistoryOldValue;
	RepoTransHistoryChangedRepositoryActor: QRepoTransHistoryChangedRepositoryActor;
	Repository: QRepository;
	RepositoryActor: QRepositoryActor;
	RepositorySchema: QRepositorySchema;
	RepositoryTransactionHistory: QRepositoryTransactionHistory;
	TransactionHistory: QTransactionHistory;

}

const __constructors__ = {
	Actor: Actor,
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

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
