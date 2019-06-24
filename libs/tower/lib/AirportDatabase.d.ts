import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, QSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
export declare class AirportDatabase implements IAirportDatabase {
    db: IDatabaseFacade;
    F: FunctionsAndOperators;
    functions: FunctionsAndOperators;
    S: DbSchema[];
    schemas: DbSchema[];
    qSchemas: QSchema[];
    Q: QSchema[];
    QM: {
        [name: string]: QSchema;
    };
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
    constructor();
}
