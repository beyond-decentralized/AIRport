import {ColumnName} from '../../lingo/schema/Property'
import {
	DomainName,
	SchemaName
}                   from '../../lingo/schema/Schema'

export function getSchemaName({
	                              domain,
	                              name
                              }): string {
	let domainPrefix = ''
	if (domain.name) {
		domain = domain.name
	}
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

export function getTableName(
	schema: {
		domain: DomainName | {
			name: DomainName
		};
		name: SchemaName;
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
	return `${this.getSchemaName(schema)}__${theTableName}`
}

export function getSequenceName(
	prefixedTableName: string,
	columnName: ColumnName
): string {
	return `${prefixedTableName}_${columnName}__SEQUENCE`
}
