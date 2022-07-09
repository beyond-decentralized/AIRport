import { IAirportDatabase } from './definition/AirportDatabase';
import { IApplicationUtils, IFieldUtils, IRelationManager } from '@airport/tarmaq-query';
import { IDao, IDatabaseFacade } from '@airport/tarmaq-dao';
import { IDatabaseState } from './definition/DatabaseState';
import { IQMetadataUtils } from './definition/utils/IQMetadataUtils';
import { IRepositoryLoader } from './definition/RepositoryLoader';
import { IUpdateCacheManager } from './definition/UpdateCacheManager';
export declare const AIRPORT_DATABASE: import("@airport/direction-indicator").IDependencyInjectionToken<IAirportDatabase>;
export declare const APPLICATION_UTILS: import("@airport/direction-indicator").IDependencyInjectionToken<IApplicationUtils>;
export declare const DAO: import("@airport/direction-indicator").IDependencyInjectionToken<IDao<any, any, any, any, any, any, any, any>>;
export declare const DATABASE_FACADE: import("@airport/direction-indicator").IDependencyInjectionToken<IDatabaseFacade>;
export declare const DATABASE_STORE: import("@airport/direction-indicator").IDependencyInjectionToken<IDatabaseState>;
export declare const FIELD_UTILS: import("@airport/direction-indicator").IDependencyInjectionToken<IFieldUtils>;
export declare const Q_METADATA_UTILS: import("@airport/direction-indicator").IDependencyInjectionToken<IQMetadataUtils>;
export declare const RELATION_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<IRelationManager>;
export declare const REPOSITORY_LOADER: import("@airport/direction-indicator").IDependencyInjectionToken<IRepositoryLoader>;
export declare const UPDATE_CACHE_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<IUpdateCacheManager>;
//# sourceMappingURL=tokens.d.ts.map