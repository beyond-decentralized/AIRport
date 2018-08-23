import {Service}          from 'typedi'
import {ColumnName}       from '../..'
import {SchemaUtilsToken} from '../../InjectionTokens'
import {
	JsonSchema,
	SchemaName
}                         from '../../lingo/schema/Schema'

export interface ISchemaUtils {

	getSchemaName(
		jsonSchema: JsonSchema
	): SchemaName;

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string

}

@Service(SchemaUtilsToken)
export class SchemaUtils
	implements ISchemaUtils {

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