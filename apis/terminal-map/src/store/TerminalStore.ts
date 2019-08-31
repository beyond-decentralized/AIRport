import {
	createRootSelector,
	createSelector,
	IMemoizedSelector
}                       from '@airport/check-in'
import {DI}             from '@airport/di'
import {
	DomainName,
	ensureChildJsMap,
	JsonSchemaName,
	SchemaName
}                       from '@airport/ground-control'
import {
	BehaviorSubject,
	Store
}                       from '@airport/observe'
import {IDomain}        from '@airport/territory'
import {
	ISchema,
	ISchemaColumn,
	ISchemaEntity,
	ISchemaRelation,
	ISchemaVersion
}                       from '@airport/traffic-pattern'
import {TERMINAL_STORE} from '../diTokens'
import {ITerminalState} from './TerminalState'

export interface ITerminalStore {

	state: BehaviorSubject<ITerminalState>

	getDomains: IMemoizedSelector<IDomain[], ITerminalState>

	getLatestSchemaVersionMapByNames: IMemoizedSelector<Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>, ITerminalState>

	getLatestSchemaVersionMapBySchemaName: IMemoizedSelector<Map<SchemaName, ISchemaVersion>, ITerminalState>

	getAllSchemaVersionsByIds: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getLatestSchemaVersionsBySchemaIndexes: IMemoizedSelector<ISchemaVersion[], ITerminalState>

	getTerminalState: IMemoizedSelector<ITerminalState, ITerminalState>

	getSchemas: IMemoizedSelector<ISchema[], ITerminalState>

	getAllColumns: IMemoizedSelector<ISchemaColumn[], ITerminalState>

	getAllEntities: IMemoizedSelector<ISchemaEntity[], ITerminalState>

	getAllRelations: IMemoizedSelector<ISchemaRelation[], ITerminalState>

	tearDown()
}


export class TerminalStore
	implements ITerminalStore {

	state = new Store<ITerminalState>({
		domains: [], nodesBySyncFrequency: new Map(), schemas: [], terminal: null,
	})


	getTerminalState = createRootSelector(this.state)

	getDomains = createSelector(this.getTerminalState,
		terminal => terminal.domains)

	// getNodesBySyncFrequency = createSelector(this.getTerminalState,
	// 	terminal => terminal.nodesBySyncFrequency)

	getLatestSchemaVersionMapByNames = createSelector(this.getDomains,
		domains => {
			const latestSchemaVersionMapByNames: Map<DomainName, Map<SchemaName, ISchemaVersion>> = new Map()

			for (const domain of domains) {
				const mapForDomain = ensureChildJsMap(latestSchemaVersionMapByNames, domain.name)
				for (const schema of domain.schemas) {
					mapForDomain.set(schema.name, schema.currentVersion)
				}
			}

			return latestSchemaVersionMapByNames
		})

	getLatestSchemaVersionMapBySchemaName = createSelector(this.getLatestSchemaVersionMapByNames, (latestSchemaVersionMapByNames: Map<DomainName, Map<JsonSchemaName, ISchemaVersion>>) => {
		const latestSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()

		for (const schemaVersionsForDomainName of latestSchemaVersionMapByNames.values()) {
			for (const schemaVersion of schemaVersionsForDomainName.values()) {
				latestSchemaVersionMapBySchemaName.set(schemaVersion.schema.name, schemaVersion)
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
			const latestSchemaVersionsBySchemaIndexes: ISchemaVersion[] = []

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

	getAllEntities = createSelector(this.getLatestSchemaVersionsBySchemaIndexes,
		latestSchemaVersionsBySchemaIndexes => {
			const allEntities: ISchemaEntity[] = []
			for (const latestSchemaVersion of latestSchemaVersionsBySchemaIndexes) {
				if(!latestSchemaVersion) {
					continue
				}
				for (const entity of latestSchemaVersion.entities) {
					allEntities[entity.id] = entity
				}
			}

			return allEntities
		})

	getAllColumns = createSelector(this.getAllEntities,
		allEntities => {
			const allColumns: ISchemaColumn[] = []

			for (const entity of allEntities) {
				if(!entity) {
					continue
				}
				for (const column of entity.columns) {
					allColumns[column.id] = column
				}
			}

			return allColumns
		})

	getAllRelations = createSelector(this.getAllEntities,
		allEntities => {
			const allRelations: ISchemaRelation[] = []

			for (const entity of allEntities) {
				if(!entity) {
					continue
				}
				for (const relation of entity.relations) {
					allRelations[relation.id] = relation
				}
			}

			return allRelations
		})
}

DI.set(TERMINAL_STORE, TerminalStore)
