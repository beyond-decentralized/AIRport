import { IDailyArchiveLogDao } from './dao/archive/DailyArchiveLogDao';
import { IRepositoryDao } from './dao/repository/RepositoryDao';
import { IAgtRepositoryTransactionBlockDao } from './dao/synchronization/AgtRepositoryTransactionBlockDao';
import { IAgtSharingMessageDao } from './dao/synchronization/AgtSharingMessageDao';
import { ISyncLogDao } from './dao/synchronization/SyncLogDao';
import { ITerminalDao } from './dao/terminal/TerminalDao';
import { ITerminalRepositoryDao } from './dao/terminal/TerminalRepositoryDao';
export declare const DAILY_ARCHIVE_LOG_DAO: import("@airport/di").IDiToken<IDailyArchiveLogDao>;
export declare const TERMINAL_DAO: import("@airport/di").IDiToken<ITerminalDao>;
export declare const TERMINAL_REPOSITORY_DAO: import("@airport/di").IDiToken<ITerminalRepositoryDao>;
export declare const REPOSITORY_DAO: import("@airport/di").IDiToken<IRepositoryDao>;
export declare const SYNC_LOG_DAO: import("@airport/di").IDiToken<ISyncLogDao>;
export declare const AGT_SHARING_MESSAGE_DAO: import("@airport/di").IDiToken<IAgtSharingMessageDao>;
export declare const AGT_REPO_TRANS_BLOCK_DAO: import("@airport/di").IDiToken<IAgtRepositoryTransactionBlockDao>;
//# sourceMappingURL=tokens.d.ts.map