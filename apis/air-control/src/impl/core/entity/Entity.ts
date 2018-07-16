import {
	DbEntity,
	DbRelation,
	EntityRelationType,
	JoinType,
	JSONBaseOperation,
	JSONEntityRelation,
	JSONJoinRelation,
	JSONRelation,
	JSONRelationType,
	JSONViewJoinRelation
} from "@airport/ground-control";
import {
	IEntityUpdateColumns,
	IQOperableFieldInternal,
	IUtils
}                              from "../../../";
import {IAirportDatabase}      from "../../../lingo/AirportDatabase";
import {
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateProperties,
	IFrom,
	IQEntity,
	IQEntityDriver,
	IQEntityInternal
}                              from "../../../lingo/core/entity/Entity";
import {IJoinFields}           from "../../../lingo/core/entity/Joins";
import {OneToManyElements}     from "../../../lingo/core/entity/metadata/ColumnDecorators";
import {IQInternalRelation}    from "../../../lingo/core/entity/Relation";
import {IEntityDatabaseFacade} from "../../../lingo/core/repository/EntityDatabaseFacade";
import {RawTreeQuery}          from "../../../lingo/query/facade/TreeQuery";
import {TreeQuery}             from "../../query/facade/TreeQuery";
import {JoinFields}            from "../Joins";
import {FieldColumnAliases}    from "./Aliases";
import {QRelation}             from "./Relation";

/**
 * Created by Papa on 4/21/2016.
 */

export interface IQEntityInternalConstructor {

	entityConstructor: { new(...args: any[]): any };
	schemaHash: string;
	entityIndex: number;

	new<IQE extends IQEntityInternal>(...args: any[]): IQE;

}

export declare namespace QEntity {

	function db<IEntity>(
		databaseName?: string
	): IEntityDatabaseFacade<IEntity, IEntitySelectProperties,
		IEntityCreateProperties, IEntityUpdateProperties, IEntityUpdateColumns, IEntityIdProperties, IQEntity>;

}

export interface QEntityConstructor {

	new<IQE extends IQEntityInternal>(
		dbEntity: DbEntity,
		fromClausePosition?: number[],
		dbRelation?: DbRelation,
		joinType?: JoinType,
		QDriver?: { new(...args: any[]): IQEntityDriver }
	): IQE;

}

export class QEntity
	implements IQEntityInternal {

	__driver__: IQEntityDriver;

	constructor(
		dbEntity: DbEntity,
		fromClausePosition: number[]                     = [],
		dbRelation                                       = null,
		joinType: JoinType                               = null,
		QDriver: { new(...args: any[]): IQEntityDriver } = QEntityDriver
	) {
		this.__driver__ = new QDriver(dbEntity, fromClausePosition, dbRelation, joinType, this);
	}

	fullJoin<IF extends IFrom>(right: IF): IJoinFields<IF> {
		return this.__driver__.join<IF>(right, JoinType.FULL_JOIN);
	}

	innerJoin<IF extends IFrom>(right: IF): IJoinFields<IF> {
		return this.__driver__.join<IF>(right, JoinType.INNER_JOIN);
	}

	leftJoin<IF extends IFrom>(right: IF): IJoinFields<IF> {
		return this.__driver__.join<IF>(right, JoinType.LEFT_JOIN);
	}

	rightJoin<IF extends IFrom>(right: IF): IJoinFields<IF> {
		return this.__driver__.join<IF>(right, JoinType.RIGHT_JOIN);
	}
}

