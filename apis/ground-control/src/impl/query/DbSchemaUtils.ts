import {ColumnName}   from '../../lingo/schema/Property'
import {
	DomainName,
	SchemaName
}                     from '../../lingo/schema/Schema'
import {SchemaStatus} from '../../lingo/schema/SchemaStatus'

export function getSchemaName({
	                              domain, name
                              }): string {
	if (domain.name) {
		domain = domain.name
	}

	if (domain.indexOf('_') > -1) {
		throw new Error('Domain Name cannot contain "_" in it.')
	}

	const domainPrefix = domain
		.replace(/\./g, '_')
		.replace(/-/g, '_')

	if (domainPrefix.endsWith('_')) {
		throw new Error('Domain Name cannot end with "." or "-"')
	}

	if (domainPrefix.indexOf('__') > -1) {
		throw new Error('Domain Name cannot have combination of two "." or "-" right next to each other.')
	}

	if (name.indexOf('_') > -1) {
		throw new Error('Schema Name cannot contain "_" in it.')
	}

	if (name.indexOf('@') !== name.lastIndexOf('@')) {
		throw new Error('Schema Name cannot have more than one "@" in it.')
	}

	if (name.indexOf('@') > 0) {
		throw new Error('Schema Name cannot contain "@" after the first character in it.')
	}

	if (name.indexOf('/') !== name.lastIndexOf('/')) {
		throw new Error('Schema Name cannot have more than one "/" in it.')
	}

	const schemaPrefix = name
		.replace(/@/g, '_')
		.replace(/\//g, '__')
		.replace(/-/g, '_')


	if (schemaPrefix.endsWith('_')) {
		throw new Error('Schema Name cannot end with "/" or "."')
	}

	if ((name.indexOf('/') > -1
		&& schemaPrefix.indexOf('__') !== schemaPrefix.lastIndexOf('__'))
		|| (name.indexOf('/') == -1
			&& schemaPrefix.indexOf('__') > -1)) {
		throw new Error('Schema Name cannot have combination of two "@", "/" or "-" right next to each other.')
	}

	return `${domainPrefix}__${schemaPrefix}`
}

export function getTableName(
	schema: {
		domain: DomainName | {
			name: DomainName
		}; name: SchemaName; status?: SchemaStatus;
	},
	table: {
		name: string, tableConfig?: {
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
