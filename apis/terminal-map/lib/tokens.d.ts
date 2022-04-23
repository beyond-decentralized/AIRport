import { ITransactionManager } from './orchestration/TransactionManager';
import { ITerminalStore } from './store/TerminalStore';
import { ITransactionalServer } from './transaction/ITransactionalServer';
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver';
import { IApplicationInitializer, IDomainRetriever } from '.';
import { IStoreDriver } from './core/data/StoreDriver';
export declare const APPLICATION_INITIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationInitializer>;
export declare const DOMAIN_RETRIEVER: import("@airport/direction-indicator").IDependencyInjectionToken<IDomainRetriever>;
export declare const STORE_DRIVER: import("@airport/direction-indicator").IDependencyInjectionToken<IStoreDriver>;
export declare const TERMINAL_STORE: import("@airport/direction-indicator").IDependencyInjectionToken<ITerminalStore>;
export declare const TRANSACTION_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionManager>;
export declare const TRANSACTIONAL_RECEIVER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionalReceiver>;
export declare const TRANSACTIONAL_SERVER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map