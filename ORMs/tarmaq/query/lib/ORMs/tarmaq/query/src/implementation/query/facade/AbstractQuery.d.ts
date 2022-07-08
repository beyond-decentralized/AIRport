import { JSONFieldInGroupBy, JSONFieldInOrderBy, JsonNonEntityQuery, JSONRelation, JsonStatement } from '@airport/ground-control';
import { IEntityAliases, IFieldColumnAliases, Parameter } from '../../../definition/core/entity/Aliases';
import { IEntityRelationFrom, IFrom } from '../../../definition/core/entity/Entity';
import { IFieldInOrderBy } from '../../../definition/core/field/FieldInOrderBy';
import { IQOperableField } from '../../../definition/core/field/OperableField';
import { IAbstractQuery } from '../../../definition/query/facade/AbstractQuery';
import { RawNonEntityQuery } from '../../../definition/query/facade/NonEntityQuery';
import { RawTreeQuery } from '../../../definition/query/facade/TreeQuery';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
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
    abstract toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonStatement;
    protected getNonEntityQuery(rawQuery: RawNonEntityQuery, jsonQuery: JsonNonEntityQuery, createSelectCallback: {
        (jsonQuery: JsonNonEntityQuery): void;
    }, queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonNonEntityQuery;
    protected fromClauseToJSON(fromClause: (IFrom | IEntityRelationFrom | RawTreeQuery<any>)[], queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JSONRelation[];
    protected groupByClauseToJSON(groupBy: IQOperableField<any, any, any, any>[]): JSONFieldInGroupBy[];
    protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONFieldInOrderBy[];
}
//# sourceMappingURL=AbstractQuery.d.ts.map