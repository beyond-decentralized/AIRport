import { AirEntityId } from "@airport/aviation-communication";
import { IAirEntity, JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IQAirEntity } from "../core/entity/Entity";
import { IQAirEntityRelation } from "../core/entity/Relation";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";

export interface IQueryUtils {

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrId: Entity | IQAirEntity
			| IQAirEntityRelation<Entity, IQ> 
			| AirEntityId | string,
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation

}
