import {
	IUtils,
	UTILS
}                        from '@airport/air-control'
import {
	createRootSelector,
	createSelector,
	IMemoizedSelector
}                        from '@airport/check-in'
import {DI}              from '@airport/di'
import {
	DomainName,
	JsonSchemaName,
	SchemaName
}                        from '@airport/ground-control'
import {BehaviorSubject} from '@airport/observe'
import {IDomain}         from '@airport/territory'
import {
	ISchema,
	ISchemaVersion
}                        from '@airport/traffic-pattern'
import {TERMINAL_STORE}  from '../diTokens'
import {ITerminalState}  from './TerminalState'

export interface ITerminalStore {

	state: BehaviorSubject<ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName,
		Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>

	getLatestSchemaVersionMapBySchemaName:
		IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>

	getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getSchemas: IMemoizedSelector<ISchema[], ITerminalState>

	tearDown()
}


export class TerminalStore
	implements ITerminalStore {

	private utils: IUtils

	constructor() {
		DI.get(
			utils => {
				this.utils = utils
			}, UTILS)
	}

	state = new BehaviorSubject<ITerminalState>({
		domains: [],
		nodesBySyncFrequency: new Map(),
		schemas: [],
		terminal: null,
	})


	getTerminalState = createRootSelector(this.state)

	getDomains = createSelector(this.getTerminalState,
		terminal => terminal.domains)

	// getNodesBySyncFrequency = createSelector(this.getTerminalState,
	// 	terminal => terminal.nodesBySyncFrequency)

	getLatestSchemaVersionMapByNames = createSelector(this.getDomains,
		domains => {
			const latestSchemaVersionMapByNames:
				      Map<DomainName, Map<SchemaName, ISchemaVersion>> = new Map()

			for (const domain of domains) {
				const mapForDomain = this.utils.ensureChildJsMap(
					latestSchemaVersionMapByNames, domain.name)
				for (const schema of domain.schemas) {
					mapForDomain.set(schema.name, schema.currentVersion)
				}
			}

			return latestSchemaVersionMapByNames
		})

	getLatestSchemaVersionMapBySchemaName = createSelector(this.getLatestSchemaVersionMapByNames, (
		latestSchemaVersionMapByNames:
			Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>
	) => {
		const latestSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()

		for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
			for (const schemaVersion of schemaVersionsForDomainName.values()) {
				latestSchemaVersionMapBySchemaName.set(
					schemaVersion.schema.name, schemaVersion
				)
			}
		}

		return latestSchemaVersionMapBySchemaName
	})

	getAllSchemaVersionsByIds = createSelector(this.getDomains,
		domains => {
			const allSchemaVersionsByIds: ISchemaVersion[] = []

			for (const domain of domains) {
				for (const schema of domain.schemas) {
					for (const schemaVersion of schema.versions) {
						allSchemaVersionsByIds[schemaVersion.id] = schemaVersion
					}
				}
			}

			return allSchemaVersionsByIds
		})

	getLatestSchemaVersionsBySchemaIndexes = createSelector(this.getDomains,
		domains => {
			const latestSchemaVersionsBySchemaIndexes:
				      ISchemaVersion[] = []

			for (const domain of domains) {
				for (const schema of domain.schemas) {
					latestSchemaVersionsBySchemaIndexes[schema.index] = schema.currentVersion
				}
			}

			return latestSchemaVersionsBySchemaIndexes
		})

	getSchemas = createSelector(this.getTerminalState,
		terminal => terminal.schemas)

	tearDown() {
	}

}

DI.set(TERMINAL_STORE, TerminalStore)
