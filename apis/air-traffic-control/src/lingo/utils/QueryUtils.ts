import { AirEntityUuId } from "@airport/aviation-communication";
import { IAirEntity, JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IQAirEntity } from "../core/entity/Entity";
import { IQAirEntityRelation } from "../core/entity/Relation";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";

export interface IQueryUtils {

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrUuId: Entity | IQAirEntity
			| IQAirEntityRelation<Entity, IQ> 
			| AirEntityUuId | string,
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation

}
