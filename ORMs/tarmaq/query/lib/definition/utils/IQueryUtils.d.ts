import { AirEntityId } from "@airport/aviation-communication";
import { IAirEntity, JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IQAirEntity } from "../core/entity/Entity";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";
export interface IQueryUtils {
    equals<Entity extends IAirEntity, IQ extends IQAirEntity>(entityOrId: Entity | IQAirEntity | AirEntityId | string, toObject: IQ): JSONLogicalOperation;
    in<Entity extends IAirEntity, IQ extends IQAirEntity>(entitiesOrIds: (Entity | AirEntityId | string)[], toObject: IQ): JSONLogicalOperation;
    whereClauseToJSON(whereClause: JSONBaseOperation, columnAliases: IFieldColumnAliases<any>): JSONBaseOperation;
}
//# sourceMappingURL=IQueryUtils.d.ts.map