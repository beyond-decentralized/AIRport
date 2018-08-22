import {
	IAbstractSequenceBlockDao,
	ISequenceBlock,
	SequenceBlockDaoToken
}                       from '@airport/airport-code'
import {
	IStoreDriver,
	StoreDriverToken
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

@Service(SequenceBlockDaoToken)
export class SequenceBlockDao
	implements IAbstractSequenceBlockDao {

	constructor(
		@Inject(StoreDriverToken)
		private storeDriver: IStoreDriver,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore
	) {
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