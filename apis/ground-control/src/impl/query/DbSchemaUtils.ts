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
		jsonSchema: {
			domain: DomainName,
			name: JsonSchemaName
		}
	): SchemaName

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string

}

export class DbSchemaUtils
	implements IDbSchemaUtils {

	getSchemaName(
		jsonSchema: {
			domain: DomainName,
			name: JsonSchemaName
		}
	): string {
		return getSchemaName(jsonSchema)
	}

	getSequenceName(
		prefixedTableName: string,
		columnName: ColumnName
	): string {
		return `${prefixedTableName}_${columnName}__SEQUENCE`
	}

}

export function getSchemaName({
		domain,
		name
	}): string {
	let domainPrefix = ''
	if (domain != 'npmjs.org') {
		domainPrefix = domain
			.replace(/\./g, '_')
			.replace(/-/g, '_')
	}

	const schemaPrefix = name
		.replace(/@/g, '_')
		.replace(/\//g, '__')
		.replace(/-/g, '_')

	return `${domainPrefix}__${schemaPrefix}`
}

DI.set(DB_SCHEMA_UTILS, DbSchemaUtils)
