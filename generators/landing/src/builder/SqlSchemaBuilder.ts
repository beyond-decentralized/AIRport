import {
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	PropertyReference
}                           from '@airport/ground-control'
import {Service}            from 'typedi'
import {SchemaBuilderToken} from '../InjectionTokens'
import {ISchemaBuilder}     from './ISchemaBuilder'

@Service(SchemaBuilderToken)
export abstract class SqlSchemaBuilder
	implements ISchemaBuilder {

	constructor() {
	}

	async build(
		jsonSchema: JsonSchema
	): Promise<void> {

	}

	async buildTable(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void> {
		const columnsDdl: string[] = jsonEntity.columns.map((
			jsonColumn: JsonSchemaColumn
		) => {
			let columnDdl = `${jsonColumn.name} ${this.getColumnType(jsonSchema, jsonEntity, jsonColumn)}`

			return columnDdl
		})

		const createDdl = `CREATE TABLE ${jsonEntity.name} (
		${columnsDdl.join(',\n')}
		) WITHOUT ROWID`
	}

	getProperties(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string[] {
		const properties = []
		if (jsonColumn.isGenerated) {
			properties.push('ai')
		}

		for (const index of jsonEntity.tableConfig.indexes) {
			for (const column of index.columnList) {
				if (column === jsonColumn.name) {

				}
			}
		}
		for (const propertyRef of jsonColumn.propertyRefs) {

		}
	}

	abstract getColumnType(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		column: JsonSchemaColumn
	): string


	protected getPrimaryKeySuffix(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string {
		const isId = jsonColumn.propertyRefs.some((
			propertyRef: PropertyReference
		) => {
			const jsonProperty = jsonEntity.properties[propertyRef.index]

			if (jsonProperty.isId) {
				return true
			}

		})

		if (isId) {
			return this.getPrimaryKeyColumnSyntax()
		}

		return ''
	}

	protected isForeignKey(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): boolean

	protected abstract getPrimaryKeyColumnSyntax(): string

}