import {
	IAbstractSequenceDao,
	ISequence,
	SEQUENCE_DAO,
	SequenceEId
}                       from '@airport/airport-code'
import {DI}             from '@airport/di'
import {
	DomainName,
	SchemaName
}                       from '@airport/ground-control'
import {
	ITerminalStore,
	TERMINAL_STORE
}                       from '@airport/terminal-map'
import {ISchemaVersion} from '@airport/traffic-pattern'

export class SequenceDao
	implements IAbstractSequenceDao {

	private terminalStore: ITerminalStore

	constructor() {
		DI.get((
			terminalStore
		) => {
			this.terminalStore = terminalStore
		}, TERMINAL_STORE)
	}


	async findAll(
		entityIds?: SequenceEId[]
	): Promise<ISequence[]> {
		const latestSchemaVersionMapByNames
			      : Map<DomainName, Map<SchemaName, ISchemaVersion>>
			      = this.terminalStore.getLatestSchemaVersionMapByNames()

		const sequences: ISequence[] = []

		for (const [domainName, schemaMapByName] of latestSchemaVersionMapByNames) {
			for (const [schemaName, schemaVersion] of schemaMapByName) {
				for (const entity of schemaVersion.entities) {
					for (const column of entity.columns) {
						if (column.isGenerated) {
							const sequence: ISequence = {
								columnIndex: column.index,
								incrementBy: column.allocationSize ? column.allocationSize : 10000,
								schemaIndex: schemaVersion.schema.index,
								tableIndex: entity.index,
							}
							sequences.push(sequence)
						}
					}
				}
			}
		}

		return sequences
	}

}

DI.set(SEQUENCE_DAO, SequenceDao)