import { IAirportDatabase, IRelationManager } from '@airport/air-control';
import { JSONEntityFieldInOrderBy, QueryResultType } from '@airport/ground-control';
import { IValidator } from '../validation/Validator';
import { IEntityOrderByParser } from './AbstractEntityOrderByParser';
export declare function getOrderByParser(queryResultType: QueryResultType, selectClauseFragment: any, airportDatabase: IAirportDatabase, qValidator: IValidator, relationalManager: IRelationManager, orderBy?: JSONEntityFieldInOrderBy[]): IEntityOrderByParser;
//# sourceMappingURL=parserFactory.d.ts.map