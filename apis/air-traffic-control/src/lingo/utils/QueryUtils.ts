import { RepositoryEntityId } from "@airport/aviation-communication";
import { IRepositoryEntity, JSONBaseOperation } from "@airport/ground-control";
import { IFieldColumnAliases } from "../core/entity/Aliases";
import { IQEntity, IQEntityInternal, IQRepositoryEntity } from "../core/entity/Entity";
import { IQRepositoryEntityRelation } from "../core/entity/Relation";
import { JSONLogicalOperation } from "../core/operation/LogicalOperation";

export interface IQueryUtils {

	equals<Entity extends IRepositoryEntity, IQ extends IQEntityInternal>(
		entityOrIdOrUuId: Entity | IQRepositoryEntity
			| IQRepositoryEntityRelation<Entity, IQ> | RepositoryEntityId | string,
		toObject
	): JSONLogicalOperation

	whereClauseToJSON(
		whereClause: JSONBaseOperation,
		columnAliases: IFieldColumnAliases<any>
	): JSONBaseOperation

}
