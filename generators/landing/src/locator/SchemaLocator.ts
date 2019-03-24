import {DI}             from '@airport/di'
import {JsonSchema}     from '@airport/ground-control'
import {
	ITerminalStore,
	TERMINAL_STORE
}                       from '@airport/terminal-map'
import {ISchemaVersion} from '@airport/traffic-pattern'
import {SCHEMA_LOCATOR} from '../diTokens'

export interface ISchemaLocator {

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema
	): ISchemaVersion

	locateLatestSchemaVersionBySchemaName(
		schemaName: string
	): ISchemaVersion

}

export class SchemaLocator
	implements ISchemaLocator {

	private terminalStore: ITerminalStore

	constructor() {
		DI.get((
			terminalStore
		) => {
			this.terminalStore = terminalStore
		}, TERMINAL_STORE)
	}

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema
	): ISchemaVersion {
		const schemaVersionsForDomainName = this.terminalStore
			.getLatestSchemaVersionMapByNames().get(jsonSchema.domain)
		if (!schemaVersionsForDomainName) {
			return null
		}
		const latestSchemaVersionForSchema = schemaVersionsForDomainName.get(jsonSchema.name)

		const jsonSchemaVersion = jsonSchema.versions[0]

		if (latestSchemaVersionForSchema.integerVersion !== jsonSchemaVersion.integerVersion) {
			throw new Error(`Multiple versions of schemas are not yet supported`)
		}

		return latestSchemaVersionForSchema
	}

	locateLatestSchemaVersionBySchemaName(
		schemaName: string
	): ISchemaVersion {
		return this.terminalStore.getLatestSchemaVersionMapBySchemaName()
			.get(schemaName)
	}

}

DI.set(SCHEMA_LOCATOR, SchemaLocator)
