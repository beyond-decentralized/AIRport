import {
    airApi,
    QApp
} from '@airport/aviation-communication'
import {
    DbApplication,
    ApplicationEntity_LocalId,
}                      from '@airport/ground-control';
import { QActor } from './query/infrastructure/QActor';
import { QAirEntity } from './query/repository/QAirEntity';
import { QOperationHistory } from './query/history/QOperationHistory';
import { QRecordHistory } from './query/history/QRecordHistory';
import { QRecordHistoryNewValue } from './query/history/QRecordHistoryNewValue';
import { QRecordHistoryOldValue } from './query/history/QRecordHistoryOldValue';
import { QRepository } from './query/repository/QRepository';
import { QRepositoryApplication } from './query/repository/QRepositoryApplication';
import { QRepositoryClient } from './query/repository/QRepositoryClient';
import { QRepositoryDatabase } from './query/repository/QRepositoryDatabase';
import { QRepositoryTerminal } from './query/repository/QRepositoryTerminal';
import { QRepositoryTransactionHistory } from './query/history/QRepositoryTransactionHistory';
import { QRepositoryType } from './query/repository/QRepositoryType';
import { QTransactionHistory } from './query/history/QTransactionHistory';
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

export interface airport____at_airport_slash_holding_dash_pattern_LocalQApp extends QApp {

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

export const Q_airport____at_airport_slash_holding_dash_pattern: airport____at_airport_slash_holding_dash_pattern_LocalQApp = <any>{
	__constructors__,
  domain: 'airport',
  name: '@airport/holding-pattern'
};
export default Q_airport____at_airport_slash_holding_dash_pattern

export function airport____at_airport_slash_holding_dash_pattern_diSet(
	dbEntityId: ApplicationEntity_LocalId
): boolean {
	return airApi.dS(Q_airport____at_airport_slash_holding_dash_pattern.__dbApplication__, dbEntityId)
}

airApi.setQApp(Q_airport____at_airport_slash_holding_dash_pattern)
