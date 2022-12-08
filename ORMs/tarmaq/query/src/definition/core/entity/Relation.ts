import { DbRelation } from "@airport/ground-control";
import { JSONLogicalOperation } from "../operation/LogicalOperation";
import {
	IQEntity,
	IQEntityInternal
} from './Entity';

/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<IQ extends IQEntity> {
	// Inner join on this Many-To-One or One-To-Many relation
	INNER_JOIN(): IQ;

	// Left join on this Many-To-One or One-To-Many relation
	LEFT_JOIN(): IQ;

	IS_NULL(): JSONLogicalOperation

	IS_NOT_NULL(): JSONLogicalOperation

	/*
	UPDATE a
	SET b = 1
	WHERE a.cId =
	 */
}
/**
 * A concrete ORM relation on a AirEntity
 */
export interface IQAirEntityRelation<Entity, IQ extends IQEntity>
	extends IQRelation<IQ> {

	// equals(
	// 	entity: Entity | IQEntity | IQAirEntityRelation<Entity, IQ>
	// 		| AirEntityId | string
	// ): JSONLogicalOperation

}

export interface IQInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	dbRelation: DbRelation;
	parentQ: IQEntityInternal;

}
