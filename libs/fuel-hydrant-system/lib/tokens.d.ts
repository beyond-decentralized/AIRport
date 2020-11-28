import { ISubStatementSqlGenerator } from './sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from './result/entity/ObjectResultParserFactory';
import { ISQLQueryAdaptor } from './adaptor/SQLQueryAdaptor';
import { IActiveQueries } from './store/ActiveQueries';
import { IIdGenerator } from './store/IdGenerator';
import { IValidator } from './validation/Validator';
export declare const ACTIVE_QUERIES: import("@airport/di").IDiToken<IActiveQueries>;
export declare const SUB_STATEMENT_SQL_GENERATOR: import("@airport/di").IDiToken<ISubStatementSqlGenerator>;
export declare const ID_GENERATOR: import("@airport/di").IDiToken<IIdGenerator>;
export declare const OBJECT_RESULT_PARSER_FACTORY: import("@airport/di").IDiToken<IObjectResultParserFactory>;
export declare const SQL_QUERY_ADAPTOR: import("@airport/di").IDiToken<ISQLQueryAdaptor>;
export declare const Q_VALIDATOR: import("@airport/di").IDiToken<IValidator>;
//# sourceMappingURL=tokens.d.ts.map