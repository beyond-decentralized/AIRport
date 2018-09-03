import {Service}            from 'typedi'
import {ColumnName}         from '../../lingo/schema/Property'
import {DbSchemaUtilsToken} from '../../InjectionTokens'
import {
	DbSchema,
	DomainName,
	JsonSchema,
	JsonSchemaName,
	SchemaName
} from '../../lingo/schema/Schema'

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

@Service(DbSchemaUtilsToken)
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
		const domainPrefix = domainName.replace(/\./g, '_')

		const schemaPrefix = jsonSchemaName
			.replace(/@/g, '_')
			.replace(/\//g, '_')
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
