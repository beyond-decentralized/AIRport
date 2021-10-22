import { IRecordHistoryNewValueDao } from './dao/history/RecordHistoryNewValueDao';
import { IRecordHistoryOldValueDao } from './dao/history/RecordHistoryOldValueDao';
import { IRepositoryTransactionHistoryDao } from './dao/history/RepositoryTransactionHistoryDao';
import { IActorDao } from './dao/infrastructure/ActorDao';
import { IRepositoryActorDao } from './dao/repository/RepositoryActorDao';
import { IRepositoryDao } from './dao/repository/RepositoryDao';
import { IOperationHistoryDuo } from './duo/history/OperationHistoryDuo';
import { IRecordHistoryDuo } from './duo/history/RecordHistoryDuo';
import { IRecordHistoryNewValueDuo } from './duo/history/RecordHistoryNewValueDuo';
import { IRecordHistoryOldValueDuo } from './duo/history/RecordHistoryOldValueDuo';
import { IRepositoryTransactionHistoryDuo } from './duo/history/RepositoryTransactionHistoryDuo';
import { ITransactionHistoryDuo } from './duo/history/TransactionHistoryDuo';
export declare const holdingPattern: import("@airport/di").ILibrary;
export declare const ACTOR_DAO: import("@airport/di").IDiToken<IActorDao>;
export declare const OPER_HISTORY_DUO: import("@airport/di").IDiToken<IOperationHistoryDuo>;
export declare const REC_HISTORY_DUO: import("@airport/di").IDiToken<IRecordHistoryDuo>;
export declare const REC_HIST_NEW_VALUE_DAO: import("@airport/di").IDiToken<IRecordHistoryNewValueDao>;
export declare const REC_HIST_NEW_VALUE_DUO: import("@airport/di").IDiToken<IRecordHistoryNewValueDuo>;
export declare const REC_HIST_OLD_VALUE_DAO: import("@airport/di").IDiToken<IRecordHistoryOldValueDao>;
export declare const REC_HIST_OLD_VALUE_DUO: import("@airport/di").IDiToken<IRecordHistoryOldValueDuo>;
export declare const REPOSITORY_ACTOR_DAO: import("@airport/di").IDiToken<IRepositoryActorDao>;
export declare const REPOSITORY_DAO: import("@airport/di").IDiToken<IRepositoryDao>;
export declare const REPO_TRANS_HISTORY_DAO: import("@airport/di").IDiToken<IRepositoryTransactionHistoryDao>;
export declare const REPO_TRANS_HISTORY_DUO: import("@airport/di").IDiToken<IRepositoryTransactionHistoryDuo>;
export declare const TRANS_HISTORY_DUO: import("@airport/di").IDiToken<ITransactionHistoryDuo>;
//# sourceMappingURL=tokens.d.ts.map