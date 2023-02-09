import { AirEntityId } from "@airport/aviation-communication";
import { DbRelation, IApplicationUtils, QueryBaseOperation } from "@airport/ground-control";
import { IQueryUtils } from "../../utils/IQueryUtils";
import { QueryLogicalOperation } from "../operation/ILogicalOperation";
import {
	IQAirEntity,
	IQEntity
} from './IQEntity';
import { IQEntityInternal } from "./IQEntityDriver";
import { IQueryRelationManager } from "./IQueryRelationManager";

/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<IQ extends IQEntity> {
	// Inner join on this Many-To-One or One-To-Many relation
	INNER_JOIN(): IQ;

	// Left join on this Many-To-One or One-To-Many relation
	LEFT_JOIN(): IQ;

	IS_NULL(): QueryLogicalOperation

	IS_NOT_NULL(): QueryLogicalOperation

	/*
	UPDATE a
	SET b = 1
	WHERE a.cId =
	 */

}

/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelationInternal<IQ extends IQEntity>
	extends IQRelation<IQ> {

	dbRelation: DbRelation,
	parentQ: IQEntityInternal,
	applicationUtils: IApplicationUtils
	queryRelationManager: IQueryRelationManager
	queryUtils: IQueryUtils

}

/**
 * A Many-to-One ORM relation
 */
export interface IQManyToOneInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	equals(
		entity: string | number
	): QueryBaseOperation

	IN(
		entity: (string | number)[]
	): QueryBaseOperation

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
	): QueryLogicalOperation

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
	): QueryLogicalOperation

}

export interface IQInternalRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {

	dbRelation: DbRelation;
	parentQ: IQEntityInternal;

}
