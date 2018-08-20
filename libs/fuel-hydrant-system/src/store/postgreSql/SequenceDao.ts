import {
	IAbstractSequenceDao,
	ISequence,
	SequenceDaoToken,
	SequenceEId
}                       from '@airport/airport-code'
import {
	DomainName,
	SchemaName
}                       from '@airport/ground-control'
import {
	ITerminalStore,
	TerminalStoreToken
}                       from '@airport/terminal-map'
import {ISchemaVersion} from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                       from 'typedi'

@Service(SequenceDaoToken)
export class SequenceDao
	implements IAbstractSequenceDao {

	constructor(
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore
	) {
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