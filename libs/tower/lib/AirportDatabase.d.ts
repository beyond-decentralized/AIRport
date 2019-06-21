import { FunctionsAndOperators, IAirportDatabase, IQOrderableField, ITreeEntity, QSchema, RawFieldQuery, RawSheetQuery, RawTreeQuery } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
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
    constructor();
    findAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any[]>;
    findOneAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any>;
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
    searchAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any[]>;
    searchOneAsField<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any>;
    searchAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): IObservable<any[][]>;
    searchOneAsSheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): IObservable<any[]>;
    searchAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE[]>;
    searchOneAsTree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE>;
    private find;
    private search;
}
