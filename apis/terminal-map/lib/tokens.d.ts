import { ITransactionManager } from './orchestration/TransactionManager';
import { ITerminalStore } from './store/TerminalStore';
import { ITransactionalServer } from './transaction/ITransactionalServer';
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver';
import { IApplicationInitializer, IDomainRetriever } from '.';
import { IStoreDriver } from './core/data/StoreDriver';
import { ITerminalStateContainer } from './store/TerminalState';
export declare const APPLICATION_INITIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationInitializer>;
export declare const DOMAIN_RETRIEVER: import("@airport/direction-indicator").IDependencyInjectionToken<IDomainRetriever>;
export declare const STORE_DRIVER: import("@airport/direction-indicator").IDependencyInjectionToken<IStoreDriver>;
export declare const TERMINAL_STATE: import("@airport/direction-indicator").IDependencyInjectionToken<ITerminalStateContainer>;
export declare const TERMINAL_STORE: import("@airport/direction-indicator").IDependencyInjectionToken<ITerminalStore>;
export declare const TRANSACTION_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionManager>;
export declare const TRANSACTIONAL_RECEIVER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionalReceiver>;
export declare const TRANSACTIONAL_SERVER: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map