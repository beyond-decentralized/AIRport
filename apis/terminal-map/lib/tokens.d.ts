import { ITransactionManager } from './orchestration/TransactionManager';
import { ITerminalStore } from './store/TerminalStore';
import { ITransactionalServer } from './transaction/ITransactionalServer';
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver';
import { IApplicationInitializer, IDomainRetriever } from '.';
export declare const APPLICATION_INITIALIZER: import("@airport/di").IDiToken<IApplicationInitializer>;
export declare const DOMAIN_RETRIEVER: import("@airport/di").IDiToken<IDomainRetriever>;
export declare const TERMINAL_STORE: import("@airport/di").IDiToken<ITerminalStore>;
export declare const TRANSACTION_MANAGER: import("@airport/di").IDiToken<ITransactionManager>;
export declare const TRANSACTIONAL_RECEIVER: import("@airport/di").IDiToken<ITransactionalReceiver>;
export declare const TRANSACTIONAL_SERVER: import("@airport/di").IDiToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map