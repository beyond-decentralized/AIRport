import { AirEntityId } from "@airport/aviation-communication";
import { IAirEntity, JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IQAirEntity, IQEntity } from "../core/entity/Entity";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";

export interface IQueryUtils {

	equals<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entityOrId: Entity | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ> 
			| AirEntityId | string,
		toObject: IQ // | IQRelation<IQ>
	): JSONLogicalOperation

	in<Entity extends IAirEntity, IQ extends IQAirEntity>(
		entitiesOrIds: (Entity
			// | IQAirEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string)[],
		toObject: IQ
		// | IQRelation<IQ>
	): JSONLogicalOperation

	equalsInternal<IQ extends IQEntity>(
		entityId: string | number,
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation

	inInternal<IQ extends IQEntity>(
		entityIds: (string | number)[],
		toObject: IQ // | IQRelation<IQ>
	): JSONBaseOperation

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation

}