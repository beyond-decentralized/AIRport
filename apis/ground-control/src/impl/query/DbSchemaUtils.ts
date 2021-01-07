import { ColumnName } from '../../lingo/schema/Property';

export function getSchemaName({
	                              domain, name,
                              }): string {
	if (domain.name) {
		domain = domain.name;
	}

	return getSchemaNameFromDomainAndName(domain, name);
}

export function getSchemaNameFromDomainAndName(
	domainName,
	schemaName,
): string {
	if (domainName.indexOf('_') > -1) {
		throw new Error('Domain Name cannot contain "_" in it.');
	}

	const domainPrefix = domainName
		.replace(/\./g, '_')
		.replace(/-/g, '_');

	if (domainPrefix.endsWith('_')) {
		throw new Error('Domain Name cannot end with "." or "-"');
	}

	if (domainPrefix.indexOf('__') > -1) {
		throw new Error('Domain Name cannot have combination of two "." or "-" right next to each other.');
	}

	if (schemaName.indexOf('_') > -1) {
		throw new Error('Schema Name cannot contain "_" in it.');
	}

	if (schemaName.indexOf('@') !== schemaName.lastIndexOf('@')) {
		throw new Error('Schema Name cannot have more than one "@" in it.');
	}

	if (schemaName.indexOf('@') > 0) {
		throw new Error('Schema Name cannot contain "@" after the first character in it.');
	}

	if (schemaName.indexOf('/') !== schemaName.lastIndexOf('/')) {
		throw new Error('Schema Name cannot have more than one "/" in it.');
	}

	const schemaPrefix = schemaName
		.replace(/@/g, '_')
		.replace(/\//g, '__')
		.replace(/-/g, '_');

	if (schemaPrefix.endsWith('_')) {
		throw new Error('Schema Name cannot end with "/" or "."');
	}

	if ((schemaName.indexOf('/') > -1
		&& schemaPrefix.indexOf('__') !== schemaPrefix.lastIndexOf('__'))
		|| (schemaName.indexOf('/') == -1
			&& schemaPrefix.indexOf('__') > -1)) {
		throw new Error('Schema Name cannot have combination of two "@", "/" or "-" right next to each other.');
	}

	return `${domainPrefix}__${schemaPrefix}`;
}

export function getSequenceName(
	prefixedTableName: string,
	columnName: ColumnName,
): string {
	return `${prefixedTableName}_${columnName}__SEQUENCE`;
}
