import { JSONEntityFieldInOrderBy, JsonEntityQuery, JsonLimitedEntityQuery } from '@airport/ground-control';
import { IEntitySelectProperties } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { IFieldInOrderBy } from '../../../definition/core/field/FieldInOrderBy';
import { RawEntityQuery, RawLimitedEntityQuery } from '../../../definition/query/facade/EntityQuery';
import { IQuery } from '../../../definition/query/facade/Query';
import { IFieldUtils } from '../../../definition/utils/IFieldUtils';
import { IQueryUtils } from '../../../definition/utils/IQueryUtils';
import { MappableQuery } from './MappableQuery';
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