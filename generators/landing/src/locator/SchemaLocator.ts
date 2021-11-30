import { DI } from '@airport/di'
import { getSchemaNameFromDomainAndName, JsonSchema } from '@airport/ground-control'
import { AllDdlObjects } from '@airport/takeoff'
import {
	ITerminalStore,
	TERMINAL_STORE
} from '@airport/terminal-map'
import { ISchemaVersion } from '@airport/airspace'
import { SCHEMA_LOCATOR } from '../tokens'

export interface ISchemaLocator {

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema,
		terminalStore: ITerminalStore
	): ISchemaVersion

	locateLatestSchemaVersionBySchemaName(
		schemaName: string,
		terminalStore: ITerminalStore,
	): Promise<ISchemaVersion>

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
		const schemaName = getSchemaNameFromDomainAndName(
			jsonSchema.domain,
			jsonSchema.name
		)
		const latestSchemaVersionForSchema = schemaVersionsForDomainName.get(schemaName)

		const jsonSchemaVersion = jsonSchema.versions[0]

		if (latestSchemaVersionForSchema
			&& latestSchemaVersionForSchema.integerVersion !== jsonSchemaVersion.integerVersion) {
			throw new Error(`Multiple versions of schemas are not yet supported`)
		}

		return latestSchemaVersionForSchema
	}

	async locateLatestSchemaVersionBySchemaName(
		schemaName: string,
		terminalStore: ITerminalStore,
	): Promise<ISchemaVersion> {
		return terminalStore.getLatestSchemaVersionMapBySchemaName()
			.get(schemaName)
	}

}

DI.set(SCHEMA_LOCATOR, SchemaLocator)
