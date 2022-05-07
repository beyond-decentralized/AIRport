import { AIRPORT_DATABASE, DATABASE_FACADE, QUERY_FACADE, UPDATE_CACHE_MANAGER } from '@airport/air-traffic-control';
import { API_REGISTRY, API_VALIDATOR, OPERATION_DESERIALIZER } from '@airport/check-in';
import { lib } from '@airport/direction-indicator';
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { LOCAL_API_SERVER } from '@airport/apron';
import { AirportDatabase } from './AirportDatabase';
import { ApiRegistry } from './core/api/ApiRegistry';
import { ApiValidator } from './core/api/ApiValidator';
import { LocalAPIServer } from './core/api/LocalApiServer';
import { OperationDeserializer } from './core/api/OperationDeserializer';
import { EntityCopier } from './core/data/EntityCopier';
import { UpdateCacheManager } from './core/data/UpdateCacheManager';
import { EntityStateManager } from './core/EntityStateManager';
import { DatabaseFacade } from './facade/DatabaseFacade';
import { QueryFacade } from './facade/QueryFacade';
const tower = lib('tower');
export const ENTITY_COPIER = tower.token({
    class: EntityCopier,
    interface: 'IEntityCopier',
    token: 'ENTITY_COPIER'
});
AIRPORT_DATABASE.setClass(AirportDatabase);
ENTITY_STATE_MANAGER.setClass(EntityStateManager);
API_REGISTRY.setClass(ApiRegistry);
API_VALIDATOR.setClass(ApiValidator);
LOCAL_API_SERVER.setClass(LocalAPIServer);
OPERATION_DESERIALIZER.setClass(OperationDeserializer);
UPDATE_CACHE_MANAGER.setClass(UpdateCacheManager);
DATABASE_FACADE.setClass(DatabaseFacade);
DATABASE_FACADE.setDependencies({
    entityCopier: ENTITY_COPIER,
    queryFacade: QUERY_FACADE
});
QUERY_FACADE.setClass(QueryFacade);
//# sourceMappingURL=tokens.js.map