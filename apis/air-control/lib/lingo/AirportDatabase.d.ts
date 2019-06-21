import { DbSchema } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { QEntityConstructor } from '../impl/core/entity/Entity';
import { QRelation } from '../impl/core/entity/Relation';
import { EntityConstructor } from './core/entity/Entity';
import { IQOrderableField } from './core/field/Field';
import { FunctionsAndOperators } from './core/FunctionsAndOperators';
import { RawFieldQuery } from './query/facade/FieldQuery';
import { RawSheetQuery } from './query/facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from './query/facade/TreeQuery';
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
