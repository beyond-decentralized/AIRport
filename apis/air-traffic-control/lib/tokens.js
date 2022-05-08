import { lib } from '@airport/direction-indicator';
import { RelationManager } from './impl/core/entity/RelationManager';
import { DB_APPLICATION_UTILS, ENTITY_STATE_MANAGER, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { Lookup } from './impl/query/api/Lookup';
import { EntityUtils } from './impl/utils/EntityUtils';
import { QMetadataUtils } from './impl/utils/QMetadataUtils';
import { QueryUtils } from './impl/utils/QueryUtils';
import { ApplicationUtils } from './impl/utils/ApplicationUtils';
import { FieldUtils } from './impl/utils/FieldUtils';
import { NonEntityFind } from './impl/query/api/NonEntityFind';
import { NonEntityFindOne } from './impl/query/api/NonEntityFindOne';
import { NonEntitySearch } from './impl/query/api/NonEntitySearch';
import { NonEntitySearchOne } from './impl/query/api/NonEntitySearchOne';
import { DatabaseStore } from './impl/DatabaseStore';
import { Utils } from './impl/Utils';
const airTrafficControl = lib('air-traffic-control');
export const AIRPORT_DATABASE = airTrafficControl.token({
    class: null,
    interface: 'IAirportDatabase',
    token: 'AIRPORT_DATABASE'
});
export const APPLICATION_UTILS = airTrafficControl.token({
    class: ApplicationUtils,
    interface: 'IApplicationUtils',
    token: 'APPLICATION_UTILS'
});
export const DATABASE_FACADE = airTrafficControl.token({
    class: null,
    interface: 'IDatabaseFacade',
    token: 'DATABASE_FACADE'
});
export const DATABASE_STORE = airTrafficControl.token({
    class: DatabaseStore,
    interface: 'IDatabaseState',
    token: 'DATABASE_STORE'
});
export const ENTITY_UTILS = airTrafficControl.token({
    class: EntityUtils,
    interface: 'IEntityUtils',
    token: 'ENTITY_UTILS'
});
export const FIELD_UTILS = airTrafficControl.token({
    class: FieldUtils,
    interface: 'IFieldUtils',
    token: 'FIELD_UTILS'
});
export const LOOKUP = airTrafficControl.token({
    class: Lookup,
    interface: 'ILookup',
    token: 'LOOKUP'
});
export const NON_ENTITY_FIND = airTrafficControl.token({
    class: NonEntityFind,
    interface: 'INonEntityFind',
    token: 'NON_ENTITY_FIND'
});
export const NON_ENTITY_FIND_ONE = airTrafficControl.token({
    class: NonEntityFindOne,
    interface: 'INonEntityFindOne',
    token: 'NON_ENTITY_FIND_ONE'
});
export const NON_ENTITY_SEARCH = airTrafficControl.token({
    class: NonEntitySearch,
    interface: 'INonEntitySearch',
    token: 'NON_ENTITY_SEARCH'
});
export const NON_ENTITY_SEARCH_ONE = airTrafficControl.token({
    class: NonEntitySearchOne,
    interface: 'INonEntitySearchOne',
    token: 'NON_ENTITY_SEARCH_ONE'
});
export const Q_METADATA_UTILS = airTrafficControl.token({
    class: QMetadataUtils,
    interface: 'IQMetadataUtils',
    token: 'Q_METADATA_UTILS'
});
export const QUERY_FACADE = airTrafficControl.token({
    class: null,
    interface: 'IQueryFacade',
    token: 'QUERY_FACADE'
});
export const QUERY_UTILS = airTrafficControl.token({
    class: QueryUtils,
    interface: 'IQueryUtils',
    token: 'QUERY_UTILS'
});
export const RELATION_MANAGER = airTrafficControl.token({
    class: RelationManager,
    interface: 'IRelationManager',
    token: 'RELATION_MANAGER'
});
export const REPOSITORY_LOADER = airTrafficControl.token({
    class: null,
    interface: 'IRepositoryLoader',
    token: 'REPOSITORY_LOADER'
});
export const UPDATE_CACHE_MANAGER = airTrafficControl.token({
    class: null,
    interface: 'IUpdateCacheManager',
    token: 'UPDATE_CACHE_MANAGER'
});
export const UTILS = airTrafficControl.token({
    class: Utils,
    interface: 'IUtils',
    token: 'UTILS'
});
AIRPORT_DATABASE.setDependencies({
    databaseFacade: DATABASE_FACADE,
    databaseStore: DATABASE_STORE,
    dbApplicationUtils: DB_APPLICATION_UTILS,
    find: NON_ENTITY_FIND,
    findOne: NON_ENTITY_FIND_ONE,
    search: NON_ENTITY_SEARCH,
    searchOne: NON_ENTITY_SEARCH_ONE
});
APPLICATION_UTILS.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    entityStateManager: ENTITY_STATE_MANAGER,
    utils: UTILS
});
DATABASE_FACADE.setDependencies({
    applicationUtils: APPLICATION_UTILS,
    entityStateManager: ENTITY_STATE_MANAGER,
    transactionalConnector: TRANSACTIONAL_CONNECTOR,
    updateCacheManager: UPDATE_CACHE_MANAGER
});
ENTITY_UTILS.setDependencies({
    utils: UTILS
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