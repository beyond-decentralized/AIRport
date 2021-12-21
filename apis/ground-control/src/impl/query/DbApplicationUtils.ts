import { ColumnName } from '../../lingo/application/Property';

export function getFullApplicationName({
	                              domain, name,
                              }): string {
	if (domain.name) {
		domain = domain.name;
	}

	return getFullApplicationNameFromDomainAndName(domain, name);
}

export function getFullApplicationNameFromDomainAndName(
	domainName,
	applicationName,
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

	if (applicationName.indexOf('_') > -1) {
		throw new Error('Application Name cannot contain "_" in it.');
	}

	if (applicationName.indexOf('@') !== applicationName.lastIndexOf('@')) {
		throw new Error('Application Name cannot have more than one "@" in it.');
	}

	if (applicationName.indexOf('@') > 0) {
		throw new Error('Application Name cannot contain "@" after the first character in it.');
	}

	if (applicationName.indexOf('/') !== applicationName.lastIndexOf('/')) {
		throw new Error('Application Name cannot have more than one "/" in it.');
	}

	const applicationPrefix = applicationName
		.replace(/@/g, '_')
		.replace(/\//g, '__')
		.replace(/-/g, '_');

	if (applicationPrefix.endsWith('_')) {
		throw new Error('Application Name cannot end with "/" or "."');
	}

	if ((applicationName.indexOf('/') > -1
		&& applicationPrefix.indexOf('__') !== applicationPrefix.lastIndexOf('__'))
		|| (applicationName.indexOf('/') == -1
			&& applicationPrefix.indexOf('__') > -1)) {
		throw new Error('Application Name cannot have combination of two "@", "/" or "-" right next to each other.');
	}

	return `${domainPrefix}__${applicationPrefix}`;
}

export function getSequenceName(
	prefixedTableName: string,
	columnName: ColumnName,
): string {
	return `${prefixedTableName}_${columnName}__SEQUENCE`;
}
