import { QApplication as AirportQApplication } from '@airport/air-traffic-control';
import { DbApplication } from '@airport/ground-control';
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
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
//# sourceMappingURL=qApiApplication.d.ts.map