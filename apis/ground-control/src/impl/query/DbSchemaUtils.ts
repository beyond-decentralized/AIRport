import {SchemaStatus} from '../../lingo/schema/SchemaStatus'
import {ColumnName}   from '../../lingo/schema/Property'
import {
	DomainName,
	SchemaName
}                     from '../../lingo/schema/Schema'

export function getSchemaName({
	                              domain,
	                              name
                              }): string {
	if (domain.name) {
		domain = domain.name
	}
	const domainPrefix = domain
		.replace(/\./g, '_')
		.replace(/-/g, '_')

	const schemaPrefix = name
		.replace(/@/g, '_')
		.replace(/\//g, '__')
		.replace(/-/g, '_')

	return `${domainPrefix}__${schemaPrefix}`
}

export function getTableName(
	schema: {
		domain: DomainName | {
			name: DomainName
		};
		name: SchemaName;
		status?: SchemaStatus;
	},
	table: {
		name: string,
		tableConfig?: {
			name?: string
		}
	}
) {
	let theTableName = table.name
	if (table.tableConfig && table.tableConfig.name) {
		theTableName = table.tableConfig.name
	}
	let schemaName
	if (schema.status || schema.status === 0) {
		schemaName = schema.name
	} else {
		schemaName = this.getSchemaName(schema)
	}
	return `${schemaName}__${theTableName}`
}

export function getSequenceName(
	prefixedTableName: string,
	columnName: ColumnName
): string {
	return `${prefixedTableName}_${columnName}__SEQUENCE`
}
