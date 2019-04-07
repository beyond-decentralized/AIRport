import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, QSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
export declare class AirportDatabase implements IAirportDatabase {
    functions: FunctionsAndOperators;
    F: FunctionsAndOperators;
    schemas: DbSchema[];
    S: DbSchema[];
    qSchemas: QSchema[];
    Q: QSchema[];
    QM: {
        [name: string]: QSchema;
    };
    private databaseMap;
    private dbNames;
    private dbNameSet;
    private currentDbName;
    constructor();
    registerDatabase(facade: IDatabaseFacade): void;
    registerSchema(qSchema: QSchema): void;
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
