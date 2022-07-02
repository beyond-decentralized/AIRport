import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    EntityId,
}                      from '@airport/ground-control';
import { QActor } from './infrastructure/qactor';
import { QAirEntity } from './repository/qairentity';
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
import { QRepository } from './repository/qrepository';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { QRepositoryClient } from './repository/qrepositoryclient';
import { QRepositoryDatabase } from './repository/qrepositorydatabase';
import { QRepositoryTerminal } from './repository/qrepositoryterminal';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { QRepositoryType } from './repository/qrepositorytype';
import { QTransactionHistory } from './history/qtransactionhistory';
import {
  Actor,
  AirEntity,
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
  Repository,
  RepositoryApplication,
  RepositoryClient,
  RepositoryDatabase,
  RepositoryTerminal,
  RepositoryTransactionHistory,
  RepositoryType,
  TransactionHistory
} from '../ddl/ddl';

export interface LocalQApplication extends QApplication {

    db: DbApplication;

  Actor: QActor;
	OperationHistory: QOperationHistory;
	RecordHistory: QRecordHistory;
	RecordHistoryNewValue: QRecordHistoryNewValue;
	RecordHistoryOldValue: QRecordHistoryOldValue;
	Repository: QRepository;
	RepositoryApplication: QRepositoryApplication;
	RepositoryClient: QRepositoryClient;
	RepositoryDatabase: QRepositoryDatabase;
	RepositoryTerminal: QRepositoryTerminal;
	RepositoryTransactionHistory: QRepositoryTransactionHistory;
	RepositoryType: QRepositoryType;
	TransactionHistory: QTransactionHistory;

}

const __constructors__ = {
	Actor: Actor,
	AirEntity: AirEntity,
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
	Repository: Repository,
	RepositoryApplication: RepositoryApplication,
	RepositoryClient: RepositoryClient,
	RepositoryDatabase: RepositoryDatabase,
	RepositoryTerminal: RepositoryTerminal,
	RepositoryTransactionHistory: RepositoryTransactionHistory,
	RepositoryType: RepositoryType,
	TransactionHistory: TransactionHistory
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
  domain: 'air',
  name: '@airport/holding-pattern'
};
export const Q: LocalQApplication = Q_APPLICATION

export function diSet(
	dbEntityId: EntityId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
