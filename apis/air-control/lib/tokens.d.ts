import { IEntityStateManager } from './impl/core/entity/EntityStateManager';
import { IRelationManager } from './impl/core/entity/RelationManager';
import { IQueryContextLoader } from './impl/query/QueryContext';
import { IAirportDatabase } from './lingo/AirportDatabase';
import { IUpdateCache } from './lingo/core/data/UpdateCache';
import { IDatabaseFacade, IQueryFacade } from './lingo/core/repository/DatabaseFacade';
import { ILookup } from './lingo/query/api/Lookup';
import { IEntityUtils } from './lingo/utils/EntityUtils';
import { IFieldUtils } from './lingo/utils/FieldUtils';
import { IQMetadataUtils } from './lingo/utils/QMetadataUtils';
import { IQueryUtils } from './lingo/utils/QueryUtils';
import { ISchemaUtils } from './lingo/utils/SchemaUtils';
export declare const AIR_DB: import("@airport/di").IDiToken<IAirportDatabase>;
export declare const DB_FACADE: import("@airport/di").IDiToken<IDatabaseFacade>;
export declare const LOOKUP: import("@airport/di").IDiToken<ILookup>;
export declare const ENTITY_STATE_MANAGER: import("@airport/di").IDiToken<IEntityStateManager>;
export declare const ENTITY_UTILS: import("@airport/di").IDiToken<IEntityUtils>;
export declare const FIELD_UTILS: import("@airport/di").IDiToken<IFieldUtils>;
export declare const Q_METADATA_UTILS: import("@airport/di").IDiToken<IQMetadataUtils>;
export declare const QUERY_CONTEXT_LOADER: import("@airport/di").IDiToken<IQueryContextLoader>;
export declare const QUERY_FACADE: import("@airport/di").IDiToken<IQueryFacade>;
export declare const QUERY_UTILS: import("@airport/di").IDiToken<IQueryUtils>;
export declare const RELATION_MANAGER: import("@airport/di").IDiToken<IRelationManager>;
export declare const SCHEMA_UTILS: import("@airport/di").IDiToken<ISchemaUtils>;
export declare const UPDATE_CACHE: import("@airport/di").IDiToken<IUpdateCache>;
//# sourceMappingURL=tokens.d.ts.map