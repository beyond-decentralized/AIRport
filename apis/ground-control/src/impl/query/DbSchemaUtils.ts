import {DI}              from '@airport/di'
import {DB_SCHEMA_UTILS} from '../../diTokens'
import {ColumnName}      from '../../lingo/schema/Property'
import {
	DomainName,
	JsonSchema,
	JsonSchemaName,
	SchemaName
}                        from '../../lingo/schema/Schema'

export interface IDbSchemaUtils {

	getSchemaName(
		jsonSchema: JsonSchema
	): SchemaName

	getSchemaNameFromDomainAndJsonSchemaNames(
		domainName: DomainName,
		jsonSchemaName: JsonSchemaName
	): string

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string

}

export class DbSchemaUtils
	implements IDbSchemaUtils {

	getSchemaName(
		jsonSchema: JsonSchema
	): string {
		return this.getSchemaNameFromDomainAndJsonSchemaNames(
			jsonSchema.domain, jsonSchema.name
		)
	}

	getSchemaNameFromDomainAndJsonSchemaNames(
		domainName: DomainName,
		jsonSchemaName: JsonSchemaName
	): string {
		let domainPrefix = ''
		if (domainName != 'npmjs.org') {
			domainPrefix = domainName
				.replace(/\./g, '_')
				.replace(/-/g, '_')
		}

		const schemaPrefix = jsonSchemaName
			.replace(/@/g, '_')
			.replace(/\//g, '__')
			.replace(/-/g, '_')

		return `${domainPrefix}__${schemaPrefix}`
	}

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string {
		return `${prefixedTableName}_${columnName}__SEQUENCE`
	}

}

DI.set(DB_SCHEMA_UTILS, DbSchemaUtils)
