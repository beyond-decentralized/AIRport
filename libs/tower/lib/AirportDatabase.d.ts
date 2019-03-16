import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, QSchema } from '@airport/air-control';
import { DbSchema, JsonSchema } from '@airport/ground-control';
export declare class AirportDatabase implements IAirportDatabase {
    functions: FunctionsAndOperators;
    F: FunctionsAndOperators;
    schemas: DbSchema[];
    S: DbSchema[];
    schemaMapByName: {
        [name: string]: DbSchema;
    };
    SM: {
        [name: string]: DbSchema;
    };
    qSchemas: QSchema[];
    Q: QSchema[];
    qSchemaMapByName: {
        [name: string]: QSchema;
    };
    QM: {
        [name: string]: QSchema;
    };
    private databaseMap;
    private dbNames;
    private dbNameSet;
    private schemaTuples;
    private currentDbName;
    registerDatabase(facade: IDatabaseFacade): void;
    registerSchema(schema: JsonSchema, qSchema: QSchema): void;
    setCurrentDb(dbName?: string): void;
    getDbNames(): string[];
    getDbNameSet(): {
        [databaseName: string]: boolean;
    };
    readonly db: IDatabaseFacade;
    readonly find: INonEntityFind;
    readonly findOne: INonEntityFindOne;
    readonly search: INonEntitySearch;
    readonly searchOne: INonEntitySearchOne;
}
