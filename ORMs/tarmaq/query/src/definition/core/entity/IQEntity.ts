import { AirEntityId } from '@airport/aviation-communication'
import { IJoinFields } from './IJoins'
import { IQManyToOneAirEntityRelation } from './IQRelation'
import { QueryLogicalOperation } from '../operation/ILogicalOperation'
import { IQNumberEntityField } from '../../../implementation/core/field/NumberField'
import { IQEntityInternal } from './IQEntityDriver'

/**
 * Marker interface for a collection of only Entity @Id Properties.
 * Used for DELETE statements.  Must list all @Id properties.
 */
export interface IEntityIdProperties {

}

/**
 * Marker interface for all Entity Query SELECT Statement definitions.
 * Every child entity must provide an extension of this interface.  The
 * extension must list all of the properties of the entity as optional.
 */
export interface IEntitySelectProperties {
	'*'?: boolean | any
}

/**
 * Marker interface with all @Id columns as required and all other columns
 * as optional.  Every child entity must provide an extension of this interface.
 * Used for INSERT statements. (by columns)
 */
export interface IEntityCreateColumns {

}

/**
 * Marker interface with all @Id fields as required and all other fields
 * as optional.  Every child entity must provide an extension of this interface.
 * Used for INSERT statements. (by properties)
 */
export interface IEntityCreateProperties {

}

/**
 * Marker interface for UPDATE Statement definitions (by columns).
 * Every child entity must provide an extension of this interface.
 * The extension must list all non-@Id columns and NOT list
 * @Id columns.
 */
export interface IEntityUpdateColumns {

}

/**
 * Marker interface for UPDATE Statement definitions (by properties).
 * Every child entity must provide an extension of this interface.
 * The extension must list all non-@Id properties and NOT list
 * @Id properties.
 */
export interface IEntityUpdateProperties {
}
/**
 * Marker interface for CASCADE GRAPH Statement definitions (by properties).
 * Every child entity must provide an extension of this interface.
 * The extension must list all relations for entity (excluding @Id relations
 * of Repository Entities).
 */
export interface IEntityCascadeGraph {
	'*'?: boolean | any
}

export interface EntityConstructor {

	new(...args: any[]): any;

}

export interface EntityWithLifecycle {

	afterTransfer?(): void;

}

/**
 * An concrete Generated Query Entity used in the FROM clause (can be
 * joined to).
 */
export interface IFrom<IQE extends IQEntity = any> {

	/**
	 * GQE FULL OUTER JOIN OTHER
	 */
	FULL_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF, IQE>;

	/**
	 * GQE INNER JOIN OTHER
	 */
	INNER_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF, IQE>;

	/**
	 * GQE LEFT JOIN OTHER
	 */
	LEFT_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF, IQE>;

	/**
	 * GQE RIGHT JOIN OTHER
	 */
	RIGHT_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF, IQE>;

}

/**
 * Concrete Entity joined via Many-To-One or One-To-Many relation used in the FROM clause.
 */
export interface IEntityRelationFrom {

}

/**
 * A concrete Generated Query Entity.
 */
export interface IQEntity<IQE extends IQEntity<any> = any> {

	equals<Entity, IQ extends IQEntityInternal>(
		entity: Entity | IQEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string
	): QueryLogicalOperation;

	IN<Entity, IQ extends IQEntityInternal>(
		entity: Entity | AirEntityId | string
	): QueryLogicalOperation;

	FULL_JOIN<IF extends IFrom<any>>(right: IF): IJoinFields<IF, IQE>;

	INNER_JOIN<IF extends IFrom<any>>(right: IF): IJoinFields<IF, IQE>;

	LEFT_JOIN<IF extends IFrom<any>>(right: IF): IJoinFields<IF, IQE>;

	RIGHT_JOIN<IF extends IFrom<any>>(right: IF): IJoinFields<IF, IQE>;

}

export interface IQAirEntity<IQE extends IQEntity<any> = any>
	extends IQEntity<IQE> {

	_actorRecordId: IQNumberEntityField
	actor: IQManyToOneAirEntityRelation<any, any>
	repository: IQManyToOneAirEntityRelation<any, any>

}

export interface IQTree
	extends IQEntity<any> {

}

