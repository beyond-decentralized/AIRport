import {
	and,
	coalesce,
	field,
	IQNumberField,
	max,
	plus,
	RawFieldQuery
}                                       from '@airport/air-control'
import {DI}                             from '@airport/di'
import {SequenceBlockReservationMillis} from '../ddl/ddl'
import {SEQUENCE_BLOCK_DAO}             from '../diTokens'
import {
	BaseSequenceBlockDao,
	IBaseSequenceBlockDao,
	ISequenceBlock,
	Q,
}                                       from '../generated/generated'

export interface IAbstractSequenceBlockDao {

	createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[][]>

}

export interface ISequenceBlockDao
	extends IAbstractSequenceBlockDao,
	        IBaseSequenceBlockDao {

}

export class SequenceBlockDao
	extends BaseSequenceBlockDao
	implements ISequenceBlockDao {

	async createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[][]> {
		const sb = Q.SequenceBlock

		const reservationMillis: SequenceBlockReservationMillis = new Date().getTime()

		const newLastReservedIds: IQNumberField[] = sequenceBlocks.map((
			sequenceBlock
		) => {
			const sb                                                    = Q.SequenceBlock
			const selectMaxLastReservedId: RawFieldQuery<IQNumberField> = {
				from: [sb],
				select: plus(max(coalesce(sb.lastReservedId, 0)), sequenceBlock.size),
				where: and(
					sb.sequence.schemaIndex.equals(sequenceBlock.sequence.schemaIndex),
					sb.sequence.tableIndex.equals(sequenceBlock.sequence.tableIndex),
					sb.sequence.columnIndex.equals(sequenceBlock.sequence.columnIndex)
				)
			}
			return field(selectMaxLastReservedId)
		})

		const values = sequenceBlocks.map((
			sequenceBlock,
			index
		) => [
			sequenceBlock.sequence.schemaIndex,
			sequenceBlock.sequence.tableIndex,
			sequenceBlock.sequence.columnIndex,
			sequenceBlock.sequenceConsumer.createTimestamp,
			sequenceBlock.sequenceConsumer.randomNumber,
			sequenceBlock.size,
			newLastReservedIds[index],
			reservationMillis
		])

		const ids = <number[]>await this.db.insertValuesGenerateIds({
			insertInto: sb,
			columns: [
				sb.sequence.schemaIndex,
				sb.sequence.tableIndex,
				sb.sequence.columnIndex,
				sb.sequenceConsumer.createTimestamp,
				sb.sequenceConsumer.randomNumber,
				sb.size,
				sb.lastReservedId,
				sb.reservationMillis
			],
			values
		})

		const indexMapById: Map<number, number> = new Map()

		ids.forEach((
			id,
			index
		) => {
			indexMapById.set(id, index)
		})

		const newSequenceBlocks = await this.db.find.tree({
			from: [sb],
			select: {},
			where: sb.id.in(ids)
		})

		return newSequenceBlocks.sort((
			seqBlock1,
			seqBlock2
			) =>
			indexMapById.get(seqBlock1.id) - indexMapById.get(seqBlock2.id)
		).map(
			seqBlock => {
				seqBlock.currentNumber = seqBlock.lastReservedId - seqBlock.size

				return [seqBlock]
			})
	}

}

DI.set(SEQUENCE_BLOCK_DAO, SequenceBlockDao)
