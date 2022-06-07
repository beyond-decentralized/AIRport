import { IAirEntityUtils, AirEntityUuId } from '@airport/aviation-communication';
import { IAirEntity, JSONBaseOperation } from '@airport/ground-control';
import { IFieldColumnAliases } from '../../lingo/core/entity/Aliases';
import { IQEntityInternal, IQAirEntity } from '../../lingo/core/entity/Entity';
import { IQAirEntityRelation } from '../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../lingo/core/operation/LogicalOperation';
import { IFieldUtils } from '../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../lingo/utils/QueryUtils';
import { IRelationManager } from '../core/entity/RelationManager';
export declare class QueryUtils implements IQueryUtils {
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    airEntityUtils: IAirEntityUtils;
    equals<Entity extends IAirEntity, IQ extends IQEntityInternal>(entityOrUuId: Entity | IQAirEntity | IQAirEntityRelation<Entity, IQ> | AirEntityUuId | string, toObject: any): JSONLogicalOperation;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map