import { ISequenceGenerator } from './implementation/SequenceGenerator';
import { IEntityStateManager } from './definition/core/operation/EntityStateManager';
import { ITransactionalConnector } from './definition/ITransactionalConnector';
import { IDbApplicationUtils } from './definition/query/DbApplicationUtils';
import { IUpdateCacheManager } from './definition/data/UpdateCacheManager';
export declare const DB_APPLICATION_UTILS: import("@airport/direction-indicator").IDependencyInjectionToken<IDbApplicationUtils>;
export declare const ENTITY_STATE_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<IEntityStateManager>;
export declare const SEQUENCE_GENERATOR: import("@airport/direction-indicator").IDependencyInjectionToken<ISequenceGenerator>;
export declare const TRANSACTIONAL_CONNECTOR: import("@airport/direction-indicator").IDependencyInjectionToken<ITransactionalConnector>;
export declare const UPDATE_CACHE_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<IUpdateCacheManager>;
//# sourceMappingURL=tokens.d.ts.map