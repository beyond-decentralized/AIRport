import {
	DbEntity,
	DbRelation,
	JoinType,
	JSONBaseOperation,
	JSONEntityRelation,
	JSONJoinRelation,
	JSONRelation,
	JSONRelationType,
	JSONViewJoinRelation
} from '@airport/ground-control'
import { IFieldColumnAliases } from '../../../lingo/core/entity/Aliases'
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFrom,
	IQEntity,
	IQEntityDriver,
	IQEntityInternal
} from '../../../lingo/core/entity/Entity'
import { IJoinFields } from '../../../lingo/core/entity/Joins'
import { OneToManyElements } from '../../../lingo/core/entity/metadata/ColumnDecorators'
import { IQInternalRelation } from '../../../lingo/core/entity/Relation'
import { IQOperableFieldInternal } from '../../../lingo/core/field/OperableField'
import { IEntityDatabaseFacade } from '../../../lingo/core/repository/EntityDatabaseFacade'
import { RawTreeQuery } from '../../../lingo/query/facade/TreeQuery'
import { IFieldUtils } from '../../../lingo/utils/FieldUtils'
import { IQueryUtils } from '../../../lingo/utils/QueryUtils'
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils'
import { TreeQuery } from '../../query/facade/TreeQuery'
import { extend } from '../../utils/qApplicationBuilderUtils'
import { JoinFields } from '../Joins'
import { FieldColumnAliases } from './Aliases'
import { IRelationManager } from './RelationManager'

/**
 * Created by Papa on 4/21/2016.
 */

export interface IQEntityInternalConstructor {

	entityConstructor: { new(...args: any[]): any };
	applicationHash: string;
	entityIndex: number;

	new <IQE extends IQEntityInternal>(...args: any[]): IQE;

}

export declare namespace QEntity {

	function db<IEntity>(
		databaseName?: string
	): IEntityDatabaseFacade<IEntity, IEntitySelectProperties,
		IEntityCreateProperties, IEntityUpdateProperties,
		IEntityUpdateColumns, IEntityIdProperties,
		IEntityCascadeGraph, IQEntity>;

}

export interface QEntityConstructor {

	new <IQE extends IQEntityInternal>(
		dbEntity: DbEntity,
		applicationUtils: IApplicationUtils,
		relationManager: IRelationManager,
		fromClausePosition?: number[],
		dbRelation?: DbRelation,
		joinType?: JoinType,
		QDriver?: { new(...args: any[]): IQEntityDriver },
	): IQE;

}


export function QEntity<IEntity>(
	dbEntity: DbEntity,
	applicationUtils: IApplicationUtils,
	relationManager: IRelationManager,
	fromClausePosition: number[] = [],
	dbRelation = null,
	joinType: JoinType = null,
	QDriver: { new(...args: any[]): IQEntityDriver } = QEntityDriver
) {
	this.__driver__ = new QDriver(dbEntity, fromClausePosition, dbRelation, joinType,
		this, applicationUtils, relationManager)
}

QEntity.prototype.fullJoin = function <IF extends IFrom>(right: IF): IJoinFields<IF> {
	return this.__driver__.join(right, JoinType.FULL_JOIN)
}

QEntity.prototype.innerJoin = function <IF extends IFrom>(right: IF): IJoinFields<IF> {
	return this.__driver__.join(right, JoinType.INNER_JOIN)
}

QEntity.prototype.leftJoin = function <IF extends IFrom>(right: IF): IJoinFields<IF> {
	return this.__driver__.join(right, JoinType.LEFT_JOIN)
}

QEntity.prototype.rightJoin = function <IF extends IFrom>(right: IF): IJoinFields<IF> {
	return this.__driver__.join(right, JoinType.RIGHT_JOIN)
}

