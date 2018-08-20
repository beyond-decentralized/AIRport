import {
	IAbstractSequenceConsumerDao,
	SequenceConsumerDaoToken
}                from '@airport/airport-code'
import {Service} from 'typedi'

@Service(SequenceConsumerDaoToken)
export class SequenceConsumerDao
	implements IAbstractSequenceConsumerDao {

}