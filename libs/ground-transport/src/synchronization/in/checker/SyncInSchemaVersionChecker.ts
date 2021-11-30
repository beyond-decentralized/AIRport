import { TerminalMessage } from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	ISchemaVersion,
	SCHEMA_VERSION_DAO
} from '@airport/traffic-pattern'
import { SYNC_IN_SCHEMA_CHECKER as SYNC_IN_SCHEMA_VERSION_CHECKER } from '../../../tokens'

export interface ISchemaCheckRecord {
	found?: boolean
	schemaName: string
	schemaVersion?: ISchemaVersion;
	schemaVersionNumber: number
}

export interface ISyncInSchemaVersionChecker {

	checkSchemaVersions(
		message: TerminalMessage
	): Promise<boolean>;

}

export class SyncInSchemaVersionChecker
	implements ISyncInSchemaVersionChecker {

	async checkSchemaVersions(
		message: TerminalMessage
	): Promise<boolean> {
		try {
			let schemaCheckMap = await this.checkVersionsSchemasDomains(message);

			for (let i = 0; i < message.schemaVersions.length; i++) {
				let schemaVersion = message.schemaVersions[i]
				message.schemaVersions[i] = schemaCheckMap
					.get(schemaVersion.schema.domain.name).get(schemaVersion.schema.name)
					.schemaVersion
			}
		} catch (e) {
			console.error(e)
			return false
		}

		return true
	}

	private async checkVersionsSchemasDomains(
		message: TerminalMessage
	): Promise<Map<string, Map<string, ISchemaCheckRecord>>> {
		const { allSchemaNames, domainNames, schemaCheckMap } = this.getNames(message)

		const schemaVersionDao = await container(this).get(SCHEMA_VERSION_DAO)

		const schemaVersions = await schemaVersionDao.findByDomainNamesAndSchemaNames(domainNames, allSchemaNames)

		let schemaVersionIds: number[] = []
		let schemaVersionsById: Map<number, ISchemaVersion> = new Map()

		let lastDomainName
		let lastSchemaName
		for (let schemaVersion of schemaVersions) {
			let domainName = schemaVersion.schema.domain.name
			let schemaName = schemaVersion.schema.name
			if (lastDomainName !== domainName
				&& lastSchemaName !== schemaName) {
				let schemaVersionNumber = schemaVersion.integerVersion

				for (let [_, schemaCheck] of schemaCheckMap.get(domainName)) {
					if (schemaCheck.schemaName === schemaName) {
						schemaCheck.found = true
						if (schemaCheck.schemaVersionNumber > schemaVersionNumber) {
							throw new Error(`Installed schema ${schemaName} for domain ${domainName}
	is at a lower version ${schemaVersionNumber} than needed in message ${schemaCheck.schemaVersionNumber}.`)
						}
						schemaCheck.schemaVersion = schemaVersion
						schemaVersionIds.push(schemaVersion.id)
						schemaVersionsById.set(schemaVersion.id, schemaVersion)
					}
				}
				lastDomainName = domainName
				lastSchemaName = schemaName
			}
		}

		for (const [domainName, schemaChecks] of schemaCheckMap) {
			for (let [_, schemaCheck] of schemaChecks) {
				if (!schemaCheck.found) {
					throw new Error(
						`Schema ${schemaCheck.schemaName} for domain ${domainName} is not installed.`)
				}
			}
		}

		return schemaCheckMap
	}

	private getNames(
		message: TerminalMessage
	): {
		allSchemaNames: string[],
		domainNames: string[],
		schemaCheckMap: Map<string, Map<string, ISchemaCheckRecord>>
	} {
		if (!message.schemaVersions || !(message.schemaVersions instanceof Array)) {
			throw new Error(`Did not find schemaVersions in TerminalMessage.`)
		}

		const schemaCheckMap: Map<string, Map<string, ISchemaCheckRecord>> = new Map()

		for (let schemaVersion of message.schemaVersions) {
			if (!schemaVersion.integerVersion || typeof schemaVersion.integerVersion !== 'number') {
				throw new Error(`Invalid SchemaVersion.integerVersion.`)
			}
			const schema = schemaVersion.schema
			if (typeof schema !== 'object') {
				throw new Error(`Invalid SchemaVersion.schema`)
			}
			if (!schema.name || typeof schema.name !== 'string') {
				throw new Error(`Invalid SchemaVersion.Schema.name`)
			}
			const domain = schema.domain
			if (typeof domain !== 'object') {
				throw new Error(`Invalid SchemaVersion.Schema.Domain`)
			}
			if (!domain.name || typeof domain.name !== 'string') {
				throw new Error(`Invalid SchemaVersion.Schema.Domain.name`)
			}
			let schemaChecksForDomain = schemaCheckMap.get(domain.name)
			if (!schemaChecksForDomain) {
				schemaChecksForDomain = new Map()
				schemaCheckMap.set(domain.name, schemaChecksForDomain)
			}
			if (!schemaChecksForDomain.has(schema.name)) {
				schemaChecksForDomain.set(schema.name, {
					schemaName: schema.name,
					schemaVersionNumber: schemaVersion.integerVersion
				})
			}
		}

		const domainNames = []
		const allSchemaNames = []
		for (const [domainName, schemaChecksForDomainMap] of schemaCheckMap) {
			domainNames.push(domainName)
			for (let [schemaName, _] of schemaChecksForDomainMap) {
				allSchemaNames.push(schemaName)
			}
		}

		return {
			allSchemaNames,
			domainNames,
			schemaCheckMap
		}
	}

}
DI.set(SYNC_IN_SCHEMA_VERSION_CHECKER, SyncInSchemaVersionChecker)