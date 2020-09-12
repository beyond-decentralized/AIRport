import { QueryResultType } from '@airport/ground-control';
import { IQOrderableField } from '../../../lingo/core/field/Field';
import { INonEntityFind } from '../../../lingo/query/api/NonEntityFind';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { RawNonEntityQuery } from '../../../lingo/query/facade/NonEntityQuery';
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery';
import { ITreeEntity, RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
import { DistinguishableQuery } from '../facade/NonEntityQuery';
import { Lookup } from './Lookup';
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntityFind extends Lookup implements INonEntityFind {
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Promise<any[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }, cursorSize?: number | ((data: any[]) => void), callback?: (data: any[][]) => void): Promise<any[][]>;
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Promise<ITE[]>;
    find<IQF extends IQOrderableField<IQF>>(rawNonEntityQuery: RawNonEntityQuery | {
        (...args: any[]): RawNonEntityQuery;
    }, queryResultType: QueryResultType, QueryClass: new (rawNonEntityQuery: RawNonEntityQuery) => DistinguishableQuery): Promise<any[]>;
}
//# sourceMappingURL=NonEntityFind.d.ts.map