import { IDao } from '@airport/air-traffic-control';
import { IApiRegistry, IApiValidator } from '.';
import { IClientQueryManager } from './clientQuery/ClientQueryManager';
import { ISelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';
export declare const API_REGISTRY: import("@airport/direction-indicator").IDependencyInjectionToken<IApiRegistry>;
export declare const API_VALIDATOR: import("@airport/direction-indicator").IDependencyInjectionToken<IApiValidator>;
export declare const CLIENT_QUERY_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<IClientQueryManager>;
export declare const DAO: import("@airport/direction-indicator").IDependencyInjectionToken<IDao<any, any, any, any, any, any, any, any>>;
export declare const OPERATION_DESERIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<IOperationDeserializer>;
export declare const QUERY_PARAMETER_DESERIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<IQueryParameterDeserializer>;
export declare const QUERY_RESULTS_SERIALIZER: import("@airport/direction-indicator").IDependencyInjectionToken<IQueryResultsSerializer>;
export declare const SELECTOR_MANAGER: import("@airport/direction-indicator").IDependencyInjectionToken<ISelectorManager>;
export declare const SEQUENCE_GENERATOR: import("@airport/direction-indicator").IDependencyInjectionToken<ISequenceGenerator>;
//# sourceMappingURL=tokens.d.ts.map