import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { DistinguishableQuery, IQOrderableField, ITreeEntity, RawFieldQuery, RawNonEntityQuery, RawSheetQuery, RawTreeQuery } from '@airport/tarmaq-query';
import { INonEntityFindOne } from '../../definition/query/NonEntityFindOne';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntityFindOne extends Lookup implements INonEntityFindOne {
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }, context?: IContext): Promise<any[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, context?: IContext): Promise<any>;
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }, context?: IContext): Promise<ITE>;
    findOne<IQF extends IQOrderableField<IQF>>(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery, context: IContext): Promise<any>;
}
//# sourceMappingURL=NonEntityFindOne.d.ts.map