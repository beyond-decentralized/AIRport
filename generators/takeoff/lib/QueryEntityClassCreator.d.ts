import { IAirportDatabase, QSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { ISchema } from '@airport/traffic-pattern';
export interface IQueryEntityClassCreator {
    createAll(schemas: ISchema[], airDb: IAirportDatabase): void;
}
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    createAll(schemas: ISchema[], airDb: IAirportDatabase): void;
    create(dbSchema: DbSchema, airDb: IAirportDatabase): QSchema;
}
