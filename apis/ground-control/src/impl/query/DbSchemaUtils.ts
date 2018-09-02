import {Service}            from 'typedi'
import {ColumnName}         from '../../lingo/schema/Property'
import {DbSchemaUtilsToken} from '../../InjectionTokens'
import {
	JsonSchema,
	SchemaName
}                           from '../../lingo/schema/Schema'

export interface IDbSchemaUtils {

	getSchemaName(
		jsonSchema: JsonSchema
	): SchemaName;

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
		const domainPrefix = jsonSchema.domain.replace(/\./g, '_')

		const schemaPrefix = jsonSchema.name
			.replace(/@/g, '_')
			.replace(/\//g, '_')

		return `${domainPrefix}__${schemaPrefix}`
	}

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string {
		return `${prefixedTableName}_${columnName}__SEQUENCE`
	}

}
