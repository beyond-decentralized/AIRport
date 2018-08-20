import {
	IAbstractSequenceConsumerDao,
	SequenceConsumerDaoToken,
	SequenceConsumerECreateProperties
}                from '@airport/airport-code'
import {Service} from 'typedi'

@Service(SequenceConsumerDaoToken)
export class SequenceConsumerDao
	implements IAbstractSequenceConsumerDao {

	async create<EntityInfo extends SequenceConsumerECreateProperties[] | SequenceConsumerECreateProperties>(
		entityInfo: EntityInfo
	): Promise<number> {
		return 1
	}

}