import { AirEntityId, IAirEntityUtils } from '@airport/aviation-communication';
import { IAirEntity, JSONBaseOperation } from '@airport/ground-control';
import { IEntityUtils, IFieldColumnAliases, IFieldUtils, IQAirEntity, IQueryUtils, IRelationManager, JSONLogicalOperation } from '@airport/tarmaq-query';
export declare class QueryUtils implements IQueryUtils {
    entityUtils: IEntityUtils;
    fieldUtils: IFieldUtils;
    relationManager: IRelationManager;
    airEntityUtils: IAirEntityUtils;
    equals<Entity extends IAirEntity, IQ extends IQAirEntity>(entityOrId: Entity | IQAirEntity | AirEntityId | string, toObject: IQ): JSONLogicalOperation;
    in<Entity extends IAirEntity, IQ extends IQAirEntity>(entitiesOrIds: (Entity | AirEntityId | string)[], toObject: IQ): JSONLogicalOperation;
    private validateEntityId;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
    private convertLRValue;
}
//# sourceMappingURL=QueryUtils.d.ts.map