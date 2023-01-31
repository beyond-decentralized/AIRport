import { Injected } from '@airport/direction-indicator';
import { DbApplication_FullName } from '../../definition/application/DbApplication';
import { DbColumn_Name } from '../../definition/application/DbProperty';

@Injected()
export class ImplApplicationUtils {

	getDbApplication_FullName({
		domain,
		name,
	}: {
		domain: string | {
			name: string
		},
		name: string
	}): DbApplication_FullName {
		if ((domain as {
			name: string
		}).name) {
			domain = (domain as {
				name: string
			}).name;
		}

		return this.getDbApplication_FullNameFromDomainAndName(domain as string, name);
	}

	getDbApplication_FullNameFromDomainAndName(
		domainName: string,
		applicationName: string,
	): DbApplication_FullName {
		if (domainName.indexOf('___') > -1) {
			throw new Error('Domain Name cannot contain "___" (3 consecutive underscores) in it.');
		}

		if (domainName.endsWith('.')
			|| domainName.endsWith('-')
			|| domainName.endsWith(':')
			|| domainName.endsWith('__')) {
			throw new Error('Domain Name cannot end with ".", "-", ":" or "__"');
		}

		const domainPrefix = domainName
			.replace(/\./g, '_dot_')
			.replace(/-/g, '_dash_')
			.replace(/:/g, '_colon_');

		if (domainPrefix.indexOf('___') > -1) {
			throw new Error('Domain Name cannot have with ".", "-", ":", or "_" right next to each other.');
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
			.replace(/@/g, '_at_')
			.replace(/\//g, '_slash_')
			.replace(/-/g, '_dash_');

		if (applicationPrefix.endsWith('_')) {
			throw new Error('Application Name cannot end with "@", "/" or "."');
		}

		if (applicationPrefix.indexOf('___') > -1) {
			throw new Error('Application Name cannot have with "@", "/", "." or "_" right next to each other.');
		}

		let fullDbApplication_Name = `${domainPrefix}___${applicationPrefix}`

		if (fullDbApplication_Name.endsWith('_dash_runtime')) {
			fullDbApplication_Name = fullDbApplication_Name.substring(0, fullDbApplication_Name.length - 13)
		}

		return fullDbApplication_Name;
	}

	getSequenceName(
		prefixedTableName: string,
		columnName: DbColumn_Name,
	): string {
		return `${prefixedTableName}_${columnName}__SEQUENCE`;
	}

}
