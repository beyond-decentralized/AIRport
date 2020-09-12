import { JsonSheetQuery } from '@airport/ground-control';
import { IQuery } from '../../../lingo/query/facade/Query';
import { RawSheetQuery } from '../../../lingo/query/facade/SheetQuery';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/23/2016.
 */
export declare class SheetQuery extends DistinguishableQuery implements IQuery {
    rawQuery: RawSheetQuery;
    constructor(rawQuery: RawSheetQuery);
    nonDistinctSelectClauseToJSON(rawSelect: any[], queryUtils: IQueryUtils, fieldUtils: IFieldUtils): any;
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonSheetQuery;
}
//# sourceMappingURL=SheetQuery.d.ts.map