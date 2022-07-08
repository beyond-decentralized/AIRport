import { JsonSheetQuery } from '@airport/ground-control';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQuery } from '../../../definition/query/facade/Query';
import { RawSheetQuery } from '../../../definition/query/facade/SheetQuery';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/23/2016.
 */
export declare class SheetQuery extends DistinguishableQuery implements IQuery {
    rawQuery: RawSheetQuery;
    constructor(rawQuery: RawSheetQuery);
    nonDistinctSelectClauseToJSON(rawSelect: any[], queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonSheetQuery;
}
//# sourceMappingURL=SheetQuery.d.ts.map