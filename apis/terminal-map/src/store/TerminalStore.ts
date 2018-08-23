import {
	IUtils,
	UtilsToken
}                           from '@airport/air-control'
import {
	DomainName,
	JsonSchemaName,
	SchemaName
}                           from '@airport/ground-control'
import {ISchemaVersion}     from '@airport/traffic-pattern'
import {
	BehaviorSubject,
	Subject
}                           from 'rxjs'
import {
	Inject,
	Service
}                           from 'typedi'
import {TerminalStoreToken} from '../InjectionTokens'
import {
	createRootSelector,
	createSelector,
	IMemoizedSelector
}                           from './Selector'
import {ITerminalState}     from './TerminalState'

export interface ITerminalStore {

	state: Subject<ITerminalState>

	getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName,
		Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>

	getLatestSchemaVersionMapBySchemaName:
		IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>

	getLatestSchemaVersionsByIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	tearDown()
}

@Service(TerminalStoreToken)
export class TerminalStore
	implements ITerminalStore {

	constructor(
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	state = new BehaviorSubject<ITerminalState>({
		terminal: null,
		nodesBySyncFrequency: new Map(),
		domains: []
	})

	getTerminalState = createRootSelector(this.state)

	getDomains = createSelector(this.getTerminalState,
		terminal => terminal.domains)

	getNodesBySyncFrequency = createSelector(this.getTerminalState,
		terminal => terminal.nodesBySyncFrequency)

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

	getLatestSchemaVersionsByIndexes = createSelector(this.getDomains,
		domains => {
			const latestSchemaVersionsByNames:
				      ISchemaVersion[] = []

			for (const domain of domains) {
				for (const schema of domain.schemas) {
					latestSchemaVersionsByNames[schema.index] = schema.currentVersion
				}
			}

			return latestSchemaVersionsByNames
		})

	tearDown() {
	}

}