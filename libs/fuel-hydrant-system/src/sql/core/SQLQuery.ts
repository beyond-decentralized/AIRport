import {
	IAirportDatabase,
	IQEntityInternal,
	IQMetadataUtils,
	ISchemaUtils,
	JoinTreeNode
}                     from '@airport/air-control'
import {
	DbEntity,
	DbRelationColumn,
	EntityRelationType,
	InternalFragments,
	IStoreDriver,
	JSONEntityRelation,
	JsonQuery,
	JSONRelation,
	QueryResultType,
	SchemaMap,
	SqlOperator
}                     from '@airport/ground-control'
import {SQLWhereBase} from './SQLWhereBase'

/**
 * Created by Papa on 8/20/2016.
 */

export enum SQLDialect {
	MYSQL,
	SQLITE_SQLJS,
	SQLITE_WEBSQL,
	ORACLE
}

export class EntityDefaults {
	map: { [alias: string]: { [property: string]: any } } = {}

	getForAlias(alias: string) {
		let defaultsForAlias = this.map[alias]
		if (!defaultsForAlias) {
			defaultsForAlias = {}
			this.map[alias]  = defaultsForAlias
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
export abstract class SQLQuery<JQ extends JsonQuery>
	extends SQLWhereBase {

	protected entityDefaults: EntityDefaults = new EntityDefaults()

	constructor(
		protected jsonQuery: JQ,
		dbEntity: DbEntity,
		dialect: SQLDialect,
		protected queryResultType: QueryResultType,
		storeDriver: IStoreDriver
	) {
		super(dbEntity, dialect, storeDriver)
	}

	getFieldMap(): SchemaMap {
		return this.fieldMap
	}

	abstract toSQL(
		internalFragments: InternalFragments,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
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
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		results: any[],
		internalFragments: InternalFragments,
		queryResultType: QueryResultType,
		bridgedQueryConfiguration?: any
	): any[];

	protected abstract buildFromJoinTree(
		joinRelations: (JSONEntityRelation | JSONRelation) [],
		joinNodeMap: { [alias: string]: JoinTreeNode },
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		schemaIndex?: number,
		tableIndex?: number
	): JoinTreeNode | JoinTreeNode[];

	protected getEntitySchemaRelationFromJoin(
		leftQEntity: IQEntityInternal,
		rightQEntity: IQEntityInternal,
		entityRelation: JSONEntityRelation,
		parentRelation: JSONRelation,
		currentAlias: string,
		parentAlias: string,
		joinTypeString: string,
		errorPrefix: string,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		const allJoinOnColumns: JoinOnColumns[] = []

		const leftDbEntity  = leftQEntity.__driver__.dbEntity
		const rightDbEntity = rightQEntity.__driver__.dbEntity
		const dbRelation    = leftDbEntity.relations[entityRelation.ri]

		let relationColumns: DbRelationColumn[]
		switch (dbRelation.relationType) {
			case EntityRelationType.MANY_TO_ONE:
				relationColumns = dbRelation.manyRelationColumns
				break
			case EntityRelationType.ONE_TO_MANY:
				relationColumns = dbRelation.oneRelationColumns
				break
			default:
				throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`)
		}
		for (const relationColumn of relationColumns) {
			let ownColumnName: string
			let referencedColumnName: string
			switch (dbRelation.relationType) {
				case EntityRelationType.MANY_TO_ONE:
					ownColumnName        = relationColumn.manyColumn.name
					referencedColumnName = relationColumn.oneColumn.name
					break
				case EntityRelationType.ONE_TO_MANY:
					ownColumnName        = relationColumn.oneColumn.name
					referencedColumnName = relationColumn.manyColumn.name
					break
				default:
					throw new Error(`Unknown relation type ${dbRelation.relationType} 
on '${leftDbEntity.schemaVersion.schema.name}.${leftDbEntity.name}.${dbRelation.property.name}'.`)
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
		if (entityRelation.jwc) {
			const whereClause       = this.getWHEREFragment(
				entityRelation.jwc, '\t\t',
				airDb, schemaUtils, metadataUtils)
			const joinWhereOperator = entityRelation.wjto === SqlOperator.AND ? 'AND' : 'OR'
			onClause                = `${onClause}
			${joinWhereOperator} ${whereClause}`
		}
		const tableName    = this.storeDriver.getEntityTableName(rightDbEntity)
		const fromFragment = `\n\t${joinTypeString} ${tableName} ${currentAlias}\n\t\tON ${onClause}`

		return fromFragment
	}

}
