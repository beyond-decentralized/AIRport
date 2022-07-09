import { AirEntityId, IAirEntityUtils } from '@airport/aviation-communication';
import { IAirEntity, JSONBaseOperation } from '@airport/ground-control';
import { IEntityUtils, IFieldColumnAliases, IFieldUtils, IQAirEntity, IQAirEntityRelation, IQueryUtils, IRelationManager, JSONLogicalOperation } from '@airport/tarmaq-query';
export declare class QueryUtils implements IQueryUtils {
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    airEntityUtils: IAirEntityUtils;
    equals<Entity extends IAirEntity, IQ extends IQAirEntity>(entityOrId: Entity | IQAirEntity | IQAirEntityRelation<Entity, IQ> | AirEntityId | string, toObject: IQ): JSONLogicalOperation;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map