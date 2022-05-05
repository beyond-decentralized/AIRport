import { AIRPORT_DATABASE, DATABASE_FACADE, QUERY_FACADE, UPDATE_CACHE_MANAGER } from '@airport/air-traffic-control';
import { API_REGISTRY, API_VALIDATOR, OPERATION_DESERIALIZER } from '@airport/check-in';
import { DEPENDENCY_INJECTION, lib } from '@airport/direction-indicator'
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { LOCAL_API_SERVER } from '@airport/apron';
import { AirportDatabase } from './AirportDatabase';
import { ApiRegistry } from './core/api/ApiRegistry';
import { ApiValidator } from './core/api/ApiValidator';
import { LocalAPIServer } from './core/api/LocalApiServer';
import { OperationDeserializer } from './core/api/OperationDeserializer';
import { EntityCopier, IEntityCopier } from './core/data/EntityCopier'
import { UpdateCacheManager } from './core/data/UpdateCacheManager';
import { EntityStateManager } from './core/EntityStateManager';
import { DatabaseFacade } from './facade/DatabaseFacade';
import { QueryFacade } from './facade/QueryFacade';

const tower = lib('tower')
tower.autopilot = false

export const ENTITY_COPIER = tower.token<IEntityCopier>({
    class: EntityCopier,
    interface: 'IEntityCopier',
    token: 'ENTITY_COPIER'
})

DEPENDENCY_INJECTION.set(AIRPORT_DATABASE, AirportDatabase);
DEPENDENCY_INJECTION.set(ENTITY_STATE_MANAGER, EntityStateManager)
DEPENDENCY_INJECTION.set(API_REGISTRY, ApiRegistry)
DEPENDENCY_INJECTION.set(API_VALIDATOR, ApiValidator)
DEPENDENCY_INJECTION.set(LOCAL_API_SERVER, LocalAPIServer)
DEPENDENCY_INJECTION.set(OPERATION_DESERIALIZER, OperationDeserializer);
DEPENDENCY_INJECTION.set(UPDATE_CACHE_MANAGER, UpdateCacheManager)
DEPENDENCY_INJECTION.set(DATABASE_FACADE, DatabaseFacade)
DATABASE_FACADE.setDependencies({
	entityCopier: ENTITY_COPIER,
	queryFacade: QUERY_FACADE
})
DEPENDENCY_INJECTION.set(QUERY_FACADE, QueryFacade);
