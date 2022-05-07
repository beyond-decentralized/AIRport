import { AIRPORT_DATABASE, DATABASE_FACADE, IDao, LOOKUP, UPDATE_CACHE_MANAGER } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator';
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { IApiRegistry, IApiValidator } from '.';
import { Dao } from './dao/Dao';
import { ISelectorManager, SelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';

const checkIn = lib('check-in')

export const API_REGISTRY = checkIn.token<IApiRegistry>({
    class: null,
    interface: 'IApiRegistry',
    token: 'API_REGISTRY'
})
export const API_VALIDATOR = checkIn.token<IApiValidator>({
    class: null,
    interface: 'IApiValidator',
    token: 'API_VALIDATOR'
})
export const DAO = checkIn.token<IDao<any, any, any, any, any, any, any, any>>({
    class: Dao,
    interface: 'class Dao',
    token: 'DAO'
})
export const OPERATION_DESERIALIZER = checkIn.token<IOperationDeserializer>({
    class: null,
    interface: 'IOperationDeserializer',
    token: 'OPERATION_DESERIALIZER'
});
export const QUERY_PARAMETER_DESERIALIZER = checkIn.token<IQueryParameterDeserializer>({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_PARAMETER_DESERIALIZER'
});
export const QUERY_RESULTS_SERIALIZER = checkIn.token<IQueryResultsSerializer>({
    class: null,
    interface: 'IQueryParameterDeserializer',
    token: 'QUERY_RESULTS_SERIALIZER'
});
export const SELECTOR_MANAGER = checkIn.token<ISelectorManager>({
    class: SelectorManager,
    interface: 'ISelectorManager',
    token: 'SELECTOR_MANAGER'
});
export const SEQUENCE_GENERATOR = checkIn.token<ISequenceGenerator>({
    class: null,
    interface: 'ISequenceGenerator',
    token: 'SEQUENCE_GENERATOR'
});

DAO.setDependencies({
    airportDatabase: AIRPORT_DATABASE,
    databaseFacade: DATABASE_FACADE,
    entityStateManager: ENTITY_STATE_MANAGER,
    lookup: LOOKUP,
    updateCacheManager: UPDATE_CACHE_MANAGER
})
