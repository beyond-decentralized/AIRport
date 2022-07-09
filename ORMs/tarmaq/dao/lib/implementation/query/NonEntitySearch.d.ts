import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { DistinguishableQuery, IQOrderableField, ITreeEntity, RawFieldQuery, RawNonEntityQuery, RawSheetQuery, RawTreeQuery } from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { INonEntitySearch } from '../../definition/query/NonEntitySearch';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntitySearch extends Lookup implements INonEntitySearch {
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }, context?: IContext): Observable<any[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, context?: IContext): Observable<any[][]>;
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }, context?: IContext): Observable<ITE[]>;
    search<IQF extends IQOrderableField<IQF>>(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery, context: IContext): Promise<any[]>;
}
//# sourceMappingURL=NonEntitySearch.d.ts.map