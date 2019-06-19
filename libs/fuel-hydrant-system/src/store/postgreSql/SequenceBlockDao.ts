import {
	IAbstractSequenceBlockDao,
	ISequenceBlock
}                        from '@airport/airport-code'
import {DI}              from '@airport/di'
import {STORE_DRIVER,}   from '@airport/ground-control'
import {TERMINAL_STORE,} from '@airport/terminal-map'
import {ISchemaVersion}  from '@airport/traffic-pattern'

export class SequenceBlockDao
	implements IAbstractSequenceBlockDao {

	async createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[][]> {

		const latestSchemaVersionsBySchemaIndexes: ISchemaVersion[]
			      = (await DI.get(TERMINAL_STORE)).getLatestSchemaVersionsBySchemaIndexes()

		const reservationMillis = new Date().getTime()

		const allNewBlocks: ISequenceBlock[][] = []

		for (const sequenceBlock  of sequenceBlocks) {
			const sequence = sequenceBlock.sequence

			const schemaVersion = latestSchemaVersionsBySchemaIndexes[sequence.schemaIndex]
			const schemaName    = schemaVersion.schema.name

			const entity    = schemaVersion.entities[sequence.tableIndex]
			const tableName = entity.name

			const column     = entity.columns[sequence.columnIndex]
			const columnName = column.name

			const numSequencesBlocksToCreate = Math.ceil(sequenceBlock.size / sequence.incrementBy)

			const blocksForSequence: ISequenceBlock[] = []
			for (let i = 0; i < numSequencesBlocksToCreate; i++) {
				const result          = await (await DI.get(STORE_DRIVER)).findNative(
					`SELECT NEXTVAL('"${schemaName}".${tableName}_${columnName}_SEQUENCE')`
					, [])
				const nextval: number = result[0]

				const newSequenceBlock: ISequenceBlock = {
					sequence,
					currentNumber: nextval - sequence.incrementBy,
					lastReservedId: nextval,
					size: sequence.incrementBy,
					reservationMillis
				}
				blocksForSequence.push(newSequenceBlock)
			}

			allNewBlocks.push(blocksForSequence)
		}

		return allNewBlocks
	}

}

// DI.set(SEQUENCE_BLOCK_DAO, SequenceBlockDao)
