import {
	AIRPORT_DATABASE,
	QApplication as AirportQApplication
} from '@airport/air-traffic-control'
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import {
	DbApplication,
	getFullApplicationName
} from '@airport/ground-control';
import { QActor } from '../generated/infrastructure/qactor';
import { QOperationHistory } from '../generated/history/qoperationhistory';
import { QRecordHistory } from '../generated/history/qrecordhistory';
import { QRecordHistoryNewValue } from '../generated/history/qrecordhistorynewvalue';
import { QRecordHistoryOldValue } from '../generated/history/qrecordhistoryoldvalue';
import { QRepository } from '../generated/repository/qrepository';
import { QRepositoryApplication } from '../generated/repository/qrepositoryapplication';
import { QRepositoryTransactionHistory } from '../generated/history/qrepositorytransactionhistory';
import { QTransactionHistory } from '../generated/history/qtransactionhistory';

export interface LocalQApplication extends AirportQApplication {

	db: DbApplication;

	Actor: QActor;
	OperationHistory: QOperationHistory;
	RecordHistory: QRecordHistory;
	RecordHistoryNewValue: QRecordHistoryNewValue;
	RecordHistoryOldValue: QRecordHistoryOldValue;
	Repository: QRepository;
	RepositoryApplication: QRepositoryApplication;
	RepositoryTransactionHistory: QRepositoryTransactionHistory;
	TransactionHistory: QTransactionHistory;

}

const __constructors__ = {
};

export const Q_APPLICATION: LocalQApplication = <any>{
	__constructors__,
	domain: 'air',
	name: '@airport/holding-pattern'
};
export const Q: LocalQApplication = Q_APPLICATION

DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q
})
