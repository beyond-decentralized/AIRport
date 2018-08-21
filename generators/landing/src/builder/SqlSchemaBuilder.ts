import {
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	PropertyReference,
	QueryType,
}                       from '@airport/ground-control'
import {ISchemaBuilder} from './ISchemaBuilder'

export abstract class SqlSchemaBuilder
	implements ISchemaBuilder {

	constructor(
		protected storeDriver: IStoreDriver
	) {
	}

	async build(
		jsonSchema: JsonSchema
	): Promise<void> {
		await this.createSchema(jsonSchema)

		for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
			await this.buildTable(jsonSchema, jsonEntity)
		}
	}

	abstract createSchema(
		jsonSchema: JsonSchema
	): Promise<void>;

	getSchemaName(
		jsonSchema: JsonSchema
	): string {
		const domainPrefix = jsonSchema.domain.replace(/\./g, '_')

		const schemaPrefix = jsonSchema.name
			.replace(/@/g, '_')
			.replace(/\//g, '_')

		return `${domainPrefix}__${schemaPrefix}`
	}

	async buildTable(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): Promise<void> {
		const primaryKeyColumnNames: string[] = []
		const tableColumnsDdl: string[]       = jsonEntity.columns.map((
			jsonColumn: JsonSchemaColumn
		) => {
			let columnDdl = `${jsonColumn.name} ${this.getColumnSuffix(jsonSchema, jsonEntity, jsonColumn)}`

			if (this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
				primaryKeyColumnNames.push(jsonColumn.name)
			}

			return columnDdl
		})

		const createTableSuffix = this.getCreateTableSuffix(jsonSchema, jsonEntity)

		const tableName = this.getTableName(jsonSchema, jsonEntity)

		let primaryKeySubStatement = ``
		if (primaryKeyColumnNames.length) {
			primaryKeySubStatement = this.getPrimaryKeyStatement(primaryKeyColumnNames)
		}

		const createTableDdl = `CREATE TABLE ${tableName} (
		${tableColumnsDdl.join(',\n')}${primaryKeySubStatement}
		)${createTableSuffix}`

		await this.storeDriver.query(QueryType.DDL, createTableDdl, [], false)

		for (const indexConfig of jsonEntity.tableConfig.indexes) {
			let uniquePrefix = ''
			if (indexConfig.unique) {
				uniquePrefix = ' UNIQUE'
			}

			const createIndexDdl = `CREATE${uniquePrefix} INDEX ${indexConfig.name}
			ON ${tableName} (
			${indexConfig.columnList.join(', ')}
			)`

			await this.storeDriver.query(QueryType.DDL, createIndexDdl, [], false)
		}
		//
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

	abstract getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		column: JsonSchemaColumn
	): string

	abstract getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string


	protected isPrimaryKeyColumn(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): boolean {
		return jsonColumn.propertyRefs.some((
			propertyRef: PropertyReference
		) => {
			const jsonProperty = jsonEntity.properties[propertyRef.index]

			if (jsonProperty.isId) {
				return true
			}

		})

	}

	abstract getTableName(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string;

	/*
	protected abstract isForeignKey(
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): boolean
	*/

	protected getPrimaryKeyStatement(
		columnNames: string[]
	): string {
		return `,
			PRIMARY KEY (
			${columnNames.join(',\n')}
			)`
	}

}
