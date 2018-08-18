import {
	AirportDatabaseToken,
	and,
	field,
	IAirportDatabase,
	IQNumberField,
	IUtils,
	max,
	plus,
	RawFieldQuery,
	UtilsToken
}                                       from '@airport/air-control'
import {
	Inject,
	Service
}                                       from 'typedi'
import {SequenceBlockReservationMillis} from '../ddl/ddl'
import {
	BaseSequenceBlockDao,
	IBaseSequenceBlockDao,
	ISequenceBlock,
	Q,
}                                       from '../generated/generated'
import {SequenceBlockDaoToken}          from '../InjectionTokens'

export interface ISequenceBlockDao
	extends IBaseSequenceBlockDao {

	createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[]>

}

@Service(SequenceBlockDaoToken)
export class SequenceBlockDao
	extends BaseSequenceBlockDao
	implements ISequenceBlockDao {

	constructor(
		@Inject(AirportDatabaseToken)
		private airportDb: IAirportDatabase,
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

	async createNewBlocks(
		sequenceBlocks: ISequenceBlock[]
	): Promise<ISequenceBlock[]> {
		const sb = Q.SequenceBlock

		const reservationMillis: SequenceBlockReservationMillis = new Date().getTime()

		const newLastReservedIds: IQNumberField[] = sequenceBlocks.map((
			sequenceBlock
		) => {
			const sb                                                    = Q.SequenceBlock
			const selectMaxLastReservedId: RawFieldQuery<IQNumberField> = {
				from: [sb],
				select: plus(max(sb.lastReservedId), sequenceBlock.size),
				where: and(
					sb.sequence.id.equals(sequenceBlock.sequence.id),
				)
			}
			return field(selectMaxLastReservedId)
		})

		const values = sequenceBlocks.map((
			sequenceBlock,
			index
		) => [
			sequenceBlock.sequence.id,
			sequenceBlock.consumer.id,
			sequenceBlock.size,
			newLastReservedIds[index],
			reservationMillis
		])

		const ids = <number[]>await this.db.insertValuesGenerateIds({
			insertInto: sb,
			columns: [
				sb.sequence.id,
				sb.consumer.id,
				sb.size,
				sb.lastReservedId,
				sb.reservationMillis
			],
			values
		})

		return await this.db.find.tree({
			from: [sb],
			select: {},
			where: sb.id.in(ids)
		})
	}

}