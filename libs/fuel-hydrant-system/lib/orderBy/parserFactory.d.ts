import { IAirportDatabase } from '@airport/air-control';
import { JSONEntityFieldInOrderBy, QueryResultType } from '@airport/ground-control';
import { IEntityOrderByParser, IValidator } from '..';
export declare function getOrderByParser(airportDb: IAirportDatabase, queryResultType: QueryResultType, selectClauseFragment: any, validator: IValidator, orderBy?: JSONEntityFieldInOrderBy[]): IEntityOrderByParser;
