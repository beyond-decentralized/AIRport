import {
	BaseSequenceDao,
	ISequence,
	SEQUENCE_DAO,
	SequenceEId
}                       from '../../schemas/airport-code/lib'
import {container, DI}  from '@airport/di'
import {
	DomainName,
	SchemaName
}                       from '@airport/ground-control'
import {TERMINAL_STORE} from '../../apis/terminal-map/lib'
import {ISchemaVersion} from '../../schemas/traffic-pattern/lib'

export class SequenceDao
	extends BaseSequenceDao {

	async findAll(
		entityIds?: SequenceEId[]
	): Promise<ISequence[]> {
		const latestSchemaVersionMapByNames
			      : Map<DomainName, Map<SchemaName, ISchemaVersion>>
			      = (await container(this).get(TERMINAL_STORE)).getLatestSchemaVersionMapByNames()

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
