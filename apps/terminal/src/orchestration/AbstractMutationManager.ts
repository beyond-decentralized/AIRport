import {
	AbstractQuery,
	DbColumn,
	InsertValues,
	IQEntity,
	IUtils,
	QEntity,
	RawInsertValues
}              from '@airport/air-control'
import {UTILS} from '@airport/air-control/lib/src'
import {DI}    from '@airport/di/lib/src'
import {
	IStoreDriver,
	JsonQuery,
	PortableQuery,
	QueryResultType
}              from '@airport/ground-control'

export class AbstractMutationManager {

	protected utils: IUtils
	protected dataStore: IStoreDriver

	constructor() {
		DI.set((utils, dataStore) => {

		}, UTILS, STORE_DRIVER)
	}

	protected getPortableQuery(
		schemaIndex: number,
		tableIndex: number,
		query: AbstractQuery,
		queryResultType: QueryResultType
	): PortableQuery {
		return {
			schemaIndex,
			tableIndex,
			jsonQuery: <JsonQuery>query.toJSON(),
			parameterMap: query.getParameters(),
			queryResultType,
			values: query.values
		}
	}

	protected async doInsertValues<IQE extends IQEntity>(
		q: QEntity,
		entities: any[]
	): Promise<number> {
		const dbEntity                  = q.__driver__.dbEntity
		const columnIndexes: number[]   = []
		const columnValueLookups: any[] = []
		for (const dbProperty of dbEntity.properties) {
			let columnValueLookup = {
				name: dbProperty.name,
				nested: null,
			}
			if (dbProperty.relation && dbProperty.relation.length) {
				const dbRelation = dbProperty.relation[0]
				this.utils.Schema.forEachColumnTypeOfRelation(dbRelation, (
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
		let insertValues: InsertValues<any, any>    = new InsertValues(rawInsertValues, columnIndexes)
		let portableQuery: PortableQuery            = this.getPortableQuery(dbEntity.schema.index, dbEntity.index, insertValues, null)

		return await this.dataStore.insertValues(portableQuery)
	}

}