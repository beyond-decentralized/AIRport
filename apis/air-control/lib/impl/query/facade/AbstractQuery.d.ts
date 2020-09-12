import { JSONFieldInGroupBy, JSONFieldInOrderBy, JsonNonEntityQuery, JSONRelation, JsonStatement } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IEntityAliases, IFieldColumnAliases, Parameter } from '../../../lingo/core/entity/Aliases';
import { IEntityRelationFrom, IFrom } from '../../../lingo/core/entity/Entity';
import { IFieldInOrderBy } from '../../../lingo/core/field/FieldInOrderBy';
import { IQOperableField } from '../../../lingo/core/field/OperableField';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawNonEntityQuery } from '../../../lingo/query/facade/NonEntityQuery';
import { RawTreeQuery } from '../../../lingo/query/facade/TreeQuery';
/**
 * Created by Papa on 10/27/2016.
 */
export declare abstract class AbstractQuery implements IAbstractQuery {
    protected entityAliases: IEntityAliases;
    protected columnAliases: IFieldColumnAliases<any>;
    values: any[];
    protected isEntityQuery: boolean;
    constructor(entityAliases?: IEntityAliases, columnAliases?: IFieldColumnAliases<any>);
    getParameters(): {
        [alias: string]: Parameter;
    };
    abstract toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonStatement;
    protected getNonEntityQuery(rawQuery: RawNonEntityQuery, jsonQuery: JsonNonEntityQuery, createSelectCallback: {
        (jsonQuery: JsonNonEntityQuery): void;
    }, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonNonEntityQuery;
    protected fromClauseToJSON(fromClause: (IFrom | IEntityRelationFrom | RawTreeQuery<any>)[], queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JSONRelation[];
    protected groupByClauseToJSON(groupBy: IQOperableField<any, any, any, any>[]): JSONFieldInGroupBy[];
    protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONFieldInOrderBy[];
}
//# sourceMappingURL=AbstractQuery.d.ts.map