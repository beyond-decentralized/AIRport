import { ISequence } from '@airport/airport-code'
import { container, DI } from '@airport/di'
import {
	getSchemaName,
	getSequenceName,
	IStoreDriver,
	JsonSchema,
	JsonSchemaColumn,
	JsonSchemaEntity,
	QueryType,
	SQLDataType,
	STORE_DRIVER
} from '@airport/ground-control'
import { SCHEMA_BUILDER, SqlSchemaBuilder } from '@airport/landing'

export class PostgreSqlSchemaBuilder
	extends SqlSchemaBuilder {

	async createSchema(
		jsonSchema: JsonSchema,
		storeDriver: IStoreDriver
	): Promise<void> {
		const schemaName = getSchemaName(jsonSchema)
		const createSchemaStatement = `CREATE SCHEMA ${schemaName}`

		await storeDriver.query(QueryType.DDL, createSchemaStatement, [], false)
	}

	getColumnSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		jsonColumn: JsonSchemaColumn
	): string {
		let primaryKeySuffix = ''
		if (jsonColumn.notNull
			|| this.isPrimaryKeyColumn(jsonEntity, jsonColumn)) {
			primaryKeySuffix = ' NOT NULL'
		}

		const suffix = primaryKeySuffix

		switch (jsonColumn.type) {
			// case SQLDataType.ANY:
			// 	return suffix
			case SQLDataType.BOOLEAN:
				return `INTEGER ${suffix}`
			case SQLDataType.DATE:
				return `REAL ${suffix}`
			// case SQLDataType.JSON:
			// 	return `TEXT ${suffix}`
			case SQLDataType.NUMBER:
				if (suffix) {
					return `INTEGER ${suffix}`
				}
				return 'REAL'
			case SQLDataType.STRING:
				return `TEXT ${suffix}`
			default:
				throw new Error(`Unexpected data type for column ${jsonSchema.name}.${jsonEntity.name}.${jsonColumn.name}`)
		}
	}

	getCreateTableSuffix(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity
	): string {
		return ``
	}

	async buildAllSequences(
		jsonSchemas: JsonSchema[]
	): Promise<ISequence[]> {
		const storeDriver = await container(this).get(STORE_DRIVER)

		for (const jsonSchema of jsonSchemas) {
			for (const jsonEntity of jsonSchema.versions[jsonSchema.versions.length - 1].entities) {
				await this.buildSequences(jsonSchema, jsonEntity, storeDriver)
			}
		}
		throw new Error('Finish implementing')
	}

	async buildSequences(
		jsonSchema: JsonSchema,
		jsonEntity: JsonSchemaEntity,
		storeDriver: IStoreDriver
	): Promise<void> {
		for (const jsonColumn of jsonEntity.columns) {
			if (!jsonColumn.isGenerated) {
				continue
			}
			const prefixedTableName = storeDriver.getTableName(jsonSchema, jsonEntity)
			const sequenceName = getSequenceName(prefixedTableName, jsonColumn.name)
			let incrementBy = jsonColumn.allocationSize
			if (!incrementBy) {
				incrementBy = 100000
			}

			const createSequenceDdl
				= `CREATE SEQUENCE ${sequenceName} INCREMENT BY ${incrementBy}`

			await storeDriver.query(QueryType.DDL, createSequenceDdl, [], false)
		}
	}

}

DI.set(SCHEMA_BUILDER, PostgreSqlSchemaBuilder)
