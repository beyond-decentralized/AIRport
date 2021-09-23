import { IApiRegistry, IApiValidator, IApplicationInitializer } from '.';
import { IClientQueryManager } from './clientQuery/ClientQueryManager';
import { ISelectorManager } from './Selector';
import { ISequenceGenerator } from './SequenceGenerator';
import { IOperationDeserializer } from './serialize/OperationDeserializer';
import { IQueryParameterDeserializer } from './serialize/QueryParameterDeserializer';
import { IQueryResultsSerializer } from './serialize/QueryResultsSerializer';
export declare const API_REGISTRY: import("@airport/di").IDiToken<IApiRegistry>;
export declare const API_VALIDATOR: import("@airport/di").IDiToken<IApiValidator>;
export declare const CLIENT_QUERY_MANAGER: import("@airport/di").IDiToken<IClientQueryManager>;
export declare const APPLICATION_INITIALIZER: import("@airport/di").IDiToken<IApplicationInitializer>;
export declare const OPERATION_DESERIALIZER: import("@airport/di").IDiToken<IOperationDeserializer>;
export declare const QUERY_PARAMETER_DESERIALIZER: import("@airport/di").IDiToken<IQueryParameterDeserializer>;
export declare const QUERY_RESULTS_SERIALIZER: import("@airport/di").IDiToken<IQueryResultsSerializer>;
export declare const SELECTOR_MANAGER: import("@airport/di").IDiToken<ISelectorManager>;
export declare const SEQUENCE_GENERATOR: import("@airport/di").IDiToken<ISequenceGenerator>;
//# sourceMappingURL=tokens.d.ts.map