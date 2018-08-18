import {
	IUtils,
	UtilsToken
}                              from '@airport/air-control'
import {
	ColumnIndex,
	SchemaIndex,
	TableIndex
}                              from '@airport/ground-control'
import {
	Inject,
	Service
}                              from 'typedi'
import {
	SequenceBlockReservationMillis,
	SequenceBlockSize,
	SequenceConsumerId,
	SequenceId
} from '../ddl/ddl'
import {
	BaseSequenceBlockDao,
	IBaseSequenceBlockDao,
	ISequenceBlock,
	Q,
} from '../generated/generated'
import {SequenceBlockDaoToken} from '../InjectionTokens'

export interface ISequenceBlockDao
	extends IBaseSequenceBlockDao {

}

@Service(SequenceBlockDaoToken)
export class SequenceBlockDao
	extends BaseSequenceBlockDao
	implements ISequenceBlockDao {

	constructor(
		@Inject(UtilsToken)
			utils: IUtils
	) {
		super(utils)
	}

	async createNewBlocks(
		sequenceConsumerId: SequenceConsumerId,
		sequenceIds: SequenceId[],
		schemaIndexes: SchemaIndex[],
		tableIndexes: TableIndex[],
		columnIndexes: ColumnIndex[],
		sizes: SequenceBlockSize[],
		reservationMillis: SequenceBlockReservationMillis
	): Promise<ISequenceBlock> {

		const sb = Q.SequenceBlock;

		this.db.insertValuesGenerateIds({
			insertInto: sb,
			columns: [
				sb.sequence.id,
				sb.consumer.id,
				sb.size,
				sb.lastReservedId,
				sb.reservationMillis
			],
			values: []
		})
	}

}