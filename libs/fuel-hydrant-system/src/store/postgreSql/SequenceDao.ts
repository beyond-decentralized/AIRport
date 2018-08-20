import {
	IAbstractSequenceDao,
	SequenceDaoToken
}                from '@airport/airport-code'
import {Service} from 'typedi'

@Service(SequenceDaoToken)
export class SequenceDao
	implements IAbstractSequenceDao {

}