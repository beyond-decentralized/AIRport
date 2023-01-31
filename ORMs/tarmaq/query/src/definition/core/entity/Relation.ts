import { AirEntityId } from "@airport/aviation-communication";
import { DbRelation, JSONBaseOperation } from "@airport/ground-control";
import { JSONLogicalOperation } from "../operation/LogicalOperation";
import {
	IQAirEntity,
	IQEntity
} from './Entity';
import { IQEntityInternal } from "./IQEntityDriver";

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
 * A Many-to-One ORM relation
 */
export interface IQManyToOneInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	equals(
		entity: string | number
	): JSONBaseOperation

	IN(
		entity: (string | number)[]
	): JSONBaseOperation

}

/**
 * A ORM relation on a AirEntity
 */
export interface IQAirEntityRelation<Entity, IQ extends IQEntity>
	extends IQRelation<IQ> {

}

/**
 * A Many-to-One ORM relation on a AirEntity
 */
export interface IQManyToOneAirEntityRelation<Entity, IQ extends IQEntity>
	extends IQAirEntityRelation<Entity, IQ> {

	equals
	// <
	// Entity extends IAirEntity
	// , IQ extends IQEntityInternal
	// >
	(
		entity: Entity | IQAirEntity |
			// IQAirEntityRelation<Entity, IQ> |
			AirEntityId | string
	): JSONLogicalOperation

	IN
	// <
	// Entity extends IAirEntity
	// , IQ extends IQEntityInternal
	// >
	(
		entitiesOrIds: (Entity |
			// IQAirEntity |
			// IQAirEntityRelation<Entity, IQ> |
			AirEntityId | string)[]
	): JSONLogicalOperation

}

export interface IQInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	dbRelation: DbRelation;
	parentQ: IQEntityInternal;

}
