import { JsonFieldQuery, SQLDataType } from '@airport/ground-control';
import { IEntityAliases } from '../../../lingo/core/entity/Aliases';
import { IQOrderableField } from '../../../lingo/core/field/Field';
import { RawFieldQuery } from '../../../lingo/query/facade/FieldQuery';
import { IQuery } from '../../../lingo/query/facade/Query';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { DistinguishableQuery } from './NonEntityQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export declare class FieldQuery<IQF extends IQOrderableField<IQF>> extends DistinguishableQuery implements IQuery {
    private rawQuery;
    constructor(rawQuery: RawFieldQuery<IQF>, entityAliases?: IEntityAliases);
    nonDistinctSelectClauseToJSON(rawSelect: any, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): any;
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonFieldQuery;
    getClauseDataType(): SQLDataType;
}
