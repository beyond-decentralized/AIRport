import { Injected } from '@airport/direction-indicator';
import { Application_FullName } from '../../definition/application/IApplication';
import { DbColumn_Name } from '../../definition/application/DbProperty';
import { IApplicationNameUtils } from '../../definition/query/IApplicationNameUtils';

@Injected()
export class ApplicationNameUtils
	implements IApplicationNameUtils {

	getApplication_FullName({
		domain,
		name,
	}: {
		domain: string | {
			name: string
		},
		name: string
	}): Application_FullName {
		if ((domain as {
			name: string
		}).name) {
			domain = (domain as {
				name: string
			}).name;
		}

		return this.getApplication_FullNameFromDomainAndName(domain as string, name);
	}

	getApplication_FullNameFromDomainAndName(
		domainName: string,
		applicationName: string,
	): Application_FullName {
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

		let fullApplication_Name = `${domainPrefix}___${applicationPrefix}`

		if (fullApplication_Name.endsWith('_dash_runtime')) {
			fullApplication_Name = fullApplication_Name.substring(0, fullApplication_Name.length - 13)
		}

		return fullApplication_Name;
	}

	getSequenceName(
		prefixedTableName: string,
		columnName: DbColumn_Name,
	): string {
		return `${prefixedTableName}_${columnName}__SEQUENCE`;
	}

}
