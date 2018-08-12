import {JsonSchema}         from '@airport/ground-control'
import {
	ITerminalStore,
	TerminalStoreToken
}                           from '@airport/terminal-map'
import {
	ISchemaVersion,
	ISchemaVersionDao,
	SchemaVersionDaoToken
}                           from '@airport/traffic-pattern'
import {Inject}             from 'typedi'
import {SchemaLocatorToken} from '../InjectionTokens'

export interface ISchemaLocator {

	locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema
	): Promise<ISchemaVersion>;

}

@Inject(SchemaLocatorToken)
export class SchemaLocator
	implements ISchemaLocator {

	constructor(
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore
	) {
	}

	async locateExistingSchemaVersionRecord(
		jsonSchema: JsonSchema
	): Promise<ISchemaVersion> {
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

}