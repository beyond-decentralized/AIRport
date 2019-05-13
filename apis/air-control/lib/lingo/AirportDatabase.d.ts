import { DbSchema } from '@airport/ground-control';
import { QRelation } from '..';
import { QEntityConstructor } from '../impl/core/entity/Entity';
import { EntityConstructor } from './core/entity/Entity';
import { FunctionsAndOperators } from './core/FunctionsAndOperators';
import { IDatabaseFacade } from './core/repository/DatabaseFacade';
import { INonEntityFind } from './query/api/NonEntityFind';
import { INonEntityFindOne } from './query/api/NonEntityFindOne';
import { INonEntitySearch } from './query/api/NonEntitySearch';
import { INonEntitySearchOne } from './query/api/NonEntitySearchOne';
export interface FunctionAndOperatorHub {
    functions: FunctionsAndOperators;
    F: FunctionsAndOperators;
}
export interface SchemaHub {
    schemas: DbSchema[];
    S: DbSchema[];
    qSchemas: QSchema[];
    Q: QSchema[];
    QM: {
        [name: string]: QSchema;
    };
}
export interface IAirportDatabase extends SchemaHub, FunctionAndOperatorHub {
    registerDatabase(facade: IDatabaseFacade): any;
    registerQSchemas(qSchemas: QSchema[]): any;
    setCurrentDb(dbName: string): any;
    getDbNames(): string[];
    getDbNameSet(): {
        [databaseName: string]: boolean;
    };
    db: IDatabaseFacade;
    find: INonEntityFind;
    findOne: INonEntityFindOne;
    search: INonEntitySearch;
    searchOne: INonEntitySearchOne;
}
export interface QSchema {
    [name: string]: any;
    domain: string;
    name: string;
}
export interface QSchemaInternal extends QSchema {
    __constructors__?: {
        [name: string]: EntityConstructor;
    };
    __qConstructors__?: {
        [name: string]: QEntityConstructor;
    };
    __qIdRelationConstructors__?: typeof QRelation[];
    __dbSchema__?: DbSchema;
}
