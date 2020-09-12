import { JSONEntityFieldInOrderBy, QueryResultType } from '@airport/ground-control';
import { IValidator } from '../validation/Validator';
import { IEntityOrderByParser } from './AbstractEntityOrderByParser';
export declare function getOrderByParser(queryResultType: QueryResultType, selectClauseFragment: any, validator: IValidator, orderBy?: JSONEntityFieldInOrderBy[]): IEntityOrderByParser;
//# sourceMappingURL=parserFactory.d.ts.map