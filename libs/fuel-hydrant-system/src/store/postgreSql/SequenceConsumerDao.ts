import {
	IAbstractSequenceConsumerDao,
	SEQUENCE_CONSUMER_DAO,
	SequenceConsumerECreateProperties
}           from '@airport/airport-code'
import {DI} from '@airport/di'

export class SequenceConsumerDao
	implements IAbstractSequenceConsumerDao {

	async create<EntityInfo extends SequenceConsumerECreateProperties[] | SequenceConsumerECreateProperties>(
		entityInfo: EntityInfo
	): Promise<number> {
		return 1
	}

}

DI.set(SEQUENCE_CONSUMER_DAO, SequenceConsumerDao)