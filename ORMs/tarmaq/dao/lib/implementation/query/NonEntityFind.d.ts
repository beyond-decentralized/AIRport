import { IContext } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { DistinguishableQuery, IQOrderableField, ITreeEntity, RawFieldQuery, RawNonEntityQuery, RawSheetQuery, RawTreeQuery } from '@airport/tarmaq-query';
import { INonEntityFind } from '../../definition/query/NonEntityFind';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntityFind extends Lookup implements INonEntityFind {
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }, context?: IContext): Promise<any[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void, context?: IContext): Promise<any[][]>;
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }, context?: IContext): Promise<ITE[]>;
    find<IQF extends IQOrderableField<IQF>>(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery, context: IContext): Promise<any[]>;
}
//# sourceMappingURL=NonEntityFind.d.ts.map