import {
    airApi,
    QApplication
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QActor } from './infrastructure/qactor';
import { QAirEntity } from './repository/qairentity';
import { QOperationHistory } from './history/qoperationhistory';
import { QRecordHistory } from './history/qrecordhistory';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
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
  OperationHistory,
  RecordHistory,
  RecordHistoryNewValue,
  RecordHistoryOldValue,
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
	OperationHistory: OperationHistory,
	RecordHistory: RecordHistory,
	RecordHistoryNewValue: RecordHistoryNewValue,
	RecordHistoryOldValue: RecordHistoryOldValue,
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
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q.__dbApplication__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.ddS(Q.__dbApplication__, dbEntityId)
}

airApi.setQApplication(Q_APPLICATION)
