import {DI}                    from '@airport/di'
import {SEQUENCE_CONSUMER_DAO} from '../diTokens'
import {
	BaseSequenceConsumerDao,
	IBaseSequenceConsumerDao,
	SequenceConsumerECreateProperties
}                              from '../generated/generated'

export interface IAbstractSequenceConsumerDao {

	create<EntityInfo extends SequenceConsumerECreateProperties[] | SequenceConsumerECreateProperties>(
		entityInfo: EntityInfo
	): Promise<number>

}

export interface ISequenceConsumerDao
	extends IAbstractSequenceConsumerDao,
	        IBaseSequenceConsumerDao {


}

export class SequenceConsumerDao
	extends BaseSequenceConsumerDao
	implements ISequenceConsumerDao {

}

DI.set(SEQUENCE_CONSUMER_DAO, SequenceConsumerDao)
