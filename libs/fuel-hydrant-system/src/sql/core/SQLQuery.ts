import {
	IAirportDatabase,
	IQMetadataUtils,
	IUtils,
} from '@airport/air-traffic-control'
import {
	DbManyToOneElements,
	DbEntity,
	DbRelationColumn,
	EntityRelationType,
	InternalFragments,
	QueryEntityRelation,
	Query,
	QueryRelation,
	QueryResultType,
	AllModifiedColumnsMap,
	SqlOperator,
	IEntityStateManager,
	IApplicationUtils,
	Dictionary,
	DbColumn,
	Application_Index,
	DbEntity_TableIndex,
	DbColumn_Index
} from '@airport/ground-control'
import {
	IQEntityInternal,
	IQueryUtils,
	IQueryRelationManager,
	JoinTreeNode
} from '@airport/tarmaq-query'
import { IStoreDriver } from '@airport/terminal-map'
import { ISQLQueryAdaptor } from '../../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../../FuelHydrantContext'
import { IValidator } from '../../validation/Validator'
import { SQLWhereBase } from './SQLWhereBase'
import { ISubStatementSqlGenerator } from './SubStatementSqlGenerator'

/**
 * Created by Papa on 8/20/2016.
 */

export enum SQLDialect {
	MYSQL = 'MYSQL',
	POSTGRESQL = 'POSTGRESQL',
	SQLITE = 'SQLITE',
}

export class EntityDefaults {
	map: { [alias: string]: { [property: string]: any } } = {}

	getForAlias(alias: string) {
		let defaultsForAlias = this.map[alias]
		if (!defaultsForAlias) {
			defaultsForAlias = {}
			this.map[alias] = defaultsForAlias
		}
		return defaultsForAlias
	}
}

interface JoinOnColumns {
	leftColumn: string;
	rightColumn: string;
}

/**
 * String based SQL query.
 */
