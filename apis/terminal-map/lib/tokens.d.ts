import { ITransactionManager } from './transaction/TransactionManager';
import { ITerminalStore } from './store/TerminalStore';
import { ITransactionalServer } from './transaction/ITransactionalServer';
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver';
export declare const TERMINAL_STORE: import("@airport/di").IDiToken<ITerminalStore>;
export declare const TRANSACTION_MANAGER: import("@airport/di").IDiToken<ITransactionManager>;
export declare const TRANSACTIONAL_RECEIVER: import("@airport/di").IDiToken<ITransactionalReceiver>;
export declare const TRANSACTIONAL_SERVER: import("@airport/di").IDiToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map