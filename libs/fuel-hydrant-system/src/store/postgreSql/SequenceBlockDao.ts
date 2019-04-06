import {
	IAbstractSequenceBlockDao,
	ISequenceBlock,
	SEQUENCE_BLOCK_DAO
}                       from '@airport/airport-code'
import {DI}             from '@airport/di'
import {
	IStoreDriver,
	STORE_DRIVER,
}                       from '@airport/ground-control'
import {
	ITerminalStore,
	TERMINAL_STORE,
}                       from '@airport/terminal-map'
import {ISchemaVersion} from '@airport/traffic-pattern'

export class SequenceBlockDao
	implements IAbstractSequenceBlockDao {

	private storeDriver: IStoreDriver
	private terminalStore: ITerminalStore

	constructor() {
		DI.get((
			storeDriver,
			terminalStore
		) => {
			this.storeDriver   = storeDriver
			this.terminalStore = terminalStore
		}, STORE_DRIVER, TERMINAL_STORE)
	}

	async createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[][]> {

		const latestSchemaVersionsByIndexes: ISchemaVersion[]
			      = this.terminalStore.getLatestSchemaVersionsByIndexes()

		const reservationMillis = new Date().getTime()

		const allNewBlocks: ISequenceBlock[][] = []

		for (const sequenceBlock  of sequenceBlocks) {
			const sequence = sequenceBlock.sequence

			const schemaVersion = latestSchemaVersionsByIndexes[sequence.schemaIndex]
			const schemaName    = schemaVersion.schema.name

			const entity    = schemaVersion.entities[sequence.tableIndex]
			const tableName = entity.name

			const column     = entity.columns[sequence.columnIndex]
			const columnName = column.name

			const numSequencesBlocksToCreate = Math.ceil(sequenceBlock.size / sequence.incrementBy)

			const blocksForSequence: ISequenceBlock[] = []
			for (let i = 0; i < numSequencesBlocksToCreate; i++) {
				const result          = await this.storeDriver.findNative(
					`SELECT NEXTVAL('"${schemaName}".${tableName}_${columnName}_SEQUENCE')`
					, [])
				const nextval: number = result[0]

				const newSequenceBlock: ISequenceBlock = {
					sequence,
					sequenceConsumer: sequenceBlock.sequenceConsumer,
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