export class QEntityDriver
	implements IQEntityDriver {

	utils: IUtils;
	airportDb: IAirportDatabase;
	entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> } = {};
	entityRelations: IQInternalRelation<any>[]                                                            = [];
	entityRelationMapByIndex: { [relationPropertyIndex: number]: IQInternalRelation<any> };
	idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[]                                = [];
	allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[]                               = [];
	relations: IQInternalRelation<any>[]                                                                  = [];
	currentChildIndex                                                                                     = -1;
	joinWhereClause: JSONBaseOperation;
	parentJoinEntity: IQEntityInternal;
	private entityRelationMap: { [propertyName: string]: IQInternalRelation<any> };
	private oneToManyConfigMap: { [name: string]: OneToManyElements };


	constructor(
		public dbEntity: DbEntity,
		public fromClausePosition: number[] = [],
		public dbRelation: DbRelation       = null,
		public joinType: JoinType           = null,
		private qEntity: IQEntityInternal
	) {
	}

	getInstance(): IQEntityInternal {
		const qEntityConstructor = this.qEntity.__driver__.utils.Schema
			.getQEntityConstructor(this.dbEntity);

		let instance = new qEntityConstructor(this.dbEntity, this.fromClausePosition, this.dbRelation, this.joinType);

		instance.__driver__.currentChildIndex = this.currentChildIndex;
		instance.__driver__.joinWhereClause   = this.joinWhereClause;
		instance.__driver__.entityFieldMap    = this.entityFieldMap;
		instance.__driver__.entityRelations   = this.entityRelations;

		return instance;
	}

	/*
	addEntityRelation<R extends IQEntityInternal>(
		relation: IQInternalRelation<R>
	): void {
		this.entityRelations[relation.parentRelationIndex] = relation;
	}

	addEntityField<T, IQF extends IQOperableFieldInternal<T, JSONBaseOperation, any, any>>(
		field: IQF
	): void {
		this.entityFieldMap[field.fieldName] = field;
	}
	*/

	/*
	getRelationPropertyName(): string {
		return QMetadataUtils.getRelationPropertyName(QMetadataUtils.getRelationByIndex(this.qEntity, this.relationIndex));
	}
*/

	getRelationJson(columnAliases: FieldColumnAliases): JSONRelation {
		let jsonRelation: JSONRelation = {
			cci: this.currentChildIndex,
			ti: this.dbEntity.index,
			fcp: this.fromClausePosition,
			jt: this.joinType,
			rt: null,
			rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
			si: this.dbEntity.schemaVersion.id
		};
		if (this.joinWhereClause) {
			this.getJoinRelationJson(<JSONJoinRelation>jsonRelation, columnAliases);
		} else if (this.dbRelation) {
			this.getEntityRelationJson(<JSONEntityRelation>jsonRelation, columnAliases);
		} else {
			this.getRootRelationJson(jsonRelation, columnAliases);
		}
		return jsonRelation;
	}

	getJoinRelationJson(
		jsonRelation: JSONJoinRelation,
		columnAliases: FieldColumnAliases
	): JSONJoinRelation {
		jsonRelation.rt  = JSONRelationType.ENTITY_JOIN_ON;
		jsonRelation.jwc = this.utils.Query.whereClauseToJSON(this.joinWhereClause, columnAliases);

		return jsonRelation;
	}

	getEntityRelationJson(
		jsonRelation: JSONEntityRelation,
		columnAliases: FieldColumnAliases
	): JSONEntityRelation {
		jsonRelation.rt = JSONRelationType.ENTITY_SCHEMA_RELATION;
		jsonRelation.ri = this.dbRelation.index;

		// if (!this.dbRelation.whereJoinTable) {
			return jsonRelation;
		// }
		// let otmQEntity;
		// let mtoQEntity;
		// switch (this.dbRelation.relationType) {
		// 	case EntityRelationType.ONE_TO_MANY:
		// 		mtoQEntity = this.qEntity;
		// 		otmQEntity = this.parentJoinEntity;
		// 		break;
		// 	case EntityRelationType.MANY_TO_ONE:
		// 		otmQEntity = this.qEntity;
		// 		mtoQEntity = this.parentJoinEntity;
		// 		break;
		// 	default:
		// 		throw `Unknown EntityRelationType: ${this.dbRelation.relationType}`;
		// }
		//
		// let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity, mtoQEntity, this.airportDb, this.airportDb.F);
		// jsonRelation.jwc    = this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
		// jsonRelation.wjto   = this.dbRelation.joinFunctionWithOperator;
		//
		// return jsonRelation;
	}

	getRootRelationJson(
		jsonRelation: JSONRelation,
		columnAliases: FieldColumnAliases
	): JSONJoinRelation {
		jsonRelation.rt = (this instanceof QTreeDriver) ? JSONRelationType.SUB_QUERY_ROOT : JSONRelationType.ENTITY_ROOT;

		return jsonRelation;
	}


	getQ(): IQEntityInternal {
		return this.qEntity;
	}

	join<IF extends IFrom>(
		right: IF,
		joinType: JoinType
	): IJoinFields<IF> {
		let joinChild: IQEntityInternal         = (<IQEntityInternal><any>right).__driver__.getInstance();
		joinChild.__driver__.currentChildIndex  = 0;
		let nextChildPosition                   = QRelation.getNextChildJoinPosition(this);
		joinChild.__driver__.fromClausePosition = nextChildPosition;
		joinChild.__driver__.joinType           = joinType;
		joinChild.__driver__.parentJoinEntity   = this.qEntity;

		return new JoinFields<IF>(<any>joinChild);
	}

	isRootEntity(): boolean {
		return !this.parentJoinEntity;
	}

	getRootJoinEntity(): IQEntityInternal {
		let rootEntity: IQEntityInternal = this.qEntity;
		while (rootEntity.__driver__.parentJoinEntity) {
			rootEntity = rootEntity.__driver__.parentJoinEntity;
		}
		return rootEntity;
	}

	/*
	getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> } {
		if (this.entityRelationMap) {
			return this.entityRelationMap;
		}
		this.entityRelationMap = {};

		for (const entityRelation of this.entityRelations) {
			const propertyName = SchemaUtils.getIPropertyWithRelationIndex(
				entityRelation.parentSchemaIndex,
				entityRelation.parentTableIndex,
				entityRelation.parentRelationIndex,
			).name;
			this.entityRelationMap[propertyName] = entityRelation;
		}

		return this.entityRelationMap;
	}

	getOneToManyConfigMap<IQE extends IQEntityInternal>(): { [name: string]: OneToManyElements } {
		if (this.oneToManyConfigMap) {
			return this.oneToManyConfigMap;
		}

		const iEntity = SchemaUtils.getIEntity(this.schemaIndex, this.tableIndex);
		this.oneToManyConfigMap = SchemaUtils.getOneToManyConfigMap(iEntity);

		return this.oneToManyConfigMap;
	}
	*/

}

