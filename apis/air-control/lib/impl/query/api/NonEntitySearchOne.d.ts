import { QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { IQOrderableField } from '../../../lingo/core/field/Field';
import { INonEntitySearchOne } from '../../../lingo/query/api/NonEntitySearchOne';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { RawNonEntityQuery } from '../../../lingo/query/facade/NonEntityQuery';
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { DistinguishableQuery } from '../facade/NonEntityQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntitySearchOne extends Lookup implements INonEntitySearchOne {
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): IObservable<ITE>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }): IObservable<any[]>;
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): IObservable<any>;
    searchOne<IQF extends IQOrderableField<IQF>>(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery): Promise<IObservable<any[]>>;
}
//# sourceMappingURL=NonEntitySearchOne.d.ts.map