import { IAirportDatabase, IUtils, QSchema } from '@airport/air-control';
import { DbSchema, IDbSchemaUtils } from '@airport/ground-control';
import { ISchema } from '@airport/traffic-pattern';
export interface IQueryEntityClassCreator {
    createAll(schemas: ISchema[]): void;
}
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    private airportDatabase;
    private utils;
    private dbSchemaUtils;
    constructor(airportDatabase: IAirportDatabase, utils: IUtils, dbSchemaUtils: IDbSchemaUtils);
    createAll(schemas: ISchema[]): void;
    create(dbSchema: DbSchema): QSchema;
}
