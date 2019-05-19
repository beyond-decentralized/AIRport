import {
	DbEntity,
	DbRelation,
	JoinType,
	JSONBaseOperation,
	JSONRelation
}                                from "@airport/ground-control";
import {IAirportDatabase}        from "../../AirportDatabase";
import {IUtils}                  from "../../utils/Utils";
import {IQOperableFieldInternal} from "../field/OperableField";
import {IFieldColumnAliases}     from "./Aliases";
import {IJoinFields}             from './Joins';
import {IQInternalRelation}      from "./Relation";

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
	innerJoin<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

	/**
	 * GQE LEFT JOIN OTHER
	 */
	leftJoin<IF extends IFrom>(
		// Right entity of the join
		right: IF
	): IJoinFields<IF>;

	/**
	 * GQE RIGHT JOIN OTHER
	 */
	rightJoin<IF extends IFrom>(
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

	fullJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;

	innerJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;

	leftJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;

	rightJoin<IF extends IFrom>(right: IF): IJoinFields<IF>;

}

export interface IQTree extends IQEntity {

}

export interface IQEntityInternal
	extends IQEntity {

	__driver__: IQEntityDriver;

}

export interface IQEntityDriver {

	utils: IUtils;
	airportDb: IAirportDatabase;
	dbEntity: DbEntity;
	dbRelation: DbRelation;
	currentChildIndex: number;
	entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> };
	entityRelations: IQInternalRelation<any>[];
	fromClausePosition: number[];
	idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
	allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[];
	relations: IQInternalRelation<any>[];
	joinType: JoinType;
	joinWhereClause: JSONBaseOperation;
	parentJoinEntity: IQEntityInternal;

	/*
	addEntityField<IQF extends IQOperableFieldInternal<any, JSONBaseOperation, any, any>>(
		field: IQF
	): void;

	addEntityRelation<R extends IQEntityInternal>(
		relation: IQInternalRelation<R>
	): void;
	*/

	getInstance(): IQEntityInternal;

	getRelationJson(columnAliases: IFieldColumnAliases<any>): JSONRelation;

	// getRelationPropertyName(): string;

	getRootJoinEntity(): IQEntityInternal;

	isRootEntity(): boolean;

	join<IF extends IFrom>(
		right: IF,
		joinType: JoinType
	): IJoinFields<IF>;

	//getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> };

	//getOneToManyConfigMap<IQE extends IQEntityInternal>(): { [name: string]: OneToManyElements };
}
