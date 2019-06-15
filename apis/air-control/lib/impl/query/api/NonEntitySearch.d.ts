import { IObservable } from '@airport/observe';
import { IQOrderableField } from '../../../lingo/core/field/Field';
import { IDatabaseFacade } from '../../../lingo/core/repository/DatabaseFacade';
import { INonEntitySearch } from '../../../lingo/query/api/NonEntitySearch';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntitySearch implements INonEntitySearch {
    private dbFacade;
    constructor(dbFacade: IDatabaseFacade);
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }): IObservable<any[][]>;
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any[]>;
    private doSearch;
}