export class QTree
	extends QEntity {

	__driver__: IQTreeDriver;

	constructor(
		fromClausePosition: number[] = [],
		subQuery: RawTreeQuery<any>
	) {
		super(null, fromClausePosition, null, null, QTreeDriver);
		this.__driver__.subQuery = subQuery;
	}
}

export interface IQTreeDriver
	extends IQEntityDriver {

	subQuery: RawTreeQuery<any>;

}

export class QTreeDriver
	extends QEntityDriver
	implements IQTreeDriver {
	subQuery: RawTreeQuery<any>;

	getInstance(): QTree {
		let instance                 = <QTree>super.getInstance();
		instance.__driver__.subQuery = this.subQuery;

		return instance;
	}

	// getRelationPropertyName(): string {
	// 	throw `not imlemented`;
	// }

	getJoinRelationJson(
		jsonRelation: JSONViewJoinRelation,
		columnAliases: FieldColumnAliases
	): JSONViewJoinRelation {
		jsonRelation    = <JSONViewJoinRelation>super.getJoinRelationJson(jsonRelation, columnAliases);
		jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON;
		jsonRelation.sq = new TreeQuery(this.subQuery, this.utils, columnAliases.entityAliases).toJSON();

		return jsonRelation;
	}

	getRootRelationJson(
		jsonRelation: JSONViewJoinRelation,
		columnAliases: FieldColumnAliases
	): JSONViewJoinRelation {
		jsonRelation    = <JSONViewJoinRelation>super.getJoinRelationJson(jsonRelation, columnAliases);
		jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT;
		jsonRelation.sq = new TreeQuery(this.subQuery, this.utils, columnAliases.entityAliases).toJSON();

		return jsonRelation;
	}

}
