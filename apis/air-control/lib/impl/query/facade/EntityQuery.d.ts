import { JSONEntityFieldInOrderBy, JsonEntityQuery, JsonLimitedEntityQuery } from '@airport/ground-control';
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IEntitySelectProperties } from '../../../lingo/core/entity/Entity';
import { IFieldInOrderBy } from '../../../lingo/core/field/FieldInOrderBy';
import { RawEntityQuery, RawLimitedEntityQuery } from '../../../lingo/query/facade/EntityQuery';
import { IQuery } from '../../../lingo/query/facade/Query';
import { MappableQuery } from './TreeQuery';
import { IRelationManager } from '../../core/entity/RelationManager';
/**
 * Created by Papa on 10/24/2016.
 */
export declare class EntityQuery<IEP extends IEntitySelectProperties> extends MappableQuery implements IQuery {
    protected rawQuery: RawEntityQuery<IEP>;
    constructor(rawQuery: RawEntityQuery<IEP>);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonEntityQuery<IEP>;
    protected nonDistinctSelectClauseToJSON(rawSelect: any): any;
    protected orderByClauseToJSON(orderBy: IFieldInOrderBy<any>[]): JSONEntityFieldInOrderBy[];
}
export declare class LimitedEntityQuery<IEP extends IEntitySelectProperties> extends EntityQuery<IEP> {
    rawQuery: RawLimitedEntityQuery<IEP>;
    constructor(rawQuery: RawLimitedEntityQuery<IEP>);
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils, relationManager: IRelationManager): JsonLimitedEntityQuery<IEP>;
}
//# sourceMappingURL=EntityQuery.d.ts.map