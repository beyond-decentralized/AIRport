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
	innerJoin(): IQ;

	// Left join on this Many-To-One or One-To-Many relation
	leftJoin(): IQ;

	/*
	update a
	set b = 1
	where a.cId =
	 */
}
/**
 * A concrete ORM relation on a AirEntity
 */
export interface IQAirEntityRelation<Entity, IQ extends IQEntity>
	extends IQRelation<IQ> {

	// equals(
	// 	entity: Entity | IQEntity | IQAirEntityRelation<Entity, IQ>
	// 		| AirEntityUuId | string
	// ): JSONLogicalOperation

	isNull(): JSONLogicalOperation

	isNotNull(): JSONLogicalOperation

}

export interface IQInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	dbRelation: DbRelation;
	parentQ: IQEntityInternal;

}
