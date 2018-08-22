import {Service}          from 'typedi'
import {SchemaUtilsToken} from '../../InjectionTokens'
import {JsonSchema}       from '../../lingo/schema/Schema'

export interface ISchemaUtils {

	getSchemaName(
		jsonSchema: JsonSchema
	): string;

	getSequenceName(
		prefixedTableName: string,
		columnName: string
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
		columnName: string
	): string {
		return `${prefixedTableName}_columnName_SEQUENCE`
	}
}