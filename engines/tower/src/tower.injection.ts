import { AIRPORT_DATABASE, API_REGISTRY, API_VALIDATOR } from '@airport/air-traffic-control';
import { QUERY_RESULTS_DESERIALIZER, lib, ContainerAccessor } from '@airport/direction-indicator'
import { ENTITY_STATE_MANAGER, OPERATION_DESERIALIZER, UPDATE_CACHE_MANAGER } from '@airport/ground-control';
import { AirportDatabase } from './AirportDatabase';
import { ApiRegistry } from './core/api/ApiRegistry';
import { ApiValidator } from './core/api/ApiValidator';
import { LocalAPIServer } from './core/api/LocalApiServer';
import { OperationDeserializer } from './core/api/OperationDeserializer';
import { EntityCopier } from './core/data/EntityCopier'
import { UpdateCacheManager } from './core/data/UpdateCacheManager';
import { EntityStateManager } from './core/EntityStateManager';
import { DatabaseFacade } from './facade/DatabaseFacade';
import { QueryFacade } from './facade/QueryFacade';
import { DATABASE_FACADE, QUERY_FACADE } from '@airport/tarmaq-dao';
import { ApplicationStore } from './state/ApplicationStore';
import { RequestManager } from './core/api/RequestManager';
import { LOCAL_API_SERVER } from '@airport/terminal-map';

const tower = lib('tower')

tower.register(ApplicationStore, EntityCopier, RequestManager)

AIRPORT_DATABASE.setClass(AirportDatabase);

ENTITY_STATE_MANAGER.setClass(EntityStateManager)

API_REGISTRY.setClass(ApiRegistry)
API_REGISTRY.setDependencies({
    applicationStore: ApplicationStore,
    containerAccessor: ContainerAccessor
})

API_VALIDATOR.setClass(ApiValidator)

LOCAL_API_SERVER.setClass(LocalAPIServer)

LOCAL_API_SERVER.setDependencies({
    apiRegistry: API_REGISTRY,
    applicationStore: ApplicationStore,
    queryResultsDeserializer: QUERY_RESULTS_DESERIALIZER,
    requestManager: RequestManager
})

OPERATION_DESERIALIZER.setClass(OperationDeserializer);

UPDATE_CACHE_MANAGER.setClass(UpdateCacheManager)

DATABASE_FACADE.setClass(DatabaseFacade)
DATABASE_FACADE.setDependencies({
    entityCopier: EntityCopier,
    queryFacade: QUERY_FACADE
})

QUERY_FACADE.setClass(QueryFacade);
