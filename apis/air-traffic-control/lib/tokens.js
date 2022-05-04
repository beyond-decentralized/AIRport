import { lib } from '@airport/direction-indicator';
import { RelationManager } from './impl/core/entity/RelationManager';
import { ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { Lookup } from './impl/query/api/Lookup';
import { EntityUtils } from './impl/utils/EntityUtils';
import { QMetadataUtils } from './impl/utils/QMetadataUtils';
import { QueryUtils } from './impl/utils/QueryUtils';
import { ApplicationUtils } from './impl/utils/ApplicationUtils';
import { FieldUtils } from './impl/utils/FieldUtils';
const airControl = lib('air-traffic-control');
export const AIRPORT_DATABASE = airControl.token({
    class: null,
    interface: 'IAirportDatabase',
    token: 'AIRPORT_DATABASE'
});
export const APPLICATION_UTILS = airControl.token({
    class: ApplicationUtils,
    interface: 'IApplicationUtils',
    token: 'APPLICATION_UTILS'
});
export const DATABASE_FACADE = airControl.token({
    class: null,
    interface: 'IDatabaseFacade',
    token: 'DATABASE_FACADE'
});
export const ENTITY_UTILS = airControl.token({
    class: EntityUtils,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
});
export const FIELD_UTILS = airControl.token({
    class: FieldUtils,
    interface: 'IFieldUtils',
    token: 'FIELD_UTILS'
});
export const LOOKUP = airControl.token({
    class: Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
});
export const Q_METADATA_UTILS = airControl.token({
    class: QMetadataUtils,
    interface: 'IQMetadataUtils',
    token: 'Q_METADATA_UTILS'
});
export const QUERY_FACADE = airControl.token({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
});
export const QUERY_UTILS = airControl.token({
    class: QueryUtils,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
});
export const RELATION_MANAGER = airControl.token({
    class: RelationManager,
    interface: 'IRelationManager',
    token: 'RELATION_MANAGER'
});
export const REPOSITORY_LOADER = airControl.token({
    class: null,
    interface: 'IRepositoryLoader',
    token: 'REPOSITORY_LOADER'
});
export const UPDATE_CACHE_MANAGER = airControl.token({
    class: null,
    interface: 'IUpdateCacheManager',
    token: 'UPDATE_CACHE_MANAGER'
});
AIRPORT_DATABASE.setDependencies({
    databaseFacade: DATABASE_FACADE,
    updateCacheManager: UPDATE_CACHE_MANAGER
});
APPLICATION_UTILS.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    entityStateManager: ENTITY_STATE_MANAGER
});
DATABASE_FACADE.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    updateCacheManager: UPDATE_CACHE_MANAGER
});
FIELD_UTILS.setDependencies({
    relationManager: RELATION_MANAGER
});
LOOKUP.setDependencies({
    entityUtils: ENTITY_UTILS,
    queryFacade: QUERY_FACADE
});
QUERY_FACADE.setDependencies({
    fieldUtils: FIELD_UTILS,
    queryUtils: QUERY_UTILS,
    relationManager: RELATION_MANAGER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR
});
QUERY_UTILS.setDependencies({
    fieldUtils: FIELD_UTILS,
    relationManager: RELATION_MANAGER
});
RELATION_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS
});
UPDATE_CACHE_MANAGER.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
});
//# sourceMappingURL=tokens.js.map