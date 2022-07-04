import { QApplication } from '@airport/aviation-communication';
import { DbApplication, ApplicationEntity_LocalId } from '@airport/ground-control';
import { QActor } from './infrastructure/qactor';
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
export declare const Q_APPLICATION: LocalQApplication;
export declare const Q: LocalQApplication;
export declare function diSet(dbEntityId: ApplicationEntity_LocalId): boolean;
export declare function duoDiSet(dbEntityId: ApplicationEntity_LocalId): boolean;
//# sourceMappingURL=qApplication.d.ts.map