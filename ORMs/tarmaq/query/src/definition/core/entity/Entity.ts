import { AirEntityId } from '@airport/aviation-communication'
import {
	DbEntity,
	DbRelation,
	JoinType,
	JSONBaseOperation,
	JSONRelation
} from '@airport/ground-control'
import { IQOperableFieldInternal } from '../field/OperableField'
import { IFieldColumnAliases } from './Aliases'
import { IJoinFields } from './Joins'
import { IQInternalRelation, IQAirEntityRelation } from './Relation'
import { JSONLogicalOperation } from '../operation/LogicalOperation'
import { IRelationManager } from './IRelationManager'
import { IQueryUtils } from '../../utils/IQueryUtils'
import { IFieldUtils } from '../../utils/IFieldUtils'
import { IQNumberEntityField } from '../../../implementation/core/field/NumberField'

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
export interface IFrom {

	/**
	 * GQE FULL OUTER JOIN OTHER
	 */
	fullJoin<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

	/**
	 * GQE INNER JOIN OTHER
	 */
	INNER_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

	/**
	 * GQE LEFT JOIN OTHER
	 */
	LEFT_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

	/**
	 * GQE RIGHT JOIN OTHER
	 */
	RIGHT_JOIN<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

}

/**
 * Concrete Entity joined via Many-To-One or One-To-Many relation used in the FROM clause.
 */
export interface IEntityRelationFrom {

}

/**
 * A concrete Generated Query Entity.
 */
export interface IQEntity {

	equals<Entity, IQ extends IQEntityInternal>(
		entity: Entity | IQEntity
			// | IQAirEntityRelation<Entity, IQ>
			| AirEntityId | string
	): JSONLogicalOperation;

	in<Entity, IQ extends IQEntityInternal>(
		entity: Entity | AirEntityId | string
	): JSONLogicalOperation;

	fullJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;

	INNER_JOIN<IF extends IFrom>(right: IF): IJoinFields<IF>;

	LEFT_JOIN<IF extends IFrom>(right: IF): IJoinFields<IF>;

	RIGHT_JOIN<IF extends IFrom>(right: IF): IJoinFields<IF>;

}

export interface IQAirEntity
	extends IQEntity {

	_actorRecordId: IQNumberEntityField
	actor: IQAirEntityRelation<any, any>
	repository: IQAirEntityRelation<any, any>

}

export interface IQTree
	extends IQEntity {

}

export interface IQEntityInternal
	extends IQEntity {

	__driver__: IQEntityDriver;

}

export interface IQEntityDriver {

	allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
	childQEntities: IQEntityInternal[]
	currentChildIndex: number;
	dbEntity: DbEntity;
	dbRelation: DbRelation;
	entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> };
	entityRelations: IQInternalRelation<any>[];
	fromClausePosition: number[];
	idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
	joinType: JoinType;
	joinWhereClause: JSONBaseOperation;
	parentJoinEntity: IQEntityInternal;
	relations: IQInternalRelation<any>[];

	/*
	addEntityField<IQF extends IQOperableFieldInternal<any, JSONBaseOperation, any, any>>(
		field: IQF
	): void;

	addEntityRelation<R extends IQEntityInternal>(
		relation: IQInternalRelation<R>
	): void;
	*/

	getInstance(): IQEntityInternal;

	getRelationJson(
		columnAliases: IFieldColumnAliases<any>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONRelation;

	// getRelationPropertyName(): string;

	getRootJoinEntity(): IQEntityInternal;

	isRootEntity(): boolean;

	join<IF extends IFrom>(
		right: IF,
		joinType: JoinType,
	): IJoinFields<IF>;

	//getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> };

	//getOneToManyConfigMap<IQE extends IQEntityInternal>(): { [name: string]:
	// OneToManyElements };
}