export abstract class SQLQuery<JQ extends Query>
	extends SQLWhereBase {

	protected entityDefaults: EntityDefaults = new EntityDefaults()
	protected allModifiedColumnsMap: AllModifiedColumnsMap = new AllModifiedColumnsMap()

	constructor(
		protected query: JQ,
		dbEntity: DbEntity,
		dialect: SQLDialect,
		protected queryResultType: QueryResultType,
		dictionary: Dictionary,
		airportDatabase: IAirportDatabase,
		applicationUtils: IApplicationUtils,
		queryUtils: IQueryUtils,
		entityStateManager: IEntityStateManager,
		qMetadataUtils: IQMetadataUtils,
		qValidator: IValidator,
		protected queryRelationManager: IQueryRelationManager,
		sqlQueryAdapter: ISQLQueryAdaptor,
		storeDriver: IStoreDriver,
		subStatementSqlGenerator: ISubStatementSqlGenerator,
		utils: IUtils,
		context: IFuelHydrantContext,
	) {
		super(dbEntity, dialect,
			dictionary,
			airportDatabase,
			applicationUtils,
			queryUtils,
			entityStateManager,
			qMetadataUtils,
			qValidator,
			sqlQueryAdapter,
			storeDriver,
			subStatementSqlGenerator,
			utils,
			context)
	}

	getAllModifiedColumnsMap(): AllModifiedColumnsMap {
		return this.allModifiedColumnsMap
	}

	abstract toSQL(
		internalFragments: InternalFragments,
		context: IFuelHydrantContext,
	): string;

	/**
	 * If bridging is not applied:
	 *
	 * Entities get merged if they are right next to each other in the result set.  If they
	 * are not, they are treated as separate entities - hence, your sort order matters.
	 *
	 * If bridging is applied - all entities get merged - your sort order does not matter.
	 * Might as well disallow sort order for bridged queries (or re-sort in memory)?
	 *
	 * @param results
	 * @returns {any[]}
	 */
	abstract parseQueryResults(
		results: any[],
		internalFragments: InternalFragments,
		queryResultType: QueryResultType,
		context: IFuelHydrantContext,
		bridgedQueryConfiguration?: any
	): Promise<any[]>;

	protected abstract buildFromJoinTree(
		joinRelations: (QueryEntityRelation | QueryRelation)[],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		context: IFuelHydrantContext,
		applicationIndex?: number,
		entityIndex?: number
	): JoinTreeNode | JoinTreeNode[];

	protected getEntityApplicationRelationFromJoin(
		leftQEntity: IQEntityInternal,
		rightQEntity: IQEntityInternal,
		entityRelation: QueryEntityRelation,
		parentRelation: QueryRelation,
		currentAlias: string,
		parentAlias: string,
		joinTypeString: string,
		errorPrefix: string,
		context: IFuelHydrantContext,
	): string {
		const allJoinOnColumns: JoinOnColumns[] = []

		const leftDbEntity = leftQEntity.__driver__.dbEntity
		const rightDbEntity = rightQEntity.__driver__.dbEntity
		const dbRelation = leftDbEntity.relations[entityRelation.relationIndex]

		let relationColumns: DbRelationColumn[]
		switch (dbRelation.relationType) {
			case EntityRelationType.MANY_TO_ONE:
				relationColumns = dbRelation.manyRelationColumns
				break
			case EntityRelationType.ONE_TO_MANY:
				if (dbRelation.oneRelationColumns && dbRelation.oneRelationColumns.length) {
					relationColumns = dbRelation.oneRelationColumns
				} else {
					const matchingRelations = dbRelation.relationEntity.relations.filter(manySideRelation =>
						manySideRelation.relationEntity._localId == leftDbEntity._localId
						&& manySideRelation.manyToOneElems
						&& manySideRelation.manyToOneElems as any !== true
						&& (manySideRelation.manyToOneElems as DbManyToOneElements).mappedBy === dbRelation.property.name
					)
					if (matchingRelations.length) {
						relationColumns = matchingRelations[0].manyRelationColumns
					}
				}
				break
			default:
				throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.applicationVersion.application.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`)
		}
		for (const relationColumn of relationColumns) {
			let ownColumnName: string
			let referencedColumnName: string
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					ownColumnName = relationColumn.manyColumn.name
					referencedColumnName = relationColumn.oneColumn.name
					break
				case EntityRelationType.ONE_TO_MANY:
					ownColumnName = relationColumn.oneColumn.name
					referencedColumnName = relationColumn.manyColumn.name
					break
				default:
					throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.applicationVersion.application.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`)
			}
			allJoinOnColumns.push({
				leftColumn: ownColumnName,
				rightColumn: referencedColumnName
			})
		}

		let onClause = allJoinOnColumns.map(
			joinOnColumn =>
				` ${parentAlias}.${joinOnColumn.leftColumn} = ${currentAlias}.${joinOnColumn.rightColumn}`
		)
			.join('\n\t\t\tAND')
		if (entityRelation.joinWhereClause) {
			const whereClause = this.getWHEREFragment(
				entityRelation.joinWhereClause, '\t\t',
				context)
			const joinWhereOperator = entityRelation.joinWhereClauseOperator === SqlOperator.AND ? 'AND' : 'OR'
			onClause = `${onClause}
			${joinWhereOperator} ${whereClause}`
		}
		const tableName = this.storeDriver.getEntityTableName(rightDbEntity, context)
		const fromFragment = `\n\t${joinTypeString} ${tableName} ${currentAlias}\n\t\tON ${onClause}`

		return fromFragment
	}

	protected addFieldFromColumn(
		dbColumn: DbColumn,
	): void {
		const dbEntity = dbColumn.propertyColumns[0].property.entity
		this.addField(dbEntity.applicationVersion.application.index,
			dbEntity.index, dbColumn.index)
	}

	protected addField(
		applicationIndex: Application_Index,
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index,
	): void {
		this.allModifiedColumnsMap.ensure(applicationIndex, entityIndex)
			.ensure(columnIndex)
	}

}