export class QEntityDriver
	implements IQEntityDriver {

	entityFieldMap: { [propertyName: string]: IQOperableFieldInternal<any, JSONBaseOperation, any, any> } = {}
	entityRelations: IQInternalRelation<any>[] = []
	entityRelationMapByIndex: { [relationPropertyIndex: number]: IQInternalRelation<any> }
	idColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] = []
	allColumns: IQOperableFieldInternal<any, JSONBaseOperation, any, any>[] = []
	relations: IQInternalRelation<any>[] = []
	currentChildIndex = -1
	joinWhereClause: JSONBaseOperation
	parentJoinEntity: IQEntityInternal
	private entityRelationMap: { [propertyName: string]: IQInternalRelation<any> }
	private oneToManyConfigMap: { [name: string]: OneToManyElements }


	constructor(
		public dbEntity: DbEntity,
		private applicationUtils: IApplicationUtils,
		private relationManager: IRelationManager,
		public fromClausePosition: number[] = [],
		public dbRelation: DbRelation = null,
		public joinType: JoinType = null,
		private qEntity: IQEntityInternal
	) {
	}

	getInstance(): IQEntityInternal {
		const qEntityConstructor = this.applicationUtils
			.getQEntityConstructor(this.dbEntity)

		let instance = new qEntityConstructor(this.dbEntity, this.applicationUtils, this.relationManager, this.fromClausePosition, this.dbRelation, this.joinType)

		instance.__driver__.currentChildIndex = this.currentChildIndex
		instance.__driver__.joinWhereClause = this.joinWhereClause
		instance.__driver__.entityFieldMap = this.entityFieldMap
		instance.__driver__.entityRelations = this.entityRelations

		return instance
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

	getRelationJson(
		columnAliases: IFieldColumnAliases<any>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONRelation {
		// FIXME: this does not work for non-entity tree queries, as there is not dbEntity
		// see ApplicationDao.findMaxVersionedMapByApplicationAndDomainNames for an example
		let jsonRelation: JSONRelation = {
			currentChildIndex: this.currentChildIndex,
			ti: this.dbEntity.index,
			fromClausePosition: this.fromClausePosition,
			jt: this.joinType,
			rt: null,
			rep: columnAliases.entityAliases.getNextAlias(this.getRootJoinEntity()),
			si: this.dbEntity.applicationVersion.application.index
		}
		if (this.joinWhereClause) {
			this.getJoinRelationJson(<JSONJoinRelation>jsonRelation, columnAliases,
				queryUtils, fieldUtils, relationManager)
		} else if (this.dbRelation) {
			this.getEntityRelationJson(<JSONEntityRelation>jsonRelation)
		} else {
			this.getRootRelationJson(jsonRelation, columnAliases,
				queryUtils, fieldUtils, relationManager)
		}
		return jsonRelation
	}

	getJoinRelationJson(
		jsonRelation: JSONJoinRelation,
		columnAliases: IFieldColumnAliases<any>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONJoinRelation {
		jsonRelation.rt = JSONRelationType.ENTITY_JOIN_ON
		jsonRelation.joinWhereClause = queryUtils.whereClauseToJSON(
			this.joinWhereClause, columnAliases)

		return jsonRelation
	}

	getEntityRelationJson(
		jsonRelation: JSONEntityRelation,
		// columnAliases: FieldColumnAliases,
		// queryUtils: IQueryUtils,
		// fieldUtils: IFieldUtils
	): JSONEntityRelation {
		jsonRelation.rt = JSONRelationType.ENTITY_APPLICATION_RELATION
		jsonRelation.ri = this.dbRelation.index

		// if (!this.dbRelation.whereJoinTable) {
		return jsonRelation
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
		// 		throw new Error(`Unknown EntityRelationType: ${this.dbRelation.relationType}`);
		// }
		//
		// let joinWhereClause = this.dbRelation.whereJoinTable.addToJoinFunction(otmQEntity,
		// mtoQEntity, this.airportDb, this.airportDb.F); jsonRelation.joinWhereClause    =
		// this.utils.Query.whereClauseToJSON(joinWhereClause, columnAliases);
		// jsonRelation.joinWhereClauseOperator   = this.dbRelation.joinFunctionWithOperator;  return
		// jsonRelation;
	}

	getRootRelationJson(
		jsonRelation: JSONRelation,
		columnAliases: IFieldColumnAliases<any>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONJoinRelation {
		jsonRelation.rt = (this instanceof QTreeDriver) ? JSONRelationType.SUB_QUERY_ROOT : JSONRelationType.ENTITY_ROOT

		return jsonRelation
	}


	getQ(): IQEntityInternal {
		return this.qEntity
	}

	join<IF extends IFrom>(
		right: IF,
		joinType: JoinType,
	): IJoinFields<IF> {
		let joinChild: IQEntityInternal = (<IQEntityInternal><any>right)
			.__driver__.getInstance()
		joinChild.__driver__.currentChildIndex = 0
		let nextChildPosition = this.relationManager.getNextChildJoinPosition(this)
		joinChild.__driver__.fromClausePosition = nextChildPosition
		joinChild.__driver__.joinType = joinType
		joinChild.__driver__.parentJoinEntity = this.qEntity

		return new JoinFields<IF>(<any>joinChild)
	}

	isRootEntity(): boolean {
		return !this.parentJoinEntity
	}

	getRootJoinEntity(): IQEntityInternal {
		let rootEntity: IQEntityInternal = this.qEntity
		while (rootEntity.__driver__.parentJoinEntity) {
			rootEntity = rootEntity.__driver__.parentJoinEntity
		}
		return rootEntity
	}

	/*
	getEntityRelationMap(): { [propertyName: string]: IQInternalRelation<any> } {
		if (this.entityRelationMap) {
			return this.entityRelationMap;
		}
		this.entityRelationMap = {};

		for (const entityRelation of this.entityRelations) {
			const propertyName = ApplicationUtils.getIPropertyWithRelationIndex(
				entityRelation.parentApplicationIndex,
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

		const iEntity = ApplicationUtils.getIEntity(this.applicationIndex, this.tableIndex);
		this.oneToManyConfigMap = ApplicationUtils.getOneToManyConfigMap(iEntity);

		return this.oneToManyConfigMap;
	}
	*/

}

export function QTree(
	fromClausePosition: number[] = [],
	subQuery: RawTreeQuery<any>
) {
	(<any>QTree).base.constructor.call(this, null, fromClausePosition, null, null, QTreeDriver)
	this.__driver__.subQuery = subQuery
}

extend(QEntity, QTree, {})

export interface IQTreeDriver
	extends IQEntityDriver {

	subQuery: RawTreeQuery<any>;

}

export class QTreeDriver
	extends QEntityDriver
	implements IQTreeDriver {

	subQuery: RawTreeQuery<any>

	getInstance(): IQEntityInternal {
		let instance = super.getInstance();
		(<IQTreeDriver>instance.__driver__)
			.subQuery = this.subQuery

		return instance
	}

	// getRelationPropertyName(): string {
	// 	throw new Error(`not implemented`);
	// }

	getJoinRelationJson(
		jsonRelation: JSONViewJoinRelation,
		columnAliases: IFieldColumnAliases<any>,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONViewJoinRelation {
		jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
			jsonRelation, columnAliases,
			queryUtils, fieldUtils, relationManager)
		jsonRelation.rt = JSONRelationType.SUB_QUERY_JOIN_ON
		jsonRelation.subQuery = new TreeQuery(this.subQuery, columnAliases.entityAliases)
			.toJSON(queryUtils, fieldUtils, relationManager)

		return jsonRelation
	}

	getRootRelationJson(
		jsonRelation: JSONViewJoinRelation,
		columnAliases: FieldColumnAliases,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils,
		relationManager: IRelationManager
	): JSONViewJoinRelation {
		jsonRelation = <JSONViewJoinRelation>super.getJoinRelationJson(
			jsonRelation, columnAliases,
			queryUtils, fieldUtils, relationManager)
		jsonRelation.rt = JSONRelationType.SUB_QUERY_ROOT
		jsonRelation.subQuery = new TreeQuery(this.subQuery, columnAliases.entityAliases)
			.toJSON(queryUtils, fieldUtils, relationManager)

		return jsonRelation
	}

}
