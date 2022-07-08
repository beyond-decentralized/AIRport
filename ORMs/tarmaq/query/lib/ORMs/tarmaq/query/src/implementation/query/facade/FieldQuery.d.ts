import { JsonFieldQuery, SQLDataType } from '@airport/ground-control';
import { IEntityAliases } from '../../../definition/core/entity/Aliases';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IQOrderableField } from '../../../definition/core/field/Field';
import { RawFieldQuery } from '../../../definition/query/facade/FieldQuery';
import { IQuery } from '../../../definition/query/facade/Query';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare class FieldQuery<IQF extends IQOrderableField<IQF>> extends DistinguishableQuery implements IQuery {
    private rawQuery;
    constructor(rawQuery: RawFieldQuery<IQF>, entityAliases?: IEntityAliases);
    nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): any;
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonFieldQuery;
    getClauseDataType(): SQLDataType;
}
//# sourceMappingURL=FieldQuery.d.ts.map