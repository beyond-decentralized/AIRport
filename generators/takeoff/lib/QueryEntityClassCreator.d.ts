import { QSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { ISchema } from '@airport/traffic-pattern';
export interface IQueryEntityClassCreator {
    createAll(schemas: ISchema[]): void;
}
export declare class QueryEntityClassCreator implements IQueryEntityClassCreator {
    private airDb;
    private utils;
    constructor();
    createAll(schemas: ISchema[]): void;
    create(dbSchema: DbSchema): QSchema;
}
