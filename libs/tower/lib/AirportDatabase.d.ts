import { FunctionsAndOperators, IAirportDatabase, IDatabaseFacade, INonEntityFind, INonEntityFindOne, INonEntitySearch, INonEntitySearchOne, QSchema } from '@airport/air-control';
import { IQOrderableField, RawFieldQuery } from '@airport/air-control';
import { ITreeEntity, RawSheetQuery, RawTreeQuery } from '@airport/air-control/lib/src';
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
    registerQSchemas(qSchemas: QSchema[]): Promise<void>;
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
    findAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any[]>;
    findOneAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): any;
    findAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): Promise<any[][]>;
    findOneAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): Promise<any[]>;
    findAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<ITE[]>;
    findOneAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<ITE>;
}
