import {
	AbstractQuery,
	FIELD_UTILS,
	IFieldUtils,
	InsertValues,
	IQEntity,
	IQEntityInternal,
	IQueryUtils,
	QUERY_UTILS,
	RawInsertValues,
	SCHEMA_UTILS
}           from '@airport/air-control'
import {container, DI} from '@airport/di'
import {
	DbColumn,
	JsonQuery,
	PortableQuery,
	QueryResultType,
	STORE_DRIVER
}           from '@airport/ground-control'

export class AbstractMutationManager {

	protected getPortableQuery(
		schemaIndex: number,
		tableIndex: number,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): PortableQuery {
		return {
			schemaIndex,
			tableIndex,
			jsonQuery: <JsonQuery>query.toJSON(queryUtils, fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType
		}
	}

	protected async doInsertValues<IQE extends IQEntity>(
		q: IQEntity,
		entities: any[]
	): Promise<number> {
		const [fieldUtils, queryUtils, schemaUtils, storeDriver
		      ] = await container(this).get(
			FIELD_UTILS, QUERY_UTILS, SCHEMA_UTILS, STORE_DRIVER)

		const dbEntity                  = (q as IQEntityInternal).__driver__.dbEntity
		const columnIndexes: number[]   = []
		const columnValueLookups: any[] = []
		for (const dbProperty of dbEntity.properties) {
			let columnValueLookup = {
				name: dbProperty.name,
				nested: null,
			}
			if (dbProperty.relation && dbProperty.relation.length) {
				const dbRelation = dbProperty.relation[0]
				schemaUtils.forEachColumnTypeOfRelation(dbRelation, (
					dbColumn: DbColumn,
					propertyNameChains: string[][]
				) => {
					if (columnIndexes[dbColumn.index]) {
						return
					}
					columnIndexes[dbColumn.index] = dbColumn.index
					columnValueLookups[dbColumn.index](columnValueLookup)
					const firstPropertyNameChain = propertyNameChains[0]
					for (let i = 1; i < firstPropertyNameChain.length; i++) {
						const propertyName          = firstPropertyNameChain[i]
						const nextColumnValueLookup = {
							name: propertyName,
							nested: null
						}
						columnValueLookup.nested    = nextColumnValueLookup
						columnValueLookup           = nextColumnValueLookup
					}
				})
			} else {
				const dbColumn = dbProperty.propertyColumns[0].column
				if (columnIndexes[dbColumn.index]) {
					continue
				}
				columnIndexes[dbColumn.index] = dbColumn.index
				columnValueLookups[dbColumn.index](columnValueLookup)
			}
		}
		const values                                = entities.map(
			entity => {
				return columnValueLookups.map(
					lookup => {
						let value = entity[lookup.name]
						while (lookup.nested) {
							if (!(value instanceof Object)) {
								break
							}
							lookup = lookup.nested
							value  = value[lookup.name]
						}
						return value
					})
			})
		const rawInsertValues: RawInsertValues<any> = {
			insertInto: q,
			columns: null,
			values,
		}
		let insertValues: InsertValues<any>         = new InsertValues(rawInsertValues, columnIndexes)
		let portableQuery: PortableQuery            = this.getPortableQuery(
			dbEntity.schemaVersion.schema.index, dbEntity.index,
			insertValues, null, queryUtils, fieldUtils)

		return await storeDriver.insertValues(portableQuery)
	}

}
