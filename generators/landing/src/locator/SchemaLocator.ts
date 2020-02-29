import {DI}             from '@airport/di'
import {JsonSchema}     from '@airport/ground-control'
import {
	ITerminalStore,
	TERMINAL_STORE
}                       from '@airport/terminal-map'
import {ISchemaVersion} from '@airport/traffic-pattern'
import {SCHEMA_LOCATOR} from '../tokens'

export interface ISchemaLocator {

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema,
		terminalStore: ITerminalStore
	): ISchemaVersion

	locateLatestSchemaVersionBySchemaName(
		schemaName: string,
		terminalStore: ITerminalStore
	): ISchemaVersion

}

export class SchemaLocator
	implements ISchemaLocator {

	// private terminalStore: ITerminalStore

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema,
		terminalStore: ITerminalStore
	): ISchemaVersion {
		const schemaVersionsForDomainName = terminalStore
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
		schemaName: string,
		terminalStore: ITerminalStore
	): ISchemaVersion {
		return terminalStore.getLatestSchemaVersionMapBySchemaName()
			.get(schemaName)
	}

}

DI.set(SCHEMA_LOCATOR, SchemaLocator)
