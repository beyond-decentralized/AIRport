import { QApplication } from '@airport/aviation-communication';
import { DbApplication, EntityId } from '@airport/ground-control';
import { QActor } from './infrastructure/qactor';
import { QOperationHistory } from './history/qoperationhistory';
import { QRecordHistory } from './history/qrecordhistory';
import { QRecordHistoryNewValue } from './history/qrecordhistorynewvalue';
import { QRecordHistoryOldValue } from './history/qrecordhistoryoldvalue';
import { QRepository } from './repository/qrepository';
import { QRepositoryApplication } from './repository/qrepositoryapplication';
import { QRepositoryTransactionHistory } from './history/qrepositorytransactionhistory';
import { QTransactionHistory } from './history/qtransactionhistory';
export interface LocalQApplication extends QApplication {
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
export declare function diSet(dbEntityId: EntityId): boolean;
export declare function duoDiSet(dbEntityId: EntityId): boolean;
//# sourceMappingURL=qApplication.d.ts.map