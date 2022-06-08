import { AirEntityUuId, IAirEntityUtils } from '@airport/aviation-communication';
import { IAirEntity, JSONBaseOperation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases';
import { IQAirEntity } from '../../lingo/core/entity/Entity';
import { IQAirEntityRelation } from '../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../lingo/core/operation/LogicalOperation';
import { IEntityUtils } from '../../lingo/utils/EntityUtils';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { IRelationManager } from '../core/entity/RelationManager';
export declare class QueryUtils implements IQueryUtils {
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    airEntityUtils: IAirEntityUtils;
    equals<Entity extends IAirEntity, IQ extends IQAirEntity>(entityOrUuId: Entity | IQAirEntity | IQAirEntityRelation<Entity, IQ> | AirEntityUuId | string, toObject: IQ): JSONLogicalOperation;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map