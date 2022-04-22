import { ISubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from './result/entity/ObjectResultParserFactory';
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor';
import { IActiveQueries } from './store/ActiveQueries';
import { IIdGenerator } from './store/IdGenerator';
import { IValidator } from './validation/Validator';
export declare const ACTIVE_QUERIES: import("@airport/di").IDependencyInjectionToken<IActiveQueries>;
export declare const SUB_STATEMENT_SQL_GENERATOR: import("@airport/di").IDependencyInjectionToken<ISubStatementSqlGenerator>;
export declare const ID_GENERATOR: import("@airport/di").IDependencyInjectionToken<IIdGenerator>;
export declare const OBJECT_RESULT_PARSER_FACTORY: import("@airport/di").IDependencyInjectionToken<IObjectResultParserFactory>;
export declare const SQL_QUERY_ADAPTOR: import("@airport/di").IDependencyInjectionToken<ISQLQueryAdaptor>;
export declare const Q_VALIDATOR: import("@airport/di").IDependencyInjectionToken<IValidator>;
//# sourceMappingURL=tokens.d.ts.map