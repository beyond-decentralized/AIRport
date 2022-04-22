import { ITransactionManager } from './orchestration/TransactionManager';
import { ITerminalStore } from './store/TerminalStore';
import { ITransactionalServer } from './transaction/ITransactionalServer';
import { ITransactionalReceiver } from './transaction/ITransactionalReceiver';
import { IApplicationInitializer, IDomainRetriever } from '.';
import { IStoreDriver } from './core/data/StoreDriver';
export declare const APPLICATION_INITIALIZER: import("@airport/di").IDependencyInjectionToken<IApplicationInitializer>;
export declare const DOMAIN_RETRIEVER: import("@airport/di").IDependencyInjectionToken<IDomainRetriever>;
export declare const STORE_DRIVER: import("@airport/di").IDependencyInjectionToken<IStoreDriver>;
export declare const TERMINAL_STORE: import("@airport/di").IDependencyInjectionToken<ITerminalStore>;
export declare const TRANSACTION_MANAGER: import("@airport/di").IDependencyInjectionToken<ITransactionManager>;
export declare const TRANSACTIONAL_RECEIVER: import("@airport/di").IDependencyInjectionToken<ITransactionalReceiver>;
export declare const TRANSACTIONAL_SERVER: import("@airport/di").IDependencyInjectionToken<ITransactionalServer>;
//# sourceMappingURL=tokens.d.ts.map